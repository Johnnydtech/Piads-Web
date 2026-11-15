import Link from "next/link";
import { ArrowRight, BookOpen, Monitor, ShieldCheck } from "lucide-react";
import { KnowledgeBase } from "@/components/knowledge-base";

export const metadata = {
  title: "Knowledge Base — Advertising & Screen Help",
  description: "Learn how to book local ads, upload artwork, understand prices and plays, track approvals, and manage your PiAds screens.",
  alternates: { canonical: "/knowledge-base" },
};

export default function KnowledgeBasePage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-20">
      <header className="max-w-3xl">
        <p className="mb-4 flex items-center gap-2 text-sm font-medium text-primary"><BookOpen className="h-5 w-5" aria-hidden="true" />PiAds knowledge base</p>
        <h1 className="text-4xl sm:text-6xl">A little help. A clear next step.</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">From your first local ad to your first connected TV. Find practical answers, understand your booking, and get back to what you do best.</p>
      </header>
      <KnowledgeBase />
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        <section className="rounded-3xl border border-border bg-card p-6 sm:p-8">
          <Monitor className="mb-4 h-6 w-6 text-primary" aria-hidden="true" />
          <h2 className="text-2xl">Setting up your own screens?</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">Follow our setup guides for pairing a TV, assigning a playlist, and managing your venue.</p>
          <Link href="/get-started" className="mt-5 inline-flex items-center gap-2 font-medium text-primary underline underline-offset-4">Open the setup guides<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </section>
        <section className="rounded-3xl border border-border bg-card p-6 sm:p-8">
          <ShieldCheck className="mb-4 h-6 w-6 text-primary" aria-hidden="true" />
          <h2 className="text-2xl">Policies & support</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">These guides explain the product. Our Terms cover service conditions and our Privacy Policy explains how information is handled.</p>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-primary underline underline-offset-4"><Link href="/terms">Terms of Service</Link><Link href="/privacy">Privacy Policy</Link><Link href="/contact">Contact PiAds</Link></div>
        </section>
      </div>
    </div>
  );
}
