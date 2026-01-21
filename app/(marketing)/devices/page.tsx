import { Monitor, Tv, Check, Star, ExternalLink, Wifi, Zap, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
  title: "Supported Devices | PiAds",
  description: "View all supported devices for PiAds digital signage. Compatible with Raspberry Pi, Fire TV, Android devices, and web browsers.",
}

const playerTypes = [
  {
    id: "raspberry_pi",
    name: "Raspberry Pi",
    description: "Reliable dedicated signage player for 24/7 operation",
    color: "from-pink-500 to-pink-600",
    bgLight: "bg-pink-50",
    textColor: "text-pink-600",
    borderColor: "border-pink-200",
    iconType: "raspberry",
    tier: "Professional",
    capabilities: {
      maxResolution: "4K @ 60fps",
      videoCodecs: ["H.264", "H.265/HEVC"],
      maxBitrate: "25 Mbps",
      dualScreen: true,
      offline: true,
    },
    features: ["4K with H.265", "Dual screen", "Offline mode", "Auto-restart", "24/7 operation"],
    recommendedFor: ["Menu boards", "Multi-screen", "24/7 operation"],
    devices: [
      { name: "Raspberry Pi 5 (8GB)", model: "RPI5-8GB", resolution: "4K @ 60fps (dual)", price: "$80", rating: "best", url: "https://www.raspberrypi.com/products/raspberry-pi-5/", notes: "Latest model, best performance" },
      { name: "Raspberry Pi 5 (4GB)", model: "RPI5-4GB", resolution: "4K @ 60fps (dual)", price: "$60", rating: "best", url: "https://www.raspberrypi.com/products/raspberry-pi-5/", notes: "Great value, 4GB is enough" },
      { name: "Raspberry Pi 4 (4GB)", model: "RPI4-4GB", resolution: "4K @ 60fps (dual)", price: "$55", rating: "good", url: "https://www.raspberrypi.com/products/raspberry-pi-4-model-b/", notes: "Proven reliable" },
      { name: "Raspberry Pi 4 (2GB)", model: "RPI4-2GB", resolution: "4K @ 60fps (dual)", price: "$45", rating: "budget", url: "https://www.raspberrypi.com/products/raspberry-pi-4-model-b/", notes: "Budget option" },
      { name: "Raspberry Pi 400", model: "RPI400", resolution: "4K @ 30fps", price: "$70", rating: "good", url: "https://www.raspberrypi.com/products/raspberry-pi-400/", notes: "All-in-one keyboard" },
    ],
    requirements: ["Pi 4 or newer", "2GB+ RAM", "16GB+ microSD", "5V 3A USB-C PSU", "microHDMI cable"],
  },
  {
    id: "firetv",
    name: "Fire TV",
    description: "High-performance player with 4K support and easy setup",
    color: "from-orange-500 to-orange-600",
    bgLight: "bg-orange-50",
    textColor: "text-orange-600",
    borderColor: "border-orange-200",
    iconType: "firetv",
    tier: "Premium",
    capabilities: {
      maxResolution: "4K @ 60fps",
      videoCodecs: ["H.264", "H.265", "VP9", "AV1"],
      maxBitrate: "35 Mbps",
      dualScreen: false,
      offline: true,
    },
    features: ["4K Ultra HD", "All video formats", "Offline mode", "Auto-restart", "Plug & play"],
    recommendedFor: ["4K content", "Premium displays", "Lobby screens"],
    devices: [
      { name: "Fire TV Stick 4K Max (2nd Gen)", model: "B0BPK669KT", resolution: "4K @ 60fps", price: "$59.99", rating: "best", url: "https://www.amazon.com/dp/B0BPK669KT", notes: "WiFi 6E, fastest" },
      { name: "Fire TV Stick 4K (2023)", model: "B0BXFV1R93", resolution: "4K @ 60fps", price: "$49.99", rating: "best", url: "https://www.amazon.com/dp/B0BXFV1R93", notes: "Best value for 4K" },
      { name: "Fire TV Stick 4K", model: "B08XVYZ1Y5", resolution: "4K @ 60fps", price: "$39.99", rating: "good", url: "https://www.amazon.com/dp/B08XVYZ1Y5", notes: "Reliable 4K" },
      { name: "Fire TV Stick (3rd Gen)", model: "B08C1W5N87", resolution: "1080p @ 60fps", price: "$29.99", rating: "budget", url: "https://www.amazon.com/dp/B08C1W5N87", notes: "HD only" },
    ],
    requirements: ["Fire TV Stick 3rd Gen+", "Fire OS 7+", "WiFi connection", "8GB+ storage"],
  },
  {
    id: "android",
    name: "Android",
    description: "Versatile player for most digital signage needs",
    color: "from-green-500 to-green-600",
    bgLight: "bg-green-50",
    textColor: "text-green-600",
    borderColor: "border-green-200",
    iconType: "android",
    tier: "Standard",
    capabilities: {
      maxResolution: "4K @ 60fps",
      videoCodecs: ["H.264", "VP9"],
      maxBitrate: "15 Mbps",
      dualScreen: false,
      offline: true,
    },
    features: ["Wide compatibility", "Touch support", "Offline mode", "Interactive displays"],
    recommendedFor: ["Interactive displays", "Retail signage", "Touch kiosks"],
    devices: [
      { name: "NVIDIA Shield TV Pro", model: "945-13897", resolution: "4K @ 60fps", price: "$199.99", rating: "best", url: "https://www.amazon.com/dp/B07YP9FBMM", notes: "Best Android player" },
      { name: "Chromecast with Google TV", model: "GA01919-US", resolution: "4K @ 60fps", price: "$49.99", rating: "best", url: "https://www.amazon.com/dp/B08KRV7S22", notes: "Best value" },
      { name: "Xiaomi Mi Box S", model: "MDZ-22-AB", resolution: "4K @ 60fps", price: "$59.99", rating: "good", url: "https://www.amazon.com/dp/B07KLWGGYS", notes: "Reliable" },
      { name: "onn. Android TV UHD", model: "100026240", resolution: "4K @ 60fps", price: "$19.99", rating: "budget", url: "https://www.walmart.com/ip/100026240", notes: "Budget option" },
      { name: "Samsung Galaxy Tab A8", model: "SM-X200", resolution: "1920x1200", price: "$179.99", rating: "good", url: "https://www.amazon.com/dp/B09N41V9S8", notes: "Touch displays" },
    ],
    requirements: ["Android 8.0+", "2GB+ RAM", "16GB storage", "ARM64", "WiFi"],
  },
  {
    id: "web",
    name: "Web Browser",
    description: "Play content on any device with a web browser",
    color: "from-blue-500 to-blue-600",
    bgLight: "bg-blue-50",
    textColor: "text-blue-600",
    borderColor: "border-blue-200",
    iconType: "web",
    tier: "Basic",
    capabilities: {
      maxResolution: "1080p",
      videoCodecs: ["H.264"],
      maxBitrate: "10 Mbps",
      dualScreen: false,
      offline: false,
    },
    features: ["No app needed", "Quick setup", "Any device", "Great for testing"],
    recommendedFor: ["Quick setup", "Testing", "Smart TVs", "Temporary"],
    devices: [
      { name: "Any Smart TV", model: "Samsung, LG, Sony", resolution: "1080p - 4K", price: "Already owned", rating: "good", url: "", notes: "Use built-in browser" },
      { name: "Any Computer", model: "Windows, Mac, Linux", resolution: "1080p+", price: "Already owned", rating: "good", url: "", notes: "Kiosk mode recommended" },
      { name: "Any Tablet", model: "iPad, Android tablet", resolution: "1080p", price: "Already owned", rating: "budget", url: "", notes: "Guided Access mode" },
    ],
    requirements: ["Chrome 80+, Firefox 75+, Safari 13+", "5+ Mbps internet", "Keep device on", "Disable sleep"],
  },
]

function RatingBadge({ rating }: { rating: string }) {
  if (rating === "best") {
    return (
      <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full">
        <Star className="h-3 w-3 fill-green-500" />
        Best
      </span>
    )
  }
  if (rating === "good") {
    return (
      <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 text-xs font-medium px-2 py-0.5 rounded-full">
        <Check className="h-3 w-3" />
        Good
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">
      Budget
    </span>
  )
}

function PlayerIcon({ type, className = "h-6 w-6" }: { type: string; className?: string }) {
  if (type === "raspberry") {
    // Raspberry Pi icon from Streamline
    return (
      <svg className={className} viewBox="0 0 16 16" fill="currentColor">
        <path d="M14.85 9.91c-0.52 1.66 -0.12 2.99 0.75 4.12 0.7 0.92 1.3 1.93 1.18 3.06 -0.21 1.98 -1.53 3.34 -3.49 3.5 -0.4 0.03 -0.82 0 -1.24 0C12.01 18.47 12.01 16.34 12.01 14.22c0.31 0.03 0.61 0.07 0.88 0.09 0.08 -0.45 0.15 -0.84 0.23 -1.26 -0.09 -0.03 -0.16 -0.07 -0.16 -0.05 -0.35 0.28 -0.65 0.19 -0.94 -0.04 0.01 -0.42 0.01 -0.8 0.02 -1.24 -0.3 0 -0.53 0 -0.87 0 -0.06 0.47 -0.11 0.92 -0.18 1.5 0.35 0.08 0.69 0.15 1.03 0.23 -0.05 0.29 -0.1 0.56 -0.16 0.9 -0.16 -0.02 -0.33 -0.03 -0.52 -0.05 0.05 2.01 0.09 3.99 0.14 5.96 -1.21 0.01 -2.4 -0.03 -3.61 -0.04 0 -1.84 0 -3.68 0 -5.59 -0.15 0.03 -0.27 0.04 -0.42 0.07 -0.08 -0.4 -0.15 -0.75 -0.23 -1.16 0.28 -0.04 0.53 -0.07 0.8 -0.11 0.05 0.34 0.11 0.66 0.17 1.04 0.3 -0.03 0.53 -0.05 0.84 -0.09 0.05 -0.47 0.11 -0.91 0.16 -1.43 -0.3 -0.01 -0.55 -0.01 -0.86 -0.01 -0.04 -0.42 -0.07 -0.76 -0.1 -1.15 0.25 0.05 0.43 0.1 0.65 0.15 0.04 0.43 0.07 0.82 0.11 1.17 0.34 -0.06 0.57 -0.11 0.84 -0.16 -0.05 -0.44 -0.1 -0.87 -0.16 -1.34 -0.52 -0.1 -0.97 -0.18 -1.42 -0.27 0.07 -0.34 0.15 -0.65 0.23 -1.01 0.4 0.07 0.79 0.14 1.18 0.2 0.39 0.05 0.78 0.08 1.12 0.12 0.05 0.5 0.08 0.95 0.13 1.47 0.32 0 0.6 0 0.93 0 0.04 -0.56 0.07 -1.05 0.1 -1.59 -0.58 0.1 -1.11 0.2 -1.69 0.3 -0.05 -0.35 -0.09 -0.67 -0.14 -1 0.59 -0.06 1.14 -0.12 1.68 -0.17 0.47 -0.04 0.93 -0.05 1.43 -0.08 0.08 0.37 0.14 0.7 0.21 1.02 -0.27 0.05 -0.51 0.1 -0.77 0.15 0 0.49 0 0.94 0 1.43 0.24 0.03 0.48 0.06 0.73 0.09 0.04 0.38 0.09 0.72 0.13 1.07 0.02 0 0.04 0.01 0.05 0.01 0.18 -0.22 0.42 -0.24 0.67 -0.23 0.2 0.01 0.4 0 0.59 0 0.04 0.35 0.07 0.65 0.1 0.92 -0.18 0.11 -0.23 0.32 -0.29 0.52 0.22 0.02 0.42 0.03 0.67 0.05 0.03 -0.31 0.06 -0.59 0.09 -0.95 0.24 0.04 0.44 0.07 0.66 0.11 0.06 0.39 0.11 0.77 0.18 1.16 -0.31 0.02 -0.56 0.03 -0.86 0.05 0.04 2.02 0.08 4 0.12 5.97 -1.28 0.01 -2.53 -0.03 -3.79 -0.03 -0.03 -2 -0.05 -4 -0.08 -6 -0.25 0.04 -0.45 0.07 -0.71 0.11 0.08 0.35 0.15 0.66 0.22 0.96 0.22 -0.03 0.39 -0.06 0.59 -0.08 0.03 1.67 0.06 3.31 0.1 4.95 -0.79 -0.03 -1.55 -0.05 -2.33 -0.07 0 -1.57 0 -3.13 0 -4.72 0.19 0.02 0.35 0.03 0.54 0.05 0.08 -0.34 0.15 -0.66 0.23 -1.02 -0.41 -0.05 -0.78 -0.09 -1.16 -0.13 -0.05 0.28 -0.1 0.52 -0.14 0.81 -0.26 -0.04 -0.47 -0.08 -0.71 -0.12 -0.03 0.31 -0.06 0.56 -0.09 0.88 0.2 0 0.35 0 0.54 0 0.03 1.43 0.06 2.82 0.09 4.24 -0.91 0 -1.78 -0.01 -2.65 -0.01 0.05 -2.18 0.1 -4.35 0.15 -6.52 0.38 -0.07 0.76 -0.15 1.16 -0.22 -0.07 -0.37 -0.12 -0.68 -0.18 -1.02 -0.22 0.06 -0.42 0.11 -0.68 0.18 0.04 0.29 0.07 0.57 0.12 0.91 -0.29 0 -0.52 -0.01 -0.81 -0.01 0 0.43 -0.01 0.8 -0.01 1.22 -0.3 -0.24 -0.59 -0.32 -0.94 -0.03 0 -0.03 -0.07 -0.03 -0.17 0.06 -0.08 0.81 -0.15 1.26 -0.23 0.26 -0.02 0.56 -0.05 0.87 -0.08 0 2.11 0 4.23 -0.03 6.35 -1.39 -0.12 -2.7 -0.52 -3.77 -1.51 -1.24 -1.15 -1.86 -2.59 -1.65 -4.21 0.13 -1.01 0.64 -1.93 1.24 -2.78 0.79 -1.11 1.15 -2.35 0.74 -3.83zm-1.73 0.29c0.02 -0.58 -0.04 -1.09 -0.42 -1.51 -0.17 -0.19 -0.42 -0.29 -0.67 -0.26 -0.57 0.06 -0.99 0.48 -1 1.05 0 0.57 0.35 1.02 0.9 1.12 0.51 0.1 0.94 -0.11 1.14 -0.39l0.05 -0.01zm-4.04 -0.02c-0.03 -0.59 -0.06 -1.1 -0.45 -1.5 -0.17 -0.17 -0.39 -0.27 -0.62 -0.27 -0.57 0.01 -1.01 0.42 -1.05 0.99 -0.04 0.58 0.3 1.05 0.84 1.18 0.55 0.12 0.99 -0.08 1.22 -0.37l0.06 -0.03z"/>
      </svg>
    )
  }
  if (type === "firetv") {
    // Amazon/Fire TV icon from Streamline
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="m16.412 16.24 1.587 -1.468a0.532 0.532 0 0 0 0.027 -0.736c-0.655 -0.764 -0.852 -1.401 -0.852 -1.862V6.046c0.007 -1.025 -0.973 -3.076 -4.945 -3.076 -3.538 0 -4.826 2.1 -5.115 3.495 -0.055 0.263 0.148 0.496 0.416 0.52l2.09 0.189c0.255 0.023 0.483 -0.152 0.583 -0.387 0.26 -0.61 0.867 -1.383 2.026 -1.383 1.168 0 1.577 0.895 1.635 1.343V8.13c-5.724 0 -7.204 2.492 -7.204 4.867 0 2.376 1.733 3.563 3.855 3.563 1.409 0 2.709 -0.777 3.43 -1.364a0.547 0.547 0 0 1 0.723 0.014l1.057 1.022a0.5 0.5 0 0 0 0.687 0.008Zm-3.53 -2.578c1.283 -0.976 0.988 -3.699 0.988 -3.699s-2.412 -0.16 -3.354 1.287c-0.514 0.79 -0.348 1.862 0.275 2.412 0.519 0.458 1.392 0.532 2.091 0Zm8.949 3.373c-0.155 -0.176 -0.868 -0.115 -1.553 -0.057 -0.68 0.058 -1.332 0.113 -1.384 -0.067 -0.105 -0.361 3.165 -1.198 3.973 -0.542 0.703 0.57 -1.112 3.935 -1.612 3.664 -0.1 -0.054 0.05 -0.461 0.232 -0.963 0.274 -0.751 0.626 -1.716 0.344 -2.035Zm-9.824 2.313c-4.527 0 -7.771 -1.568 -9.447 -2.378 -0.701 -0.339 -1.127 -0.545 -1.258 -0.447 -0.441 0.33 4.724 4.414 10.705 4.414 5.231 0 9.756 -2.825 9.094 -3.2 -0.237 -0.134 -0.733 0.033 -1.534 0.304 -1.442 0.486 -3.872 1.307 -7.56 1.307Z"/>
      </svg>
    )
  }
  if (type === "android") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48A5.84 5.84 0 0012 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31A5.983 5.983 0 006 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z"/>
      </svg>
    )
  }
  return <Monitor className={className} />
}

export default function DevicesPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="pt-32 md:pt-36 pb-12 md:pb-16 border-b bg-gradient-to-b from-secondary/30 to-background">
        <div className="container max-w-6xl">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue to-teal flex items-center justify-center shadow-lg shadow-blue/25">
              <Tv className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-display">Supported Devices</h1>
              <p className="text-muted-foreground text-sm mt-1">
                Compatible hardware for PiAds digital signage
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Overview */}
      <section className="py-8 border-b">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {playerTypes.map((player) => (
              <a
                key={player.id}
                href={`#${player.id}`}
                className={`p-4 rounded-xl border ${player.borderColor} ${player.bgLight} hover:shadow-md transition-all`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${player.color} flex items-center justify-center`}>
                    <PlayerIcon type={player.iconType} className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{player.name}</p>
                    <p className="text-xs text-muted-foreground">{player.capabilities.maxResolution}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Device Sections */}
      <section className="py-10">
        <div className="container max-w-6xl space-y-12">
          {playerTypes.map((player) => (
            <div key={player.id} id={player.id} className="scroll-mt-24">
              {/* Player Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${player.color} flex items-center justify-center shadow-lg`}>
                  <PlayerIcon type={player.iconType} className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold font-display">{player.name}</h2>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${player.bgLight} ${player.textColor}`}>
                      {player.tier}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{player.description}</p>
                </div>
              </div>

              {/* Specs Row */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 bg-secondary/50 rounded-lg px-3 py-1.5 text-sm">
                  <Zap className="h-3.5 w-3.5 text-yellow-500" />
                  {player.capabilities.maxResolution}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-secondary/50 rounded-lg px-3 py-1.5 text-sm">
                  {player.capabilities.maxBitrate}
                </span>
                {player.capabilities.dualScreen && (
                  <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 rounded-lg px-3 py-1.5 text-sm">
                    <Check className="h-3.5 w-3.5" /> Dual Screen
                  </span>
                )}
                {player.capabilities.offline && (
                  <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 rounded-lg px-3 py-1.5 text-sm">
                    <Wifi className="h-3.5 w-3.5" /> Offline Mode
                  </span>
                )}
              </div>

              {/* Devices Table */}
              <div className="border rounded-xl overflow-hidden mb-4">
                <table className="w-full">
                  <thead>
                    <tr className="bg-secondary/30 text-left text-sm">
                      <th className="px-4 py-3 font-semibold">Device</th>
                      <th className="px-4 py-3 font-semibold hidden sm:table-cell">Resolution</th>
                      <th className="px-4 py-3 font-semibold">Price</th>
                      <th className="px-4 py-3 font-semibold text-center">Rating</th>
                      <th className="px-4 py-3 font-semibold text-right hidden md:table-cell">Link</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {player.devices.map((device, idx) => (
                      <tr key={idx} className={`text-sm ${device.rating === 'best' ? player.bgLight : 'bg-white'}`}>
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium">{device.name}</p>
                            <p className="text-xs text-muted-foreground">{device.notes}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{device.resolution}</td>
                        <td className={`px-4 py-3 font-semibold ${player.textColor}`}>{device.price}</td>
                        <td className="px-4 py-3 text-center">
                          <RatingBadge rating={device.rating} />
                        </td>
                        <td className="px-4 py-3 text-right hidden md:table-cell">
                          {device.url && (
                            <a
                              href={device.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex items-center gap-1 text-xs ${player.textColor} hover:underline`}
                            >
                              Buy <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Requirements */}
              <div className={`${player.bgLight} rounded-xl p-4`}>
                <p className="text-xs font-semibold text-muted-foreground mb-2">REQUIREMENTS</p>
                <div className="flex flex-wrap gap-2">
                  {player.requirements.map((req, idx) => (
                    <span key={idx} className="text-xs bg-white/80 rounded px-2 py-1 text-muted-foreground">
                      {req}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gradient-to-br from-blue/5 to-teal/5 border-t">
        <div className="container max-w-4xl text-center">
          <h2 className="text-2xl font-bold font-display mb-3">Ready to get started?</h2>
          <p className="text-muted-foreground mb-6">
            Turn your screens into a revenue stream. Works with devices you already own.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="bg-blue hover:bg-blue/90" asChild>
              <Link href="https://app.piads.co/get-started">Get Started Free</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
