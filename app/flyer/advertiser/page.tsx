"use client"

import Image from "next/image"
import { QRCodeSVG } from "qrcode.react"

const VENUE_URL =
  "https://app.piads.co/advertiser/venue/60585491-6fe0-4230-be18-0753484c1739?from=2026-02-19T19%3A44%3A48.313Z&to=2026-02-26T19%3A44%3A48.313Z"

export default function AdvertiserFlyer() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1129] via-[#1a1d3a] to-[#0f1129] flex items-center justify-center p-8">
      <div className="max-w-3xl w-full flex flex-col items-center text-center gap-10">
        {/* PiAds Logo */}
        <div className="flex items-center gap-4">
          <Image
            src="/logo/piads_new_log_transparent.png"
            alt="PiAds"
            width={80}
            height={80}
            className="object-contain"
          />
          <Image
            src="/logo/piads-logo-text.png"
            alt="PiAds"
            width={200}
            height={64}
            className="object-contain brightness-0 invert"
          />
        </div>

        {/* Headline */}
        <div>
          <h1 className="text-white text-6xl font-extrabold leading-tight tracking-tight">
            Book This Screen
          </h1>
          <p className="text-white/60 text-xl mt-3">
            Advertise your business right here.
            <br />
            Scan the QR code to get started.
          </p>
        </div>

        {/* QR Code */}
        <div className="bg-white p-5 rounded-2xl shadow-2xl shadow-[#4856c4]/20">
          <QRCodeSVG
            value={VENUE_URL}
            size={200}
            level="M"
            fgColor="#4856c4"
            bgColor="#ffffff"
          />
        </div>

        {/* Subtext */}
        <p className="text-white/40 text-sm tracking-widest uppercase font-medium">
          Scan to book &middot; app.piads.co
        </p>
      </div>
    </div>
  )
}
