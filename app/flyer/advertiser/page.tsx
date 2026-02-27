"use client"

import Image from "next/image"
import { QRCodeSVG } from "qrcode.react"

const VENUE_URL =
  "https://app.piads.co/advertiser/venue/60585491-6fe0-4230-be18-0753484c1739?from=2026-02-19T19%3A44%3A48.313Z&to=2026-02-26T19%3A44%3A48.313Z"

export default function AdvertiserFlyer() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8 relative overflow-hidden">
      {/* Subtle radial glow behind content */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#4856c4]/[0.06] blur-[120px]" />
      </div>

      {/* Accent lines */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#4856c4]/60 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#4856c4]/60 to-transparent" />

      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center text-center">
        {/* PiAds Logo - big and proud */}
        <div className="flex items-center gap-5 mb-14">
          <Image
            src="/logo/piads_new_log_transparent.png"
            alt="PiAds"
            width={140}
            height={140}
            className="object-contain drop-shadow-[0_0_40px_rgba(72,86,196,0.3)]"
          />
          <Image
            src="/logo/piads-logo-text.png"
            alt="PiAds"
            width={320}
            height={100}
            className="object-contain brightness-0 invert"
          />
        </div>

        {/* Thin separator */}
        <div className="w-24 h-[1px] bg-[#4856c4]/50 mb-10" />

        {/* Headline */}
        <h1 className="text-white text-7xl font-extrabold tracking-tight leading-none mb-4">
          BOOK THIS SCREEN
        </h1>
        <p className="text-white/50 text-lg font-light tracking-wide mb-14 max-w-md">
          Advertise your business to every customer who walks through this door.
        </p>

        {/* QR + CTA row */}
        <div className="flex items-center gap-10 mb-14">
          {/* QR Code with glow */}
          <div className="relative">
            <div className="absolute -inset-4 bg-[#4856c4]/10 rounded-3xl blur-xl" />
            <div className="relative bg-white p-4 rounded-2xl">
              <QRCodeSVG
                value={VENUE_URL}
                size={180}
                level="M"
                fgColor="#000000"
                bgColor="#ffffff"
              />
            </div>
          </div>

          {/* Arrow + text */}
          <div className="text-left">
            <div className="flex items-center gap-3 mb-2">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-[#4856c4] flex-shrink-0">
                <path d="M5 12h14m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transform="scale(-1,1) translate(-24,0)" />
              </svg>
              <span className="text-[#4856c4] text-2xl font-bold tracking-wide uppercase">
                Scan Here
              </span>
            </div>
            <p className="text-white/40 text-sm pl-11">
              Sign up free. Pick your dates.
              <br />
              Your ad goes live on this screen.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#4856c4] animate-pulse" />
          <span className="text-white/30 text-xs tracking-[0.25em] uppercase font-medium">
            app.piads.co
          </span>
        </div>
      </div>
    </div>
  )
}
