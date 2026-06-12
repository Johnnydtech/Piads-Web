import { NextResponse } from "next/server"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  try {
    const { email, page } = await request.json()

    if (!email || typeof email !== "string" || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 })
    }

    // Notify via Resend when configured; otherwise log (same pattern as the
    // contact form until a proper list provider is wired up).
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
          subject: "New newsletter signup",
          html: `<p><strong>${email}</strong> subscribed to the newsletter.</p><p>Page: ${page || "unknown"}</p>`,
        }),
      })
      if (!res.ok) {
        console.error("Newsletter Resend error:", await res.text())
      }
    } else {
      console.log("Newsletter signup:", { email, page, timestamp: new Date().toISOString() })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Newsletter error:", error)
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 })
  }
}
