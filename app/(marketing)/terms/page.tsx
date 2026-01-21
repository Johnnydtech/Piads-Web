import Link from "next/link"
import { FileText, ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Terms of Service | PiAds",
  description: "Read the terms and conditions for using the PiAds digital signage advertising platform.",
}

export default function TermsPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container max-w-4xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-teal flex items-center justify-center">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-display">Terms of Service</h1>
          </div>
          <p className="text-muted-foreground">
            Last updated: January 20, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <div className="prose prose-lg max-w-none">

            {/* Introduction */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold font-display mb-4">1. Agreement to Terms</h2>
              <p className="text-muted-foreground mb-4">
                Welcome to PiAds. These Terms of Service (&quot;Terms&quot;) govern your access to and use of the PiAds platform, including our website at piads.co, mobile applications, and related services (collectively, the &quot;Service&quot;).
              </p>
              <p className="text-muted-foreground mb-4">
                By accessing or using the Service, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you may not access or use the Service.
              </p>
              <p className="text-muted-foreground">
                PiAds is operated by PiAds LLC (&quot;PiAds,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), a company based in Arlington, Virginia, United States.
              </p>
            </div>

            {/* Definitions */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold font-display mb-4">2. Definitions</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>&quot;Venue&quot;</strong> or <strong>&quot;Venue Owner&quot;</strong> means a business or individual who owns or operates digital screens and uses the Service to display content and advertisements.</li>
                <li><strong>&quot;Advertiser&quot;</strong> means a business or individual who uses the Service to create and place advertisements on Venue screens.</li>
                <li><strong>&quot;User&quot;</strong> means any person or entity that accesses or uses the Service, including Venues and Advertisers.</li>
                <li><strong>&quot;Content&quot;</strong> means any text, images, videos, audio, or other materials uploaded, submitted, or displayed through the Service.</li>
                <li><strong>&quot;Campaign&quot;</strong> means an advertising placement purchased by an Advertiser to display on one or more Venue screens.</li>
                <li><strong>&quot;Daypart&quot;</strong> means a specific time period during which advertisements are displayed (e.g., Breakfast, Lunch, Evening).</li>
              </ul>
            </div>

            {/* Eligibility */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold font-display mb-4">3. Eligibility</h2>
              <p className="text-muted-foreground mb-4">
                To use the Service, you must:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Be at least 18 years of age</li>
                <li>Have the legal authority to enter into these Terms</li>
                <li>Not be prohibited from using the Service under applicable law</li>
                <li>For business accounts, have the authority to bind your organization to these Terms</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                <strong>Local Business Requirement:</strong> PiAds is designed for local businesses. We reserve the right to refuse service to or terminate accounts of large national or multinational corporations, franchises of national chains, or businesses that do not align with our community-first mission.
              </p>
            </div>

            {/* Account Registration */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold font-display mb-4">4. Account Registration</h2>
              <p className="text-muted-foreground mb-4">
                To access certain features of the Service, you must create an account. When creating an account, you agree to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and promptly update your account information</li>
                <li>Keep your password secure and confidential</li>
                <li>Notify us immediately of any unauthorized access to your account</li>
                <li>Accept responsibility for all activities that occur under your account</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                We reserve the right to suspend or terminate accounts that contain inaccurate information or violate these Terms.
              </p>
            </div>

            {/* Venue Terms */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold font-display mb-4">5. Terms for Venues</h2>

              <h3 className="text-xl font-semibold mb-3">5.1 Platform Fee</h3>
              <p className="text-muted-foreground mb-6">
                Venues pay a monthly platform fee of $10 per screen connected to the Service. This fee is billed monthly and grants access to all platform features, including content management, scheduling, and advertising capabilities.
              </p>

              <h3 className="text-xl font-semibold mb-3">5.2 Revenue Share</h3>
              <p className="text-muted-foreground mb-6">
                When Advertisers book Campaigns on your screens, you receive <strong>75% of the advertising revenue</strong>. PiAds retains 25% as a service fee. Revenue is calculated after payment processing fees (approximately 2.9% + $0.30 per transaction).
              </p>

              <h3 className="text-xl font-semibold mb-3">5.3 Payouts</h3>
              <p className="text-muted-foreground mb-6">
                Payouts are processed weekly via Stripe Connect. You must connect a valid bank account to receive payouts. Minimum payout threshold is $25. Payouts below this threshold will be rolled over to the next payment period.
              </p>

              <h3 className="text-xl font-semibold mb-3">5.4 Content Approval</h3>
              <p className="text-muted-foreground mb-6">
                You have full control over the content displayed on your screens. You may approve or reject any Campaign before it goes live. Once approved, the Campaign will run for its scheduled duration unless you cancel it (subject to refund obligations).
              </p>

              <h3 className="text-xl font-semibold mb-3">5.5 Screen Availability</h3>
              <p className="text-muted-foreground mb-6">
                You are responsible for ensuring your screens are operational during scheduled Campaign times. Repeated failures to display booked advertisements may result in refunds to Advertisers and potential account suspension.
              </p>

              <h3 className="text-xl font-semibold mb-3">5.6 Your Content</h3>
              <p className="text-muted-foreground">
                You may display your own content (announcements, promotions, etc.) on your screens at any time. Your content takes priority and advertising fills available slots as configured by you.
              </p>
            </div>

            {/* Advertiser Terms */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold font-display mb-4">6. Terms for Advertisers</h2>

              <h3 className="text-xl font-semibold mb-3">6.1 Campaign Pricing</h3>
              <p className="text-muted-foreground mb-6">
                Campaign pricing is set by individual Venues and varies based on location, screen size, daypart, and demand. Prices are displayed in the marketplace before booking. All prices are in US Dollars.
              </p>

              <h3 className="text-xl font-semibold mb-3">6.2 Payment</h3>
              <p className="text-muted-foreground mb-6">
                Payment is required at the time of booking. We accept major credit cards through our payment processor, Stripe. By making a payment, you authorize us to charge your payment method for the total Campaign cost.
              </p>

              <h3 className="text-xl font-semibold mb-3">6.3 Campaign Approval</h3>
              <p className="text-muted-foreground mb-6">
                All Campaigns are subject to Venue approval. If a Venue rejects your Campaign, you will receive a full refund. Approval typically occurs within 24-48 hours.
              </p>

              <h3 className="text-xl font-semibold mb-3">6.4 Cancellation and Refunds</h3>
              <p className="text-muted-foreground mb-4">
                Refund policy:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                <li><strong>Before Venue approval:</strong> Full refund</li>
                <li><strong>After approval, more than 48 hours before start:</strong> 75% refund</li>
                <li><strong>Less than 48 hours before start:</strong> No refund</li>
                <li><strong>Campaign in progress:</strong> No refund for completed portions</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">6.5 Creative Guidelines</h3>
              <p className="text-muted-foreground mb-4">
                Your advertisements must comply with our Content Guidelines (Section 8). We reserve the right to reject or remove any content that violates these guidelines.
              </p>
            </div>

            {/* Fees and Payments */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold font-display mb-4">7. Fees and Payments</h2>

              <h3 className="text-xl font-semibold mb-3">7.1 Pricing</h3>
              <p className="text-muted-foreground mb-6">
                Current pricing is available on our website. We reserve the right to change pricing at any time with 30 days&apos; notice to existing users.
              </p>

              <h3 className="text-xl font-semibold mb-3">7.2 Taxes</h3>
              <p className="text-muted-foreground mb-6">
                You are responsible for all applicable taxes. Prices displayed do not include taxes unless otherwise stated. We may collect sales tax where required by law.
              </p>

              <h3 className="text-xl font-semibold mb-3">7.3 Payment Processing</h3>
              <p className="text-muted-foreground">
                Payments are processed by Stripe. By using the Service, you agree to Stripe&apos;s terms of service. We are not responsible for any fees charged by Stripe or your financial institution.
              </p>
            </div>

            {/* Content Guidelines */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold font-display mb-4">8. Content Guidelines</h2>
              <p className="text-muted-foreground mb-4">
                You may not upload, submit, or display Content that:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Is illegal, harmful, threatening, abusive, harassing, defamatory, or obscene</li>
                <li>Infringes on any patent, trademark, copyright, or other intellectual property rights</li>
                <li>Contains false or misleading claims</li>
                <li>Promotes illegal products or services</li>
                <li>Contains malware, viruses, or other harmful code</li>
                <li>Violates any applicable advertising standards or regulations</li>
                <li>Targets or discriminates against any individual or group</li>
                <li>Contains adult content, gambling, or tobacco/vaping products</li>
                <li>Promotes competing digital signage platforms</li>
                <li>Is political in nature (candidate endorsements, ballot measures)</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                We reserve the right to remove any Content that violates these guidelines and to suspend or terminate accounts that repeatedly violate them.
              </p>
            </div>

            {/* Intellectual Property */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold font-display mb-4">9. Intellectual Property</h2>

              <h3 className="text-xl font-semibold mb-3">9.1 PiAds Property</h3>
              <p className="text-muted-foreground mb-6">
                The Service, including its design, features, and functionality, is owned by PiAds and protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, or create derivative works of the Service without our written permission.
              </p>

              <h3 className="text-xl font-semibold mb-3">9.2 Your Content</h3>
              <p className="text-muted-foreground mb-6">
                You retain ownership of Content you upload to the Service. By uploading Content, you grant PiAds a non-exclusive, worldwide, royalty-free license to use, display, and distribute your Content solely for the purpose of providing the Service.
              </p>

              <h3 className="text-xl font-semibold mb-3">9.3 Feedback</h3>
              <p className="text-muted-foreground">
                Any feedback, suggestions, or ideas you provide about the Service become our property, and we may use them without any obligation to you.
              </p>
            </div>

            {/* Disclaimers */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold font-display mb-4">10. Disclaimers</h2>
              <p className="text-muted-foreground mb-4">
                THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>
              <p className="text-muted-foreground mb-4">
                We do not warrant that:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>The Service will be uninterrupted, secure, or error-free</li>
                <li>Results obtained from the Service will be accurate or reliable</li>
                <li>Any errors in the Service will be corrected</li>
                <li>The Service will meet your specific requirements</li>
              </ul>
            </div>

            {/* Limitation of Liability */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold font-display mb-4">11. Limitation of Liability</h2>
              <p className="text-muted-foreground mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, PIADS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, OR GOODWILL, ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICE.
              </p>
              <p className="text-muted-foreground">
                OUR TOTAL LIABILITY FOR ANY CLAIMS ARISING OUT OF OR RELATED TO THESE TERMS OR THE SERVICE SHALL NOT EXCEED THE GREATER OF (A) THE AMOUNT YOU PAID US IN THE 12 MONTHS PRECEDING THE CLAIM OR (B) $100.
              </p>
            </div>

            {/* Indemnification */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold font-display mb-4">12. Indemnification</h2>
              <p className="text-muted-foreground">
                You agree to indemnify, defend, and hold harmless PiAds and its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including reasonable attorneys&apos; fees) arising out of or related to your use of the Service, your Content, your violation of these Terms, or your violation of any rights of another.
              </p>
            </div>

            {/* Termination */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold font-display mb-4">13. Termination</h2>
              <p className="text-muted-foreground mb-4">
                You may terminate your account at any time by contacting us at support@piads.co. We may suspend or terminate your account at any time for any reason, including if we believe you have violated these Terms.
              </p>
              <p className="text-muted-foreground mb-4">
                Upon termination:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Your access to the Service will cease immediately</li>
                <li>Any pending Campaigns will be cancelled and refunded per our refund policy</li>
                <li>Any outstanding payments owed to you will be processed within 30 days</li>
                <li>We may retain your data as required by law or for legitimate business purposes</li>
              </ul>
            </div>

            {/* Dispute Resolution */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold font-display mb-4">14. Dispute Resolution</h2>

              <h3 className="text-xl font-semibold mb-3">14.1 Informal Resolution</h3>
              <p className="text-muted-foreground mb-6">
                Before filing a formal dispute, you agree to contact us at legal@piads.co to attempt to resolve the dispute informally.
              </p>

              <h3 className="text-xl font-semibold mb-3">14.2 Arbitration</h3>
              <p className="text-muted-foreground mb-6">
                Any disputes that cannot be resolved informally shall be resolved through binding arbitration in accordance with the American Arbitration Association&apos;s rules. The arbitration shall take place in Arlington, Virginia, or remotely at your option.
              </p>

              <h3 className="text-xl font-semibold mb-3">14.3 Class Action Waiver</h3>
              <p className="text-muted-foreground">
                You agree to resolve disputes with us on an individual basis and waive any right to participate in class action lawsuits or class-wide arbitration.
              </p>
            </div>

            {/* General */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold font-display mb-4">15. General Provisions</h2>

              <h3 className="text-xl font-semibold mb-3">15.1 Governing Law</h3>
              <p className="text-muted-foreground mb-6">
                These Terms shall be governed by the laws of the Commonwealth of Virginia, without regard to its conflict of law provisions.
              </p>

              <h3 className="text-xl font-semibold mb-3">15.2 Entire Agreement</h3>
              <p className="text-muted-foreground mb-6">
                These Terms, together with our Privacy Policy, constitute the entire agreement between you and PiAds regarding the Service.
              </p>

              <h3 className="text-xl font-semibold mb-3">15.3 Severability</h3>
              <p className="text-muted-foreground mb-6">
                If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.
              </p>

              <h3 className="text-xl font-semibold mb-3">15.4 Waiver</h3>
              <p className="text-muted-foreground mb-6">
                Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
              </p>

              <h3 className="text-xl font-semibold mb-3">15.5 Assignment</h3>
              <p className="text-muted-foreground">
                You may not assign or transfer these Terms without our prior written consent. We may assign these Terms without restriction.
              </p>
            </div>

            {/* Changes */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold font-display mb-4">16. Changes to Terms</h2>
              <p className="text-muted-foreground">
                We may modify these Terms at any time. We will notify you of material changes by posting the updated Terms on this page and updating the &quot;Last updated&quot; date. Your continued use of the Service after any changes constitutes your acceptance of the new Terms.
              </p>
            </div>

            {/* Contact */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold font-display mb-4">17. Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you have questions about these Terms of Service, please contact us at:
              </p>
              <div className="bg-secondary/50 rounded-2xl p-6">
                <p className="font-semibold mb-2">PiAds LLC</p>
                <p className="text-muted-foreground">Email: legal@piads.co</p>
                <p className="text-muted-foreground">Support: support@piads.co</p>
                <p className="text-muted-foreground">Address: Arlington, VA, United States</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
