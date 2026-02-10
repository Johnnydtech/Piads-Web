"use client"

import Image from "next/image"
import { QRCodeSVG } from "qrcode.react"
import { CheckCircle2 } from "lucide-react"

export default function VenueFlyer() {
  return (
    <>
      {/* Print Button - hidden on print */}
      <div className="print:hidden fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={() => window.print()}
          className="bg-[#4856c4] text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-[#3a46a8] transition-colors shadow-lg"
        >
          Print Flyer
        </button>
        <button
          onClick={() => window.history.back()}
          className="bg-white text-gray-700 px-6 py-3 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors shadow-lg border"
        >
          Back
        </button>
      </div>

      {/* Flyer Container */}
      <div className="flyer-page mx-auto bg-white relative overflow-hidden" style={{ width: "8.5in", minHeight: "11in", maxHeight: "11in" }}>
        {/* Floating background logos */}
        <div className="absolute -right-16 top-12 opacity-[0.12] pointer-events-none">
          <Image
            src="/logo/piads_new_log_transparent.png"
            alt=""
            width={500}
            height={500}
            className="w-[350px] h-auto"
          />
        </div>
        <div className="absolute -left-20 bottom-32 opacity-[0.08] pointer-events-none rotate-12">
          <Image
            src="/logo/piads_new_log_transparent.png"
            alt=""
            width={500}
            height={500}
            className="w-[400px] h-auto"
          />
        </div>
        <div className="absolute right-10 bottom-0 opacity-[0.08] pointer-events-none -rotate-6">
          <Image
            src="/logo/piads_new_log_transparent.png"
            alt=""
            width={300}
            height={300}
            className="w-[200px] h-auto"
          />
        </div>

        <div className="flex flex-col h-full relative z-10" style={{ height: "11in", padding: "0.35in 0.55in" }}>

          {/* === TOP SECTION: Logo + Headline === */}
          <div className="text-center mb-3">
            {/* Logo */}
            <div className="flex items-center justify-center gap-3 mb-2.5">
              <Image
                src="/logo/piads_new_log_transparent.png"
                alt="PiAds"
                width={56}
                height={56}
                className="object-contain"
              />
              <Image
                src="/logo/piads-logo-text.png"
                alt="PiAds"
                width={140}
                height={44}
                className="object-contain"
              />
            </div>

            {/* Headline */}
            <h1 className="font-display text-[1.65rem] font-extrabold text-gray-900 leading-tight mb-1.5">
              Your TV Is Already On The Wall.
              <br />
              <span className="text-[#4856c4]">Make It Work For You.</span>
            </h1>
            <p className="text-gray-600 text-sm max-w-md mx-auto">
              Digital signage for your venue starting with a free 7-day trial. Support local businesses with community ads.
            </p>
          </div>

          {/* === DIVIDER === */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#4856c4]/30 to-transparent mb-3" />

          {/* === VALUE PROPS === */}
          <div className="grid grid-cols-3 gap-3 mb-3">
            {/* Prop 1 - Dashboard screenshot */}
            <div className="bg-[#f0f2ff] rounded-xl p-3 text-center">
              <div className="w-full h-14 rounded-lg overflow-hidden mb-2 bg-white shadow-sm">
                <Image
                  src="/cms-screenshots/screens-overview-clean.png"
                  alt="PiAds Dashboard"
                  width={200}
                  height={56}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <h3 className="font-display font-bold text-[13px] text-gray-900 mb-0.5">Free Digital Menu Board</h3>
              <p className="text-[11px] text-gray-600 leading-snug">
                Display your menu, schedule, and promotions. Update from your phone in 30 seconds.
              </p>
            </div>

            {/* Prop 2 - Easy setup */}
            <div className="bg-[#e8f8f9] rounded-xl p-3 text-center">
              <div className="h-14 mx-auto mb-2 flex items-center justify-center gap-2.5">
                {/* Android TV logo */}
                <svg width="36" height="36" viewBox="0 0 48 48" className="flex-shrink-0">
                  <path d="M15.53 17.01h16.94c.55 0 1 .45 1 1v14.98c0 .55-.45 1-1 1H15.53c-.55 0-1-.45-1-1V18.01c0-.55.45-1 1-1z" fill="#3DDC84"/>
                  <path d="M18.29 11.76l-1.93-3.35a.4.4 0 01.15-.55.4.4 0 01.55.15l1.95 3.39a11.1 11.1 0 014.99-1.18c1.8 0 3.48.43 4.99 1.18l1.95-3.39a.4.4 0 01.55-.15.4.4 0 01.15.55l-1.93 3.35A10.47 10.47 0 0134 20.01H14a10.47 10.47 0 014.29-8.25z" fill="#3DDC84"/>
                  <circle cx="19.5" cy="16.5" r="1.2" fill="white"/>
                  <circle cx="28.5" cy="16.5" r="1.2" fill="white"/>
                  <rect x="10" y="20" width="2.5" height="10" rx="1.25" fill="#3DDC84"/>
                  <rect x="35.5" y="20" width="2.5" height="10" rx="1.25" fill="#3DDC84"/>
                  <rect x="19" y="34" width="2.5" height="5" rx="1.25" fill="#3DDC84"/>
                  <rect x="26.5" y="34" width="2.5" height="5" rx="1.25" fill="#3DDC84"/>
                </svg>
                <Image
                  src="/icons/fireTV.png"
                  alt="Fire TV"
                  width={36}
                  height={36}
                  className="object-contain flex-shrink-0"
                />
                <Image
                  src="/icons/webplayer.png"
                  alt="Chrome Browser"
                  width={36}
                  height={36}
                  className="object-contain flex-shrink-0"
                />
              </div>
              <h3 className="font-display font-bold text-[13px] text-gray-900 mb-0.5">Easy Setup, 10 Minutes</h3>
              <p className="text-[11px] text-gray-600 leading-snug">
                Works on any Android TV, Chrome browser, or smart TV. Open PiAds and you&apos;re live.
              </p>
            </div>

            {/* Prop 3 - Marketplace screenshot */}
            <div className="bg-[#fff5e6] rounded-xl p-3 text-center">
              <div className="w-full h-14 rounded-lg overflow-hidden mb-2 bg-white shadow-sm">
                <Image
                  src="/cms-screenshots/marketplace-cms-new.png"
                  alt="PiAds Ad Marketplace"
                  width={400}
                  height={200}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "center 65%" }}
                />
              </div>
              <h3 className="font-display font-bold text-[13px] text-gray-900 mb-0.5">Support Local Businesses</h3>
              <p className="text-[11px] text-gray-600 leading-snug">
                Neighbor businesses advertise on your screen. You earn a share and approve every ad.
              </p>
            </div>
          </div>

          {/* === COMMUNITY BOARD === */}
          <div className="bg-gradient-to-br from-[#f0f2ff] to-[#e8f8f9] rounded-xl p-4 mb-3">
            <h2 className="font-display font-bold text-[15px] text-center text-gray-900 mb-1">Your Screen Becomes a Community Board</h2>
            <p className="text-[10px] text-gray-500 text-center mb-2.5">Here&apos;s what plays on your TV throughout the day</p>
            <div className="grid grid-cols-4 gap-2">
              {[
                { time: "Morning", emoji: "☕", content: "Your daily specials & menu", bg: "bg-white", border: "border-[#4856c4]/15" },
                { time: "Midday", emoji: "🏪", content: "Neighbor ads: dentist, yoga studio, florist", bg: "bg-white", border: "border-[#0b9ba5]/15" },
                { time: "Afternoon", emoji: "📣", content: "Your events, happy hours & promos", bg: "bg-white", border: "border-[#4856c4]/15" },
                { time: "Evening", emoji: "🏘️", content: "Community: local events, farmer&apos;s market", bg: "bg-white", border: "border-[#0b9ba5]/15" },
              ].map((slot, i) => (
                <div key={i} className={`${slot.bg} border ${slot.border} rounded-lg p-2 text-center shadow-sm`}>
                  <div className="text-lg mb-0.5">{slot.emoji}</div>
                  <div className="text-[10px] font-bold text-[#4856c4] mb-0.5">{slot.time}</div>
                  <div className="text-[9px] text-gray-600 leading-tight">{slot.content}</div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-4 mt-2.5 pt-2 border-t border-[#4856c4]/10">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#4856c4]" />
                <span className="text-[10px] text-gray-600"><span className="font-bold">You</span> control what plays</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#0b9ba5]" />
                <span className="text-[10px] text-gray-600"><span className="font-bold">You</span> approve every ad</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#e8940c]" />
                <span className="text-[10px] text-gray-600">Earn <span className="font-bold">$50–$200/mo</span></span>
              </div>
            </div>
          </div>

          {/* === HOW IT WORKS === */}
          <div className="mb-3">
            <h2 className="font-display font-bold text-[15px] text-center text-gray-900 mb-2.5">How It Works</h2>
            <div className="flex items-start justify-between gap-2">
              {[
                { step: "1", text: "Sign up free at piads.co" },
                { step: "2", text: "Open on Android TV or Chrome" },
                { step: "3", text: "Upload your content" },
                { step: "4", text: "Share local community ads" },
              ].map((item, i) => (
                <div key={i} className="flex-1 flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-full bg-[#4856c4] text-white flex items-center justify-center text-sm font-bold mb-1.5">
                    {item.step}
                  </div>
                  <p className="text-[11px] text-gray-700 leading-tight font-medium">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* === VENUE TYPES === */}
          <div className="mb-3 text-center py-2">
            <p className="text-[11px] text-gray-500 font-medium tracking-wide uppercase mb-1.5">Perfect for</p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {["Coffee Shops", "Restaurants", "Gyms", "Salons", "Breweries", "Offices"].map((venue, i) => (
                <span key={i} className="text-[12px] font-semibold text-[#4856c4] bg-[#f0f2ff] px-3 py-1 rounded-full">
                  {venue}
                </span>
              ))}
            </div>
          </div>

          {/* === SPACER === */}
          <div className="flex-1" />

          {/* === BOTTOM CTA + QR === */}
          <div className="bg-[#f0f2ff] rounded-xl p-3.5 flex items-center gap-5">
            {/* Left: QR Code */}
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <QRCodeSVG
                  value="https://calendly.com/yohanes-piads/30min"
                  size={80}
                  level="M"
                  fgColor="#4856c4"
                  bgColor="#ffffff"
                />
              </div>
              <p className="text-[9px] text-gray-500 mt-1 font-medium">Scan to book a call</p>
            </div>

            {/* Right: CTA Text */}
            <div className="flex-1">
              <h3 className="font-display font-bold text-base text-gray-900 mb-0.5">
                7-Day Free Trial
              </h3>
              <p className="text-[11px] text-gray-500 mb-1.5">Then just <span className="font-bold text-[#4856c4]">$10/screen per month</span>. Cancel anytime.</p>
              <div className="space-y-0.5 mb-2">
                {[
                  "7-day free trial, no card required",
                  "Only $10/screen/month after trial",
                  "Set up in 10 minutes",
                  "Cancel anytime, no contracts",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-[#0b9ba5] flex-shrink-0" />
                    <span className="text-[11px] text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2.5">
                <Image
                  src="/logo/piads_new_log_transparent.png"
                  alt="PiAds"
                  width={20}
                  height={20}
                  className="object-contain"
                />
                <span className="text-sm font-bold text-[#4856c4]">piads.co</span>
                <span className="text-[10px] text-gray-400">|</span>
                <span className="text-[10px] text-gray-500">Community screens for Arlington businesses</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
