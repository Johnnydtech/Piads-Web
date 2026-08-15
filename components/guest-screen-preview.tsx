"use client"

import { useEffect, useState } from "react"
import { QRCodeSVG } from "qrcode.react"
import { WifiHigh, MapPin, Clock, Sparkle } from "@phosphor-icons/react"

/**
 * Illustrative mockup of the PiAds guest screen — rendered live with the
 * site's design system (no screenshots). Shows the four guest cards and
 * the personalized greeting hosts get with a PMS connection.
 */
export function GuestScreenPreview() {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const t = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(t)
  }, [])

  const time = now
    ? now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
    : "9:41 AM"

  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      {/* Tablet frame */}
      <div
        className="relative rounded-[28px] p-[10px]"
        style={{
          background: "linear-gradient(145deg, #3a3a3c, #1c1c1e)",
          boxShadow:
            "0 25px 60px rgba(0,0,0,0.3), 0 8px 20px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        <div className="rounded-[20px] overflow-hidden bg-gray-950 aspect-[4/3]">
          {/* Screen content */}
          <div className="h-full flex flex-col p-4 sm:p-5 text-white bg-gradient-to-br from-gray-950 via-gray-900 to-[#1d2350]">
            {/* Top bar: greeting + clock */}
            <div className="flex items-start justify-between mb-3 sm:mb-4">
              <div>
                <p className="text-[10px] sm:text-xs text-white/50 uppercase tracking-widest mb-0.5">
                  Sunset Loft · Arlington
                </p>
                <p className="text-lg sm:text-2xl font-bold font-display">
                  Welcome, Sarah
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm sm:text-lg font-semibold tabular-nums">{time}</p>
                <p className="text-[10px] sm:text-xs text-white/50">Checkout Sunday · 11 AM</p>
              </div>
            </div>

            {/* Card grid */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 flex-1 min-h-0">
              {/* WiFi card */}
              <div className="bg-white/10 backdrop-blur rounded-xl p-2.5 sm:p-3 flex items-center gap-2.5 sm:gap-3">
                <div className="bg-white rounded-lg p-1.5 shrink-0">
                  <QRCodeSVG
                    value="WIFI:T:WPA;S:SunsetLoft-Guest;P:welcome!;;"
                    size={52}
                    marginSize={0}
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <WifiHigh weight="bold" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan" />
                    <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white/70">
                      WiFi
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold truncate">SunsetLoft-Guest</p>
                  <p className="text-[10px] sm:text-xs text-white/50">Scan to join</p>
                </div>
              </div>

              {/* House rules card */}
              <div className="bg-white/10 backdrop-blur rounded-xl p-2.5 sm:p-3 min-w-0">
                <div className="flex items-center gap-1 mb-1">
                  <Clock weight="bold" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange" />
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white/70">
                    House Rules
                  </span>
                </div>
                <ul className="text-[10px] sm:text-xs text-white/80 space-y-0.5">
                  <li>Quiet hours after 10 PM</li>
                  <li>No shoes upstairs</li>
                  <li className="text-white/50">Checkout: start dishwasher, keys in lockbox</li>
                </ul>
              </div>

              {/* Local guide card */}
              <div className="bg-white/10 backdrop-blur rounded-xl p-2.5 sm:p-3 min-w-0">
                <div className="flex items-center gap-1 mb-1">
                  <MapPin weight="bold" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-coral" />
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white/70">
                    Local Guide
                  </span>
                </div>
                <ul className="text-[10px] sm:text-xs text-white/80 space-y-0.5">
                  <li>Best coffee · 4 min walk</li>
                  <li>Host favorite: tacos on Fillmore</li>
                </ul>
                <div className="mt-1.5 bg-teal/25 border border-teal/40 rounded-md px-1.5 py-1">
                  <p className="text-[8px] sm:text-[10px] uppercase tracking-wider text-cyan/90 font-semibold">
                    Recommended Nearby
                  </p>
                  <p className="text-[10px] sm:text-xs text-white/90">Neighborhood pizza · 0.4 mi</p>
                </div>
              </div>

              {/* Host extras card */}
              <div className="bg-white/10 backdrop-blur rounded-xl p-2.5 sm:p-3 flex items-center gap-2.5 sm:gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1 mb-1">
                    <Sparkle weight="bold" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange" />
                    <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white/70">
                      Extras
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold">Late checkout</p>
                  <p className="text-[10px] sm:text-xs text-white/50">Scan to book</p>
                </div>
                <div className="bg-white rounded-lg p-1.5 shrink-0">
                  <QRCodeSVG value="https://piads.co" size={44} marginSize={0} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Caption */}
      <p className="text-center text-sm text-muted-foreground mt-4">
        The guest screen — live on the host&apos;s own tablet, by the door or in the kitchen
      </p>
    </div>
  )
}
