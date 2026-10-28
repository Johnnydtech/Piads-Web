import { NextResponse } from "next/server"

// A host who downloaded the starter kit from /airbnb-welcome-book-generator.
// Same delivery as the newsletter and contact forms (a Resend notification to
// the team inbox) until a proper list provider is wired up.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string)
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const email = typeof body.email === "string" ? body.email.trim().slice(0, 254) : ""
    const city = typeof body.city === "string" ? body.city.trim().slice(0, 80) : ""
    const picks = Number.isFinite(body.picks) ? Math.max(0, Math.min(20, Math.trunc(body.picks))) : 0

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 })
    }

    if (process.env.RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "PiAds <noreply@piads.co>",
          to: ["hello@piads.co"],
          subject: `Welcome book generator lead${city ? ` (${city})` : ""}`,
          html:
            `<p><strong>${escapeHtml(email)}</strong> downloaded the host starter kit from the generator.</p>` +
            `<p>City: ${escapeHtml(city || "unknown")}<br/>Local picks kept: ${picks}</p>` +
            `<p>They have not signed up yet. Worth a follow-up about putting it on their TV.</p>`,
        }),
      })
      if (!res.ok) {
        console.error("Welcome generator lead Resend error:", await res.text())
      }
    } else {
      console.log("Welcome generator lead:", { city, picks, timestamp: new Date().toISOString() })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Welcome generator lead error:", error)
    return NextResponse.json({ error: "Failed to record lead" }, { status: 500 })
  }
}
