import Script from "next/script"
import { Mail, MessageSquare, Calendar, Sparkles } from "lucide-react"

export const metadata = {
  title: "Contact",
  description: "Get in touch with the PiAds team. Schedule a call or send us an email.",
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
            Have questions about PiAds? Schedule a quick call with us or reach out via email.
            We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-20 bg-secondary/50">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold font-display mb-4">Contact Info</h2>
                <p className="text-muted-foreground">
                  Schedule a call or send us an email. We typically respond within 24 hours.
                </p>
              </div>

              <div className="bg-blue rounded-2xl p-6 text-white">
                <div className="flex items-start gap-4">
                  <Calendar className="h-5 w-5 text-white/80 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Schedule a Call</h3>
                    <p className="text-white/80 text-sm">
                      Book a 30-minute call to discuss your needs.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-teal rounded-2xl p-6 text-white">
                <div className="flex items-start gap-4">
                  <Mail className="h-5 w-5 text-white/80 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <a
                      href="mailto:hello@piads.co"
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      hello@piads.co
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-coral rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <MessageSquare className="h-5 w-5 text-foreground/60 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Support</h3>
                    <p className="text-muted-foreground text-sm">
                      For technical support, please use the in-app help center.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Calendly Embed */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-3xl p-4 md:p-8 shadow-sm overflow-hidden">
                <div
                  className="calendly-inline-widget"
                  data-url="https://calendly.com/yohanes-piads/30min?hide_gdpr_banner=1&background_color=ffffff&text_color=1a1a1a&primary_color=4856c4"
                  style={{ minWidth: '320px', height: '700px' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calendly Script */}
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </div>
  )
}
