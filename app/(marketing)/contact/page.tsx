import { Mail, MessageSquare, MapPin, Sparkles } from "lucide-react"

export const metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact",
  description: "Get in touch with the PiAds team in Arlington, VA. Send us an email about digital signage for your local business.",
}

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-24 md:py-32">
        <div className="container max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full mb-8">
            <Sparkles className="h-4 w-4 text-blue" />
            <span className="text-sm font-medium">Contact</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 font-display">
            Let&apos;s
            <span className="text-blue"> Talk</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions about PiAds? Reach out via email — we typically
            respond within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-20 bg-secondary/50">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-3 gap-6">
            <a
              href="mailto:hello@piads.co"
              className="bg-white border border-border rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-11 h-11 bg-blue/10 text-blue rounded-xl flex items-center justify-center mb-5">
                <Mail className="h-5 w-5" />
              </div>
              <h3 className="font-bold font-display mb-2">Email us</h3>
              <p className="text-muted-foreground text-sm mb-3">
                Questions, partnerships, press — anything goes.
              </p>
              <span className="text-blue font-semibold text-sm">hello@piads.co</span>
            </a>

            <div className="bg-white border border-border rounded-2xl p-8 shadow-sm">
              <div className="w-11 h-11 bg-teal/10 text-teal rounded-xl flex items-center justify-center mb-5">
                <MessageSquare className="h-5 w-5" />
              </div>
              <h3 className="font-bold font-display mb-2">Support</h3>
              <p className="text-muted-foreground text-sm">
                Already a customer? Use the in-app help center for the fastest
                response, or email{" "}
                <a href="mailto:support@piads.co" className="text-blue font-semibold">
                  support@piads.co
                </a>
                .
              </p>
            </div>

            <div className="bg-white border border-border rounded-2xl p-8 shadow-sm">
              <div className="w-11 h-11 bg-coral text-blue rounded-xl flex items-center justify-center mb-5">
                <MapPin className="h-5 w-5" />
              </div>
              <h3 className="font-bold font-display mb-2">Where we are</h3>
              <p className="text-muted-foreground text-sm">
                Arlington, Virginia — serving venues across Ballston, Clarendon,
                Columbia Pike, and Falls Church.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
