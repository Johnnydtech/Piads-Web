/**
 * The review site serves the exported original marketing pages. Existing form
 * submissions go only to their corresponding first-party PiAds endpoint.
 * No API credentials or visitor authentication headers are forwarded.
 */
const production = "https://www.piads.co";
const formPaths = new Set(["/api/newsletter", "/api/contact"]);
const oldRoutes = new Map([
  [
    "/app",
    "https://piads-android.s3.us-east-1.amazonaws.com/apps/PiAds-Kiosk-v1.5.2.apk",
  ],
  [
    "/blog/dayparts-explained",
    "/blog/digital-menu-boards-increase-restaurant-sales",
  ],
  [
    "/blog/advertiser-getting-started",
    "/blog/how-to-advertise-on-local-venue-screens",
  ],
  ["/blog/playlist-best-practices", "/blog/digital-signage-content-ideas"],
]);
const json = (body, status) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (formPaths.has(url.pathname)) {
      if (request.method !== "POST")
        return new Response(null, { status: 405, headers: { Allow: "POST" } });
      const origin = request.headers.get("Origin");
      if (origin && origin !== url.origin)
        return json(
          { error: "This form must be submitted from this site." },
          403,
        );
      if (!request.headers.get("Content-Type")?.includes("application/json"))
        return json({ error: "JSON required." }, 415);
      if (Number(request.headers.get("Content-Length") || 0) > 16384)
        return json({ error: "Submission too large." }, 413);
      try {
        const reader = request.body?.getReader();
        let size = 0;
        const chunks = [];
        if (reader)
          for (;;) {
            const { done, value } = await reader.read();
            if (done) break;
            size += value.byteLength;
            if (size > 16384) {
              await reader.cancel();
              return json({ error: "Submission too large." }, 413);
            }
            chunks.push(value);
          }
        const bytes = new Uint8Array(size);
        let offset = 0;
        for (const chunk of chunks) {
          bytes.set(chunk, offset);
          offset += chunk.byteLength;
        }
        const payload = JSON.parse(new TextDecoder().decode(bytes));
        if (
          typeof payload.email !== "string" ||
          !/^\S+@\S+\.\S+$/.test(payload.email) ||
          payload.email.length > 254
        )
          return json({ error: "Valid email required." }, 400);
        const forwarded =
          url.pathname === "/api/newsletter"
            ? {
                email: payload.email,
                page:
                  typeof payload.page === "string"
                    ? payload.page.slice(0, 1024)
                    : url.origin,
              }
            : {
                name: payload.name,
                email: payload.email,
                company: payload.company,
                subject: payload.subject,
                message: payload.message,
              };
        const upstream = await fetch(production + url.pathname, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(forwarded),
          redirect: "error",
          signal: AbortSignal.timeout(15000),
        });
        if (!upstream.ok)
          return json(
            { error: "Could not submit right now. Please try again." },
            502,
          );
        const result = await upstream.json();
        if (result.success !== true)
          return json(
            { error: "Submission could not be confirmed. Please try again." },
            502,
          );
        return json({ success: true }, 200);
      } catch (error) {
        return json(
          {
            error:
              error instanceof SyntaxError
                ? "Invalid submission."
                : "Could not reach PiAds. Please try again.",
          },
          error instanceof SyntaxError ? 400 : 502,
        );
      }
    }
    if (request.method !== "GET" && request.method !== "HEAD")
      return new Response(null, {
        status: 405,
        headers: { Allow: "GET, HEAD" },
      });
    if (oldRoutes.has(url.pathname))
      return Response.redirect(
        new URL(oldRoutes.get(url.pathname), url.origin),
        url.pathname === "/app" ? 302 : 301,
      );
    if (
      ["/api/blog-feed", "/sitemap.xml", "/robots.txt", "/llms.txt"].includes(
        url.pathname,
      )
    ) {
      const upstream = await fetch(production + url.pathname, {
        signal: AbortSignal.timeout(15000),
      });
      return new Response(request.method === "HEAD" ? null : upstream.body, {
        status: upstream.status,
        headers: {
          "Content-Type": upstream.headers.get("Content-Type") || "text/plain",
          "Cache-Control": "public, max-age=300",
        },
      });
    }
    return env.ASSETS.fetch(request);
  },
};
