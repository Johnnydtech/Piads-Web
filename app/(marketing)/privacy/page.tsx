import Link from "next/link"
import { Shield, ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Privacy Policy | PiAds",
  description: "Learn how PiAds collects, uses, and protects your personal information.",
}

export default function PrivacyPage() {
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
            <div className="w-12 h-12 rounded-2xl bg-blue flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-display">Privacy Policy</h1>
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
              <h2 className="text-2xl font-bold font-display mb-4">Introduction</h2>
              <p className="text-muted-foreground mb-4">
                PiAds (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our digital signage advertising platform, including our website, mobile applications, and related services (collectively, the &quot;Service&quot;).
              </p>
              <p className="text-muted-foreground">
                Please read this Privacy Policy carefully. By accessing or using the Service, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy.
              </p>
            </div>

            {/* Information We Collect */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold font-display mb-4">Information We Collect</h2>

              <h3 className="text-xl font-semibold mb-3">Personal Information You Provide</h3>
              <p className="text-muted-foreground mb-4">
                We collect information you voluntarily provide when you:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                <li>Create an account (name, email address, password)</li>
                <li>Set up a venue profile (business name, address, phone number)</li>
                <li>Create an advertiser account (business name, billing information)</li>
                <li>Upload content or creatives (images, videos, advertisements)</li>
                <li>Make payments (payment card information processed by Stripe)</li>
                <li>Contact our support team (communication records)</li>
                <li>Participate in surveys or promotions</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">Information Collected Automatically</h3>
              <p className="text-muted-foreground mb-4">
                When you use our Service, we automatically collect:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                <li><strong>Device Information:</strong> Device type, operating system, browser type, screen resolution</li>
                <li><strong>Usage Data:</strong> Pages visited, features used, time spent on the Service</li>
                <li><strong>Log Data:</strong> IP address, access times, referring URLs</li>
                <li><strong>Screen Analytics:</strong> Content playback data, impression counts, QR code scans</li>
                <li><strong>Location Data:</strong> General geographic location based on IP address (for venues and advertisers)</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">Information from Third Parties</h3>
              <p className="text-muted-foreground mb-4">
                We may receive information from:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Authentication Providers:</strong> When you sign in with Google or other social accounts</li>
                <li><strong>Payment Processors:</strong> Transaction confirmations from Stripe</li>
                <li><strong>Analytics Services:</strong> Aggregated usage statistics</li>
              </ul>
            </div>

            {/* How We Use Your Information */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold font-display mb-4">How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">
                We use your information to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Provide, maintain, and improve the Service</li>
                <li>Process transactions and send related information (confirmations, invoices)</li>
                <li>Match advertisers with appropriate venues based on location and audience</li>
                <li>Generate analytics and reports for venues and advertisers</li>
                <li>Send administrative messages, updates, and security alerts</li>
                <li>Respond to your comments, questions, and support requests</li>
                <li>Monitor and analyze usage patterns and trends</li>
                <li>Detect, prevent, and address fraud or technical issues</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>

            {/* Information Sharing */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold font-display mb-4">Information Sharing and Disclosure</h2>
              <p className="text-muted-foreground mb-4">
                We may share your information in the following circumstances:
              </p>

              <h3 className="text-xl font-semibold mb-3">Between Venues and Advertisers</h3>
              <p className="text-muted-foreground mb-6">
                When an advertiser books a campaign at a venue, we share necessary information to facilitate the transaction, including business names, campaign details, and performance metrics. We do not share personal contact information without consent.
              </p>

              <h3 className="text-xl font-semibold mb-3">Service Providers</h3>
              <p className="text-muted-foreground mb-6">
                We share information with third-party vendors who perform services on our behalf, including:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                <li><strong>Stripe:</strong> Payment processing</li>
                <li><strong>Clerk:</strong> Authentication services</li>
                <li><strong>Supabase:</strong> Database and storage</li>
                <li><strong>Vercel:</strong> Hosting and content delivery</li>
                <li><strong>Analytics providers:</strong> Usage analysis</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">Legal Requirements</h3>
              <p className="text-muted-foreground mb-6">
                We may disclose your information if required by law, regulation, legal process, or governmental request, or to protect the rights, property, or safety of PiAds, our users, or others.
              </p>

              <h3 className="text-xl font-semibold mb-3">Business Transfers</h3>
              <p className="text-muted-foreground">
                If PiAds is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.
              </p>
            </div>

            {/* Data Retention */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold font-display mb-4">Data Retention</h2>
              <p className="text-muted-foreground mb-4">
                We retain your information for as long as your account is active or as needed to provide you services. We also retain information as necessary to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Comply with legal obligations (e.g., tax records for 7 years)</li>
                <li>Resolve disputes and enforce agreements</li>
                <li>Maintain business records</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                You may request deletion of your account and personal data at any time by contacting us at privacy@piads.co.
              </p>
            </div>

            {/* Data Security */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold font-display mb-4">Data Security</h2>
              <p className="text-muted-foreground mb-4">
                We implement appropriate technical and organizational measures to protect your information, including:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Encryption of data in transit (TLS/SSL) and at rest</li>
                <li>Secure authentication through Clerk</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and employee training</li>
                <li>PCI-compliant payment processing through Stripe</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                However, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security.
              </p>
            </div>

            {/* Your Rights */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold font-display mb-4">Your Rights and Choices</h2>

              <h3 className="text-xl font-semibold mb-3">Account Information</h3>
              <p className="text-muted-foreground mb-6">
                You may update, correct, or delete your account information at any time by logging into your account settings or contacting us.
              </p>

              <h3 className="text-xl font-semibold mb-3">Marketing Communications</h3>
              <p className="text-muted-foreground mb-6">
                You may opt out of marketing emails by clicking the &quot;unsubscribe&quot; link in any email or updating your communication preferences in your account settings.
              </p>

              <h3 className="text-xl font-semibold mb-3">Cookies</h3>
              <p className="text-muted-foreground mb-6">
                Most web browsers allow you to control cookies through their settings. Note that disabling cookies may affect your ability to use certain features of the Service.
              </p>

              <h3 className="text-xl font-semibold mb-3">California Privacy Rights (CCPA)</h3>
              <p className="text-muted-foreground mb-4">
                If you are a California resident, you have the right to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                <li>Know what personal information we collect about you</li>
                <li>Request deletion of your personal information</li>
                <li>Opt out of the sale of your personal information (we do not sell personal information)</li>
                <li>Non-discrimination for exercising your rights</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">European Privacy Rights (GDPR)</h3>
              <p className="text-muted-foreground mb-4">
                If you are in the European Economic Area, you have the right to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Access your personal data</li>
                <li>Rectify inaccurate personal data</li>
                <li>Request erasure of your personal data</li>
                <li>Restrict processing of your personal data</li>
                <li>Data portability</li>
                <li>Object to processing</li>
                <li>Lodge a complaint with a supervisory authority</li>
              </ul>
            </div>

            {/* Children's Privacy */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold font-display mb-4">Children&apos;s Privacy</h2>
              <p className="text-muted-foreground">
                The Service is not intended for children under 18 years of age. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and believe your child has provided us with personal information, please contact us at privacy@piads.co.
              </p>
            </div>

            {/* Third-Party Links */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold font-display mb-4">Third-Party Links</h2>
              <p className="text-muted-foreground">
                The Service may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to read the privacy policies of any third-party services you access.
              </p>
            </div>

            {/* Changes to Policy */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold font-display mb-4">Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. For significant changes, we will provide additional notice, such as an email notification or a prominent notice on the Service.
              </p>
            </div>

            {/* Contact */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold font-display mb-4">Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you have questions about this Privacy Policy or our privacy practices, please contact us at:
              </p>
              <div className="bg-secondary/50 rounded-2xl p-6">
                <p className="font-semibold mb-2">PiAds</p>
                <p className="text-muted-foreground">Email: privacy@piads.co</p>
                <p className="text-muted-foreground">Address: Arlington, VA, United States</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
