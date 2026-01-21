import { FileText, Users, Building2, Megaphone, CreditCard, ShieldCheck, Scale, FileWarning, Mail } from "lucide-react"

export const metadata = {
  title: "Terms of Service | PiAds",
  description: "Read the terms and conditions for using the PiAds digital signage advertising platform.",
}

const sections = [
  { id: "agreement", label: "Agreement to Terms" },
  { id: "definitions", label: "Definitions" },
  { id: "eligibility", label: "Eligibility" },
  { id: "account", label: "Account Registration" },
  { id: "venue-terms", label: "Terms for Venues" },
  { id: "advertiser-terms", label: "Terms for Advertisers" },
  { id: "fees", label: "Fees and Payments" },
  { id: "content", label: "Content Guidelines" },
  { id: "ip", label: "Intellectual Property" },
  { id: "disclaimers", label: "Disclaimers" },
  { id: "liability", label: "Limitation of Liability" },
  { id: "disputes", label: "Dispute Resolution" },
  { id: "contact", label: "Contact Us" },
]

export default function TermsPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="pt-32 md:pt-36 pb-12 md:pb-16 border-b bg-gradient-to-b from-secondary/30 to-background">
        <div className="container max-w-6xl">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal to-teal/80 flex items-center justify-center shadow-lg shadow-teal/25">
              <FileText className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-display">Terms of Service</h1>
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
                    className="block text-sm text-muted-foreground hover:text-foreground py-1.5 transition-colors border-l-2 border-transparent hover:border-teal pl-3 -ml-px"
                  >
                    {section.label}
                  </a>
                ))}
              </div>
            </nav>

            {/* Main Content */}
            <div className="min-w-0">
              {/* Agreement to Terms */}
              <section id="agreement" className="mb-10 scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-teal" />
                  </div>
                  <h2 className="text-xl font-bold font-display">1. Agreement to Terms</h2>
                </div>
                <div className="bg-secondary/30 rounded-2xl p-6 space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Welcome to PiAds. These Terms of Service (&quot;Terms&quot;) govern your access to and use of the PiAds platform, including our website at piads.co, mobile applications, and related services (collectively, the &quot;Service&quot;).
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    By accessing or using the Service, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you may not access or use the Service.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    PiAds is operated by PiAds LLC, located at 2300 Wilson Blvd, Arlington, VA 22201.
                  </p>
                </div>
              </section>

              {/* Definitions */}
              <section id="definitions" className="mb-10 scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue" />
                  </div>
                  <h2 className="text-xl font-bold font-display">2. Definitions</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="border rounded-2xl p-4">
                    <p className="font-semibold text-sm">Venue / Venue Owner</p>
                    <p className="text-xs text-muted-foreground mt-1">Business or individual who owns digital screens and uses the Service to display content and ads</p>
                  </div>
                  <div className="border rounded-2xl p-4">
                    <p className="font-semibold text-sm">Advertiser</p>
                    <p className="text-xs text-muted-foreground mt-1">Business or individual who uses the Service to create and place advertisements</p>
                  </div>
                  <div className="border rounded-2xl p-4">
                    <p className="font-semibold text-sm">Campaign</p>
                    <p className="text-xs text-muted-foreground mt-1">An advertising placement purchased to display on one or more Venue screens</p>
                  </div>
                  <div className="border rounded-2xl p-4">
                    <p className="font-semibold text-sm">Daypart</p>
                    <p className="text-xs text-muted-foreground mt-1">Specific time period for ads (Breakfast, Lunch, Evening)</p>
                  </div>
                  <div className="border rounded-2xl p-4">
                    <p className="font-semibold text-sm">Content</p>
                    <p className="text-xs text-muted-foreground mt-1">Any text, images, videos, audio, or materials uploaded through the Service</p>
                  </div>
                  <div className="border rounded-2xl p-4">
                    <p className="font-semibold text-sm">User</p>
                    <p className="text-xs text-muted-foreground mt-1">Any person or entity that accesses or uses the Service</p>
                  </div>
                </div>
              </section>

              {/* Eligibility */}
              <section id="eligibility" className="mb-10 scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-coral/10 flex items-center justify-center">
                    <ShieldCheck className="h-5 w-5 text-coral" />
                  </div>
                  <h2 className="text-xl font-bold font-display">3. Eligibility</h2>
                </div>
                <div className="border rounded-2xl p-6">
                  <p className="text-muted-foreground mb-4">To use the Service, you must:</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    <div className="bg-secondary/50 rounded-xl p-3 text-center">
                      <p className="font-semibold text-lg">18+</p>
                      <p className="text-xs text-muted-foreground">Years of age</p>
                    </div>
                    <div className="bg-secondary/50 rounded-xl p-3 text-center">
                      <p className="font-semibold text-sm">Legal Authority</p>
                      <p className="text-xs text-muted-foreground">To enter Terms</p>
                    </div>
                    <div className="bg-secondary/50 rounded-xl p-3 text-center">
                      <p className="font-semibold text-sm">Not Prohibited</p>
                      <p className="text-xs text-muted-foreground">By applicable law</p>
                    </div>
                    <div className="bg-secondary/50 rounded-xl p-3 text-center">
                      <p className="font-semibold text-sm">Business Auth</p>
                      <p className="text-xs text-muted-foreground">If applicable</p>
                    </div>
                  </div>
                  <div className="bg-coral/10 rounded-xl p-4">
                    <p className="font-semibold text-sm text-coral-700 mb-1">Local Business Requirement</p>
                    <p className="text-sm text-muted-foreground">
                      PiAds is designed for local businesses. We reserve the right to refuse service to large national/multinational corporations or businesses that don&apos;t align with our community-first mission.
                    </p>
                  </div>
                </div>
              </section>

              {/* Account Registration */}
              <section id="account" className="mb-10 scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-purple/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-purple" />
                  </div>
                  <h2 className="text-xl font-bold font-display">4. Account Registration</h2>
                </div>
                <div className="border rounded-2xl p-6">
                  <p className="text-muted-foreground mb-4">When creating an account, you agree to:</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-secondary/50 rounded-lg px-3 py-1.5 text-sm">Provide accurate information</span>
                    <span className="bg-secondary/50 rounded-lg px-3 py-1.5 text-sm">Keep info updated</span>
                    <span className="bg-secondary/50 rounded-lg px-3 py-1.5 text-sm">Secure your password</span>
                    <span className="bg-secondary/50 rounded-lg px-3 py-1.5 text-sm">Report unauthorized access</span>
                    <span className="bg-secondary/50 rounded-lg px-3 py-1.5 text-sm">Accept responsibility for account activity</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    We reserve the right to suspend or terminate accounts with inaccurate information or Terms violations.
                  </p>
                </div>
              </section>

              {/* Terms for Venues */}
              <section id="venue-terms" className="mb-10 scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#A68BA3]/10 flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-[#A68BA3]" />
                  </div>
                  <h2 className="text-xl font-bold font-display">5. Terms for Venues</h2>
                </div>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="border rounded-2xl p-5 bg-gradient-to-br from-[#A68BA3]/10 to-transparent">
                      <p className="text-3xl font-bold text-[#A68BA3]">$10</p>
                      <p className="text-sm text-muted-foreground">/screen/month</p>
                      <p className="text-xs text-muted-foreground mt-2">Platform fee for full access</p>
                    </div>
                    <div className="border rounded-2xl p-5 bg-gradient-to-br from-teal/10 to-transparent">
                      <p className="text-3xl font-bold text-teal">75%</p>
                      <p className="text-sm text-muted-foreground">Revenue share</p>
                      <p className="text-xs text-muted-foreground mt-2">You keep 75% of ad revenue</p>
                    </div>
                    <div className="border rounded-2xl p-5 bg-gradient-to-br from-blue/10 to-transparent">
                      <p className="text-3xl font-bold text-blue">Weekly</p>
                      <p className="text-sm text-muted-foreground">Payouts</p>
                      <p className="text-xs text-muted-foreground mt-2">Via Stripe Connect ($25 min)</p>
                    </div>
                  </div>

                  <div className="border rounded-2xl p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-semibold mb-2">Content Approval</h3>
                        <p className="text-sm text-muted-foreground">Full control over ads. Approve or reject any Campaign before it goes live.</p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Screen Availability</h3>
                        <p className="text-sm text-muted-foreground">Ensure screens are operational during scheduled times. Repeated failures may result in refunds.</p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Your Content</h3>
                        <p className="text-sm text-muted-foreground">Display your own content anytime. Your content takes priority over advertising.</p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Revenue Calculation</h3>
                        <p className="text-sm text-muted-foreground">Calculated after payment processing fees (~2.9% + $0.30/transaction).</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Terms for Advertisers */}
              <section id="advertiser-terms" className="mb-10 scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#7E8BA3]/10 flex items-center justify-center">
                    <Megaphone className="h-5 w-5 text-[#7E8BA3]" />
                  </div>
                  <h2 className="text-xl font-bold font-display">6. Terms for Advertisers</h2>
                </div>
                <div className="space-y-3">
                  <div className="border rounded-2xl p-5">
                    <h3 className="font-semibold mb-3">Campaign Pricing</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Pricing is set by individual Venues based on location, screen size, daypart, and demand. All prices in USD.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-[#7E8BA3]/10 rounded-lg px-3 py-1.5 text-sm">Breakfast: $8-12</span>
                      <span className="bg-[#7E8BA3]/10 rounded-lg px-3 py-1.5 text-sm">Lunch: $12-18</span>
                      <span className="bg-[#7E8BA3]/10 rounded-lg px-3 py-1.5 text-sm">Evening: $15-25</span>
                    </div>
                  </div>

                  <div className="border rounded-2xl p-5">
                    <h3 className="font-semibold mb-3">Cancellation & Refunds</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      <div className="bg-green-500/10 rounded-xl p-3 text-center">
                        <p className="font-semibold text-green-700 text-sm">100%</p>
                        <p className="text-xs text-muted-foreground">Before approval</p>
                      </div>
                      <div className="bg-yellow/10 rounded-xl p-3 text-center">
                        <p className="font-semibold text-yellow-700 text-sm">75%</p>
                        <p className="text-xs text-muted-foreground">&gt;48hrs before</p>
                      </div>
                      <div className="bg-coral/10 rounded-xl p-3 text-center">
                        <p className="font-semibold text-coral text-sm">0%</p>
                        <p className="text-xs text-muted-foreground">&lt;48hrs before</p>
                      </div>
                      <div className="bg-coral/10 rounded-xl p-3 text-center">
                        <p className="font-semibold text-coral text-sm">0%</p>
                        <p className="text-xs text-muted-foreground">In progress</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="border rounded-2xl p-4">
                      <h3 className="font-semibold text-sm mb-2">Payment</h3>
                      <p className="text-xs text-muted-foreground">Required at booking via Stripe. Major credit cards accepted.</p>
                    </div>
                    <div className="border rounded-2xl p-4">
                      <h3 className="font-semibold text-sm mb-2">Campaign Approval</h3>
                      <p className="text-xs text-muted-foreground">Subject to Venue approval (typically 24-48 hours). Full refund if rejected.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Fees and Payments */}
              <section id="fees" className="mb-10 scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-teal" />
                  </div>
                  <h2 className="text-xl font-bold font-display">7. Fees and Payments</h2>
                </div>
                <div className="border rounded-2xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h3 className="font-semibold text-sm mb-2">Pricing</h3>
                      <p className="text-xs text-muted-foreground">Available on website. 30 days notice for changes.</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm mb-2">Taxes</h3>
                      <p className="text-xs text-muted-foreground">You&apos;re responsible for applicable taxes. Sales tax collected where required.</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm mb-2">Processing</h3>
                      <p className="text-xs text-muted-foreground">Via Stripe. Subject to Stripe&apos;s terms of service.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Content Guidelines */}
              <section id="content" className="mb-10 scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-coral/10 flex items-center justify-center">
                    <FileWarning className="h-5 w-5 text-coral" />
                  </div>
                  <h2 className="text-xl font-bold font-display">8. Content Guidelines</h2>
                </div>
                <div className="border rounded-2xl p-6">
                  <p className="text-muted-foreground mb-4">You may NOT upload content that:</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <span className="bg-coral/10 text-coral-700 rounded-lg px-3 py-2 text-sm text-center">Illegal or harmful</span>
                    <span className="bg-coral/10 text-coral-700 rounded-lg px-3 py-2 text-sm text-center">Infringes IP</span>
                    <span className="bg-coral/10 text-coral-700 rounded-lg px-3 py-2 text-sm text-center">False claims</span>
                    <span className="bg-coral/10 text-coral-700 rounded-lg px-3 py-2 text-sm text-center">Adult content</span>
                    <span className="bg-coral/10 text-coral-700 rounded-lg px-3 py-2 text-sm text-center">Gambling</span>
                    <span className="bg-coral/10 text-coral-700 rounded-lg px-3 py-2 text-sm text-center">Tobacco/vaping</span>
                    <span className="bg-coral/10 text-coral-700 rounded-lg px-3 py-2 text-sm text-center">Malware</span>
                    <span className="bg-coral/10 text-coral-700 rounded-lg px-3 py-2 text-sm text-center">Political ads</span>
                    <span className="bg-coral/10 text-coral-700 rounded-lg px-3 py-2 text-sm text-center">Competitor ads</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">
                    We reserve the right to remove violating content and suspend repeat offenders.
                  </p>
                </div>
              </section>

              {/* Intellectual Property */}
              <section id="ip" className="mb-10 scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-purple/10 flex items-center justify-center">
                    <ShieldCheck className="h-5 w-5 text-purple" />
                  </div>
                  <h2 className="text-xl font-bold font-display">9. Intellectual Property</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="border rounded-2xl p-4">
                    <h3 className="font-semibold text-sm mb-2">PiAds Property</h3>
                    <p className="text-xs text-muted-foreground">The Service is owned by PiAds and protected by IP laws. No unauthorized use.</p>
                  </div>
                  <div className="border rounded-2xl p-4">
                    <h3 className="font-semibold text-sm mb-2">Your Content</h3>
                    <p className="text-xs text-muted-foreground">You retain ownership. Grant us license to display it via the Service.</p>
                  </div>
                  <div className="border rounded-2xl p-4">
                    <h3 className="font-semibold text-sm mb-2">Feedback</h3>
                    <p className="text-xs text-muted-foreground">Suggestions become our property and may be used freely.</p>
                  </div>
                </div>
              </section>

              {/* Disclaimers */}
              <section id="disclaimers" className="mb-10 scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-yellow/10 flex items-center justify-center">
                    <FileWarning className="h-5 w-5 text-yellow" />
                  </div>
                  <h2 className="text-xl font-bold font-display">10. Disclaimers</h2>
                </div>
                <div className="border rounded-2xl p-6 bg-yellow/5">
                  <p className="text-sm text-muted-foreground uppercase tracking-wide mb-3">Important Notice</p>
                  <p className="text-muted-foreground mb-4">
                    THE SERVICE IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTIES OF ANY KIND, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    We do not warrant uninterrupted service, accurate results, error correction, or that the Service will meet your specific requirements.
                  </p>
                </div>
              </section>

              {/* Limitation of Liability */}
              <section id="liability" className="mb-10 scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-coral/10 flex items-center justify-center">
                    <Scale className="h-5 w-5 text-coral" />
                  </div>
                  <h2 className="text-xl font-bold font-display">11. Limitation of Liability</h2>
                </div>
                <div className="border rounded-2xl p-6">
                  <p className="text-muted-foreground mb-4">
                    TO THE MAXIMUM EXTENT PERMITTED BY LAW, PIADS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES.
                  </p>
                  <div className="bg-secondary/50 rounded-xl p-4">
                    <p className="text-sm font-semibold">Maximum Liability</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      The greater of: (A) amount paid in the 12 months preceding the claim, or (B) $100.
                    </p>
                  </div>
                </div>
              </section>

              {/* Dispute Resolution */}
              <section id="disputes" className="mb-10 scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue/10 flex items-center justify-center">
                    <Scale className="h-5 w-5 text-blue" />
                  </div>
                  <h2 className="text-xl font-bold font-display">12. Dispute Resolution</h2>
                </div>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="border rounded-2xl p-4 text-center">
                      <p className="text-2xl mb-1">1</p>
                      <p className="font-semibold text-sm">Informal Resolution</p>
                      <p className="text-xs text-muted-foreground mt-1">Contact legal@piads.co first</p>
                    </div>
                    <div className="border rounded-2xl p-4 text-center">
                      <p className="text-2xl mb-1">2</p>
                      <p className="font-semibold text-sm">Binding Arbitration</p>
                      <p className="text-xs text-muted-foreground mt-1">Per AAA rules in Arlington, VA</p>
                    </div>
                    <div className="border rounded-2xl p-4 text-center">
                      <p className="text-2xl mb-1">3</p>
                      <p className="font-semibold text-sm">Individual Only</p>
                      <p className="text-xs text-muted-foreground mt-1">No class actions permitted</p>
                    </div>
                  </div>
                  <div className="border rounded-2xl p-4">
                    <p className="text-sm text-muted-foreground">
                      <strong>Governing Law:</strong> Commonwealth of Virginia. <strong>Entire Agreement:</strong> These Terms + Privacy Policy.
                    </p>
                  </div>
                </div>
              </section>

              {/* Contact */}
              <section id="contact" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-teal" />
                  </div>
                  <h2 className="text-xl font-bold font-display">13. Contact Us</h2>
                </div>
                <div className="border rounded-2xl p-6 bg-gradient-to-br from-teal/5 to-blue/5">
                  <p className="text-muted-foreground mb-4">
                    Questions about these Terms of Service?
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-white rounded-xl p-4 border">
                      <p className="font-semibold text-sm">Company</p>
                      <p className="text-xs text-muted-foreground mt-1">PiAds LLC<br />2300 Wilson Blvd<br />Arlington, VA 22201</p>
                    </div>
                    <a href="mailto:legal@piads.co" className="bg-teal text-white rounded-xl p-4 hover:bg-teal/90 transition-colors">
                      <p className="font-semibold text-sm">Legal</p>
                      <p className="text-xs text-white/80 mt-1">legal@piads.co</p>
                    </a>
                    <a href="mailto:support@piads.co" className="bg-blue text-white rounded-xl p-4 hover:bg-blue/90 transition-colors">
                      <p className="font-semibold text-sm">Support</p>
                      <p className="text-xs text-white/80 mt-1">support@piads.co</p>
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
