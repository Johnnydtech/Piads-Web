import { Monitor, Tv, Check, Star, ExternalLink, Wifi, Zap, Play, Download, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

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
    features: ["4K with H.265", "Dual screen", "Offline mode", "Auto restart", "24/7 operation"],
    recommendedFor: ["Menu boards", "Multi screen", "24/7 operation"],
    devices: [
      { name: "Raspberry Pi 5 (8GB)", model: "RPI5-8GB", resolution: "4K @ 60fps (dual)", price: "$80", rating: "best", url: "https://www.raspberrypi.com/products/raspberry-pi-5/", notes: "Latest model, best performance, dual 4K output" },
      { name: "Raspberry Pi 5 (4GB)", model: "RPI5-4GB", resolution: "4K @ 60fps (dual)", price: "$120", rating: "best", url: "https://www.raspberrypi.com/products/raspberry-pi-5/", notes: "Great performance, 4GB is enough for signage" },
      { name: "Raspberry Pi 4 Model B (4GB)", model: "RPI4-MODBP-4GB", resolution: "4K @ 60fps (dual)", price: "$55", rating: "good", url: "https://www.raspberrypi.com/products/raspberry-pi-4-model-b/", notes: "Proven reliable, widely available" },
    ],
    requirements: ["Pi 4 or newer", "4GB+ RAM recommended", "16GB+ microSD", "5V 3A USB C PSU", "microHDMI cable"],
  },
  {
    id: "firetv",
    name: "Fire TV",
    description: "High performance player with 4K support and easy setup",
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
    features: ["4K Ultra HD", "All video formats", "Offline mode", "Auto restart", "Plug & play"],
    recommendedFor: ["4K content", "Premium displays", "Lobby screens"],
    devices: [
      { name: "Fire TV Stick 4K Max (2nd Gen)", model: "B0BPK669KT", resolution: "4K @ 60fps", price: "$59.99", rating: "best", url: "https://www.amazon.com/all-new-amazon-fire-tv-stick-4k-max/dp/B0BP9SNVH9", notes: "Best performance, WiFi 6E, fastest processor" },
    ],
    requirements: ["Fire TV Stick 4K+", "Fire OS 7+", "WiFi connection", "8GB+ storage"],
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
      { name: "Chromecast with Google TV (4K)", model: "GA01919-US", resolution: "4K @ 60fps", price: "$122.99", rating: "good", url: "https://www.amazon.com/dp/B08KRV7S22", notes: "Best value Android TV, sideload our app" },
      { name: "Xiaomi Mi Box S", model: "MDZ-22-AB", resolution: "4K @ 60fps", price: "$69.99", rating: "good", url: "https://www.amazon.com/dp/B07KLWGGYS", notes: "Reliable Android TV box, good value" },
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
      maxResolution: "4K",
      videoCodecs: ["H.264"],
      maxBitrate: "10 Mbps",
      dualScreen: false,
      offline: false,
    },
    features: ["No app needed", "Quick setup", "Any device", "Great for testing"],
    recommendedFor: ["Quick setup", "Testing", "Smart TVs", "Temporary"],
    devices: [
      { name: "Any Smart TV", model: "Samsung, LG, Sony with built in browser", resolution: "1080p to 4K", price: "Already owned", rating: "good", url: "", notes: "Use the built in web browser, keep screen from sleeping" },
      { name: "Any Computer/Laptop", model: "Windows, Mac, Linux with Chrome/Firefox", resolution: "1080p+", price: "Already owned", rating: "good", url: "", notes: "Set browser to kiosk mode for best experience" },
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

function PlayerIcon({ type, className = "h-6 w-6", size = 24 }: { type: string; className?: string; size?: number }) {
  if (type === "raspberry") {
    return (
      <div className={`${className} relative flex items-center justify-center`}>
        <Image
          src="/icons/raspberrry_pi_logo.png"
          alt="Raspberry Pi"
          width={size}
          height={size}
          className="object-contain w-full h-full"
        />
      </div>
    )
  }
  if (type === "firetv") {
    return (
      <div className={`${className} relative flex items-center justify-center`}>
        <Image
          src="/icons/fireTV.png"
          alt="Fire TV"
          width={size * 2}
          height={size * 1.5}
          className="object-contain scale-125"
        />
      </div>
    )
  }
  if (type === "android") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48A5.84 5.84 0 0012 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31A5.983 5.983 0 006 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z"/>
      </svg>
    )
  }
  if (type === "web") {
    return (
      <div className={`${className} relative flex items-center justify-center`}>
        <Image
          src="/icons/webplayer.png"
          alt="Web Browser"
          width={size * 1.5}
          height={size * 1.5}
          className="object-contain scale-110"
        />
      </div>
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

      {/* Downloads Section */}
      <section className="py-10 bg-gradient-to-br from-blue/5 via-transparent to-teal/5">
        <div className="container max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold font-display mb-2">Download Player Apps</h2>
            <p className="text-muted-foreground">Get the PiAds player for your device</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-secondary/30">
                    <th className="text-left px-6 py-4 font-semibold">Platform</th>
                    <th className="text-left px-6 py-4 font-semibold hidden sm:table-cell">Details</th>
                    <th className="text-right px-6 py-4 font-semibold">Download</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Image src="/icons/raspberrry_pi_logo.png" alt="Raspberry Pi" width={32} height={32} />
                        <div>
                          <p className="font-medium">Raspberry Pi</p>
                          <p className="text-xs text-muted-foreground sm:hidden">Pi 4 & 5, 64-bit, ~2GB</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <div className="flex gap-2">
                        <span className="text-xs bg-pink-50 text-pink-600 px-2 py-1 rounded">Pi 4 & 5</span>
                        <span className="text-xs bg-pink-50 text-pink-600 px-2 py-1 rounded">64-bit</span>
                        <span className="text-xs bg-pink-50 text-pink-600 px-2 py-1 rounded">~2GB</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button size="sm" className="bg-pink-600 hover:bg-pink-700" asChild>
                        <a href="https://github.com/piads/piads-image/releases/latest" target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4 mr-2" />
                          Image
                        </a>
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Image src="/icons/fireTV.png" alt="Fire TV / Android" width={32} height={32} />
                        <div>
                          <p className="font-medium">Android / Fire TV</p>
                          <p className="text-xs text-muted-foreground sm:hidden">Fire TV, Android 8+, ~15MB</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <div className="flex gap-2">
                        <span className="text-xs bg-orange-50 text-orange-600 px-2 py-1 rounded">Fire TV</span>
                        <span className="text-xs bg-orange-50 text-orange-600 px-2 py-1 rounded">Android 8+</span>
                        <span className="text-xs bg-orange-50 text-orange-600 px-2 py-1 rounded">~15MB</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <a
                        href="https://piads.co/app"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ backgroundColor: '#f97316', color: 'white' }}
                        className="inline-flex items-center gap-2 font-medium text-sm rounded-md px-3 py-2 transition-colors hover:opacity-90"
                      >
                        <Download className="h-4 w-4" />
                        APK
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Need help setting up? Check our <Link href="/get-started" className="text-blue hover:underline">setup guides</Link>
          </p>
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
