import { Shield, Lock, Eye, Share2, Database, UserCheck, Baby, ExternalLink, Mail } from "lucide-react"

export const metadata = {
  title: "Privacy Policy | PiAds",
  description: "Learn how PiAds collects, uses, and protects your personal information.",
}

const sections = [
  { id: "introduction", label: "Introduction" },
  { id: "information-collect", label: "Information We Collect" },
  { id: "how-we-use", label: "How We Use Information" },
  { id: "sharing", label: "Information Sharing" },
  { id: "retention", label: "Data Retention" },
  { id: "security", label: "Data Security" },
  { id: "rights", label: "Your Rights" },
  { id: "children", label: "Children's Privacy" },
  { id: "third-party", label: "Third-Party Links" },
  { id: "changes", label: "Policy Changes" },
  { id: "contact", label: "Contact Us" },
]

export default function PrivacyPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="pt-32 md:pt-36 pb-12 md:pb-16 border-b bg-gradient-to-b from-secondary/30 to-background">
        <div className="container max-w-6xl">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue to-blue/80 flex items-center justify-center shadow-lg shadow-blue/25">
              <Shield className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-display">Privacy Policy</h1>
              <p className="text-muted-foreground text-sm mt-1">
                Last updated: January 20, 2026
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-10 md:py-14">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10">
            {/* Sidebar Navigation */}
            <nav className="hidden lg:block">
              <div className="sticky top-24 space-y-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">On this page</p>
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block text-sm text-muted-foreground hover:text-foreground py-1.5 transition-colors border-l-2 border-transparent hover:border-blue pl-3 -ml-px"
                  >
                    {section.label}
                  </a>
                ))}
              </div>
            </nav>

            {/* Main Content */}
            <div className="min-w-0">
              {/* Introduction */}
              <section id="introduction" className="mb-10 scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue/10 flex items-center justify-center">
                    <Eye className="h-5 w-5 text-blue" />
                  </div>
                  <h2 className="text-xl font-bold font-display">Introduction</h2>
                </div>
                <div className="bg-secondary/30 rounded-2xl p-6 space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    PiAds (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our digital signage advertising platform, including our website, mobile applications, and related services (collectively, the &quot;Service&quot;).
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Please read this Privacy Policy carefully. By accessing or using the Service, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy.
                  </p>
                </div>
              </section>

              {/* Information We Collect */}
              <section id="information-collect" className="mb-10 scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-coral/10 flex items-center justify-center">
                    <Database className="h-5 w-5 text-coral" />
                  </div>
                  <h2 className="text-xl font-bold font-display">Information We Collect</h2>
                </div>

                <div className="space-y-4">
                  <div className="border rounded-2xl p-6">
                    <h3 className="font-semibold mb-3">Personal Information You Provide</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      We collect information you voluntarily provide when you:
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2"><span className="text-blue mt-1">•</span>Create an account (name, email, password)</li>
                      <li className="flex items-start gap-2"><span className="text-blue mt-1">•</span>Set up a venue profile (business details)</li>
                      <li className="flex items-start gap-2"><span className="text-blue mt-1">•</span>Create an advertiser account</li>
                      <li className="flex items-start gap-2"><span className="text-blue mt-1">•</span>Upload content or creatives</li>
                      <li className="flex items-start gap-2"><span className="text-blue mt-1">•</span>Make payments (via Stripe)</li>
                      <li className="flex items-start gap-2"><span className="text-blue mt-1">•</span>Contact support</li>
                    </ul>
                  </div>

                  <div className="border rounded-2xl p-6">
                    <h3 className="font-semibold mb-3">Information Collected Automatically</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      When you use our Service, we automatically collect:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="bg-secondary/50 rounded-xl p-3">
                        <p className="font-medium text-foreground">Device Information</p>
                        <p className="text-muted-foreground text-xs mt-1">Device type, OS, browser, screen resolution</p>
                      </div>
                      <div className="bg-secondary/50 rounded-xl p-3">
                        <p className="font-medium text-foreground">Usage Data</p>
                        <p className="text-muted-foreground text-xs mt-1">Pages visited, features used, time spent</p>
                      </div>
                      <div className="bg-secondary/50 rounded-xl p-3">
                        <p className="font-medium text-foreground">Log Data</p>
                        <p className="text-muted-foreground text-xs mt-1">IP address, access times, referring URLs</p>
                      </div>
                      <div className="bg-secondary/50 rounded-xl p-3">
                        <p className="font-medium text-foreground">Screen Analytics</p>
                        <p className="text-muted-foreground text-xs mt-1">Playback data, impressions, QR scans</p>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-2xl p-6">
                    <h3 className="font-semibold mb-3">Information from Third Parties</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 bg-secondary/50 rounded-full px-3 py-1.5 text-sm">
                        <span className="w-2 h-2 rounded-full bg-blue"></span>
                        Authentication Providers (Google)
                      </span>
                      <span className="inline-flex items-center gap-1.5 bg-secondary/50 rounded-full px-3 py-1.5 text-sm">
                        <span className="w-2 h-2 rounded-full bg-teal"></span>
                        Payment Processors (Stripe)
                      </span>
                      <span className="inline-flex items-center gap-1.5 bg-secondary/50 rounded-full px-3 py-1.5 text-sm">
                        <span className="w-2 h-2 rounded-full bg-coral"></span>
                        Analytics Services
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* How We Use Your Information */}
              <section id="how-we-use" className="mb-10 scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center">
                    <Eye className="h-5 w-5 text-teal" />
                  </div>
                  <h2 className="text-xl font-bold font-display">How We Use Your Information</h2>
                </div>
                <div className="border rounded-2xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-3">
                      <p className="font-semibold text-sm">Service Operations</p>
                      <ul className="text-sm text-muted-foreground space-y-1.5">
                        <li className="flex items-start gap-2"><span className="text-teal">•</span>Provide and improve Service</li>
                        <li className="flex items-start gap-2"><span className="text-teal">•</span>Process transactions</li>
                        <li className="flex items-start gap-2"><span className="text-teal">•</span>Match advertisers with venues</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <p className="font-semibold text-sm">Communication</p>
                      <ul className="text-sm text-muted-foreground space-y-1.5">
                        <li className="flex items-start gap-2"><span className="text-teal">•</span>Send updates and alerts</li>
                        <li className="flex items-start gap-2"><span className="text-teal">•</span>Respond to inquiries</li>
                        <li className="flex items-start gap-2"><span className="text-teal">•</span>Generate reports</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <p className="font-semibold text-sm">Security & Compliance</p>
                      <ul className="text-sm text-muted-foreground space-y-1.5">
                        <li className="flex items-start gap-2"><span className="text-teal">•</span>Prevent fraud</li>
                        <li className="flex items-start gap-2"><span className="text-teal">•</span>Monitor usage patterns</li>
                        <li className="flex items-start gap-2"><span className="text-teal">•</span>Comply with legal obligations</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Information Sharing */}
              <section id="sharing" className="mb-10 scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-purple/10 flex items-center justify-center">
                    <Share2 className="h-5 w-5 text-purple" />
                  </div>
                  <h2 className="text-xl font-bold font-display">Information Sharing and Disclosure</h2>
                </div>

                <div className="space-y-3">
                  <div className="border rounded-2xl p-5">
                    <h3 className="font-semibold mb-2">Between Venues and Advertisers</h3>
                    <p className="text-sm text-muted-foreground">
                      We share business names, campaign details, and performance metrics to facilitate transactions. Personal contact information is not shared without consent.
                    </p>
                  </div>

                  <div className="border rounded-2xl p-5">
                    <h3 className="font-semibold mb-3">Service Providers</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-secondary/50 rounded-lg px-3 py-1.5 text-sm"><strong>Stripe</strong> — Payments</span>
                      <span className="bg-secondary/50 rounded-lg px-3 py-1.5 text-sm"><strong>Clerk</strong> — Authentication</span>
                      <span className="bg-secondary/50 rounded-lg px-3 py-1.5 text-sm"><strong>Supabase</strong> — Database</span>
                      <span className="bg-secondary/50 rounded-lg px-3 py-1.5 text-sm"><strong>Vercel</strong> — Hosting</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="border rounded-2xl p-5">
                      <h3 className="font-semibold mb-2">Legal Requirements</h3>
                      <p className="text-sm text-muted-foreground">
                        We may disclose information if required by law or to protect rights, property, or safety.
                      </p>
                    </div>
                    <div className="border rounded-2xl p-5">
                      <h3 className="font-semibold mb-2">Business Transfers</h3>
                      <p className="text-sm text-muted-foreground">
                        Information may be transferred during mergers, acquisitions, or sale of assets.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Data Retention */}
              <section id="retention" className="mb-10 scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-yellow/10 flex items-center justify-center">
                    <Database className="h-5 w-5 text-yellow" />
                  </div>
                  <h2 className="text-xl font-bold font-display">Data Retention</h2>
                </div>
                <div className="border rounded-2xl p-6">
                  <p className="text-muted-foreground mb-4">
                    We retain your information for as long as your account is active. We also retain information to:
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-yellow/10 text-yellow-700 rounded-lg px-3 py-1.5 text-sm font-medium">Legal compliance (7 years for tax records)</span>
                    <span className="bg-yellow/10 text-yellow-700 rounded-lg px-3 py-1.5 text-sm font-medium">Dispute resolution</span>
                    <span className="bg-yellow/10 text-yellow-700 rounded-lg px-3 py-1.5 text-sm font-medium">Business records</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Request deletion anytime at <a href="mailto:privacy@piads.co" className="text-blue hover:underline">privacy@piads.co</a>
                  </p>
                </div>
              </section>

              {/* Data Security */}
              <section id="security" className="mb-10 scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <Lock className="h-5 w-5 text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold font-display">Data Security</h2>
                </div>
                <div className="border rounded-2xl p-6">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
                    <div className="text-center p-3 bg-green-500/5 rounded-xl">
                      <p className="text-xs text-muted-foreground">Encryption</p>
                      <p className="font-semibold text-sm mt-1">TLS/SSL</p>
                    </div>
                    <div className="text-center p-3 bg-green-500/5 rounded-xl">
                      <p className="text-xs text-muted-foreground">Auth</p>
                      <p className="font-semibold text-sm mt-1">Clerk</p>
                    </div>
                    <div className="text-center p-3 bg-green-500/5 rounded-xl">
                      <p className="text-xs text-muted-foreground">Payments</p>
                      <p className="font-semibold text-sm mt-1">PCI-DSS</p>
                    </div>
                    <div className="text-center p-3 bg-green-500/5 rounded-xl">
                      <p className="text-xs text-muted-foreground">Access</p>
                      <p className="font-semibold text-sm mt-1">Controlled</p>
                    </div>
                    <div className="text-center p-3 bg-green-500/5 rounded-xl">
                      <p className="text-xs text-muted-foreground">Audits</p>
                      <p className="font-semibold text-sm mt-1">Regular</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    No method of transmission is 100% secure. We cannot guarantee absolute security.
                  </p>
                </div>
              </section>

              {/* Your Rights */}
              <section id="rights" className="mb-10 scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue/10 flex items-center justify-center">
                    <UserCheck className="h-5 w-5 text-blue" />
                  </div>
                  <h2 className="text-xl font-bold font-display">Your Rights and Choices</h2>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="border rounded-2xl p-4">
                      <h3 className="font-semibold text-sm mb-2">Account Info</h3>
                      <p className="text-xs text-muted-foreground">Update, correct, or delete via account settings</p>
                    </div>
                    <div className="border rounded-2xl p-4">
                      <h3 className="font-semibold text-sm mb-2">Marketing</h3>
                      <p className="text-xs text-muted-foreground">Opt out via unsubscribe link in emails</p>
                    </div>
                    <div className="border rounded-2xl p-4">
                      <h3 className="font-semibold text-sm mb-2">Cookies</h3>
                      <p className="text-xs text-muted-foreground">Control via browser settings</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="border rounded-2xl p-5 bg-gradient-to-br from-blue/5 to-transparent">
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <span className="text-xs bg-blue/10 text-blue px-2 py-0.5 rounded-full">CCPA</span>
                        California Residents
                      </h3>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Know what personal information we collect</li>
                        <li>• Request deletion of your information</li>
                        <li>• Opt out of sale (we don&apos;t sell data)</li>
                        <li>• Non-discrimination for exercising rights</li>
                      </ul>
                    </div>
                    <div className="border rounded-2xl p-5 bg-gradient-to-br from-teal/5 to-transparent">
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <span className="text-xs bg-teal/10 text-teal px-2 py-0.5 rounded-full">GDPR</span>
                        European Residents
                      </h3>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Access and rectify personal data</li>
                        <li>• Request erasure or restrict processing</li>
                        <li>• Data portability</li>
                        <li>• Lodge complaints with authorities</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Children's Privacy */}
              <section id="children" className="mb-10 scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-coral/10 flex items-center justify-center">
                    <Baby className="h-5 w-5 text-coral" />
                  </div>
                  <h2 className="text-xl font-bold font-display">Children&apos;s Privacy</h2>
                </div>
                <div className="border rounded-2xl p-6 bg-coral/5">
                  <p className="text-muted-foreground">
                    The Service is not intended for children under 18. We do not knowingly collect personal information from minors. If you believe a child has provided us with personal information, contact us at <a href="mailto:privacy@piads.co" className="text-blue hover:underline">privacy@piads.co</a>.
                  </p>
                </div>
              </section>

              {/* Third-Party Links */}
              <section id="third-party" className="mb-10 scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-purple/10 flex items-center justify-center">
                    <ExternalLink className="h-5 w-5 text-purple" />
                  </div>
                  <h2 className="text-xl font-bold font-display">Third-Party Links</h2>
                </div>
                <div className="border rounded-2xl p-6">
                  <p className="text-muted-foreground">
                    The Service may contain links to third-party websites. We are not responsible for their privacy practices. Review their policies before providing personal information.
                  </p>
                </div>
              </section>

              {/* Changes to Policy */}
              <section id="changes" className="mb-10 scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-yellow/10 flex items-center justify-center">
                    <Eye className="h-5 w-5 text-yellow" />
                  </div>
                  <h2 className="text-xl font-bold font-display">Changes to This Policy</h2>
                </div>
                <div className="border rounded-2xl p-6">
                  <p className="text-muted-foreground">
                    We may update this policy and will notify you by updating the &quot;Last updated&quot; date. For significant changes, we&apos;ll provide additional notice via email or prominent notice on the Service.
                  </p>
                </div>
              </section>

              {/* Contact */}
              <section id="contact" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue/10 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-blue" />
                  </div>
                  <h2 className="text-xl font-bold font-display">Contact Us</h2>
                </div>
                <div className="border rounded-2xl p-6 bg-gradient-to-br from-blue/5 to-teal/5">
                  <p className="text-muted-foreground mb-4">
                    Questions about this Privacy Policy? Contact us:
                  </p>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 bg-white rounded-xl p-4 border">
                      <p className="font-semibold">PiAds</p>
                      <p className="text-sm text-muted-foreground mt-1">2300 Wilson Blvd, Arlington, VA 22201</p>
                    </div>
                    <a href="mailto:privacy@piads.co" className="flex-1 bg-blue text-white rounded-xl p-4 hover:bg-blue/90 transition-colors">
                      <p className="font-semibold">Email Us</p>
                      <p className="text-sm text-white/80 mt-1">privacy@piads.co</p>
                    </a>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
