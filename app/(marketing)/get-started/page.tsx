"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Search,
  ChevronDown,
  ChevronRight,
  Play,
  Rocket,
  Monitor,
  DollarSign,
  HelpCircle,
  Store,
  Target,
  Settings,
  Lightbulb,
  ArrowRight,
  BookOpen,
  Tv,
} from "lucide-react"
import { cn } from "@/lib/utils"

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.piads.co"

// Guide data structure
const venueGuides = [
  {
    id: "venue-getting-started",
    category: "Getting Started",
    icon: Rocket,
    color: "bg-blue",
    colorLight: "bg-blue/10",
    textColor: "text-blue",
    items: [
      {
        id: "create-venue-account",
        title: "Create your venue account",
        description: "Sign up and set up your venue profile in minutes",
        content: `1. Go to app.piads.co and click "Get Started"\n2. Choose "I'm a Venue Owner"\n3. Enter your business details (name, address, type)\n4. Verify your email address\n5. Complete your venue profile with photos and description\n\nTip: Add high-quality photos of your space to attract more advertisers!`,
      },
      {
        id: "add-first-screen",
        title: "Add your first screen",
        description: "Connect a display and start showing content",
        content: `1. From your dashboard, click "Add Screen"\n2. Name your screen (e.g., "Front Entrance TV")\n3. Choose your player type (Raspberry Pi, Fire TV, or Web)\n4. Follow the device-specific setup instructions\n5. Your screen will appear online once connected\n\nNeed help choosing a device? Check our Supported Devices page.`,
      },
      {
        id: "venue-setup-video",
        title: "Video: 2-minute setup walkthrough",
        description: "Watch how to get your first screen running",
        video: true,
      },
    ],
  },
  {
    id: "venue-content",
    category: "Content Management",
    icon: Monitor,
    color: "bg-teal",
    colorLight: "bg-teal/10",
    textColor: "text-teal",
    items: [
      {
        id: "create-playlists",
        title: "Create and manage playlists",
        description: "Organize your content into playlists for easy scheduling",
        content: `1. Go to Content > Playlists in your dashboard\n2. Click "Create Playlist"\n3. Name your playlist (e.g., "Happy Hour Promos")\n4. Add content items (images, videos, websites)\n5. Set duration for each item\n6. Drag to reorder items\n\nTip: Create different playlists for different times of day!`,
      },
      {
        id: "schedule-content",
        title: "Schedule content by time of day",
        description: "Show the right content at the right time",
        content: `PiAds uses "dayparts" to organize your schedule:\n\n• Breakfast (7am - 11am): Morning announcements\n• Lunch (11am - 3pm): Lunch specials, busy period\n• Evening (5pm - 10pm): Happy hour, dinner service\n\nTo set up scheduling:\n1. Go to Screens > Select your screen\n2. Click "Schedule"\n3. Assign playlists to each daypart\n4. Your content will automatically switch!`,
      },
      {
        id: "add-media",
        title: "Add images, videos, and websites",
        description: "Upload and display various content types",
        content: `Supported content types:\n\n• Images: JPG, PNG, GIF (recommended: 1920x1080)\n• Videos: MP4, WebM (max 100MB, 30 seconds ideal)\n• Websites: Any URL (great for live dashboards)\n• YouTube: Paste any YouTube URL\n• Social: Instagram and TikTok embeds\n\nTo upload:\n1. Go to Content > Media Library\n2. Click "Upload" or drag files\n3. Add to any playlist`,
      },
    ],
  },
  {
    id: "venue-earning",
    category: "Earning with Ads",
    icon: DollarSign,
    color: "bg-green-500",
    colorLight: "bg-green-500/10",
    textColor: "text-green-600",
    items: [
      {
        id: "set-pricing",
        title: "Set your ad pricing",
        description: "Control how much advertisers pay for your screen time",
        content: `You set your own prices per daypart:\n\n• Breakfast: $8-12/day typical\n• Lunch: $12-18/day typical\n• Evening: $15-25/day typical\n\nTo set pricing:\n1. Go to Screens > Select screen > Pricing\n2. Enable "Accept Advertisements"\n3. Set your price for each daypart\n4. Save changes\n\nHigher foot traffic = higher prices you can charge!`,
      },
      {
        id: "approve-advertisers",
        title: "Approve or reject advertisers",
        description: "You control who advertises on your screens",
        content: `When an advertiser books your screen:\n\n1. You'll receive a notification\n2. Review their ad creative\n3. Check their business profile\n4. Approve or reject the booking\n\nYou can also:\n• Auto-approve trusted advertisers\n• Set content guidelines\n• Block specific categories\n\nRemember: Only local businesses can advertise on PiAds!`,
      },
      {
        id: "how-payouts-work",
        title: "How payouts work (75% to you)",
        description: "Get paid for every ad that runs on your screens",
        content: `Revenue split:\n• You keep: 75% of all ad revenue\n• PiAds takes: 25% platform fee\n\nPayout schedule:\n• Payments processed monthly\n• Minimum payout: $25\n• Direct deposit to your bank\n\nExample: If an advertiser pays $100/week:\n• You receive: $75/week\n• That's $300/month per screen!\n\nTrack earnings in Dashboard > Revenue.`,
      },
    ],
  },
  {
    id: "venue-troubleshooting",
    category: "Troubleshooting",
    icon: HelpCircle,
    color: "bg-orange-500",
    colorLight: "bg-orange-500/10",
    textColor: "text-orange-600",
    items: [
      {
        id: "screen-not-displaying",
        title: "Screen not displaying content?",
        description: "Common fixes for display issues",
        content: `Try these steps:\n\n1. Check internet connection on your player device\n2. Refresh the player (pull down or restart app)\n3. Verify the screen is "Online" in your dashboard\n4. Check if content is scheduled for current time\n5. Clear browser cache (for web players)\n\nStill not working?\n• Try a different browser/device\n• Check firewall settings\n• Contact support@piads.co`,
      },
      {
        id: "content-not-updating",
        title: "Content not updating?",
        description: "Sync issues and how to fix them",
        content: `Content typically syncs within 1-2 minutes.\n\nIf updates aren't showing:\n\n1. Force refresh: Press F5 or restart the player app\n2. Check your internet speed (5+ Mbps recommended)\n3. Verify changes were saved in the dashboard\n4. Check if the playlist is assigned to current daypart\n\nFor immediate updates:\n• Use the "Sync Now" button in Screens > [Your Screen]`,
      },
    ],
  },
]

const advertiserGuides = [
  {
    id: "advertiser-getting-started",
    category: "Getting Started",
    icon: Store,
    color: "bg-blue",
    colorLight: "bg-blue/10",
    textColor: "text-blue",
    items: [
      {
        id: "create-advertiser-account",
        title: "Create your advertiser account",
        description: "Join as a local business and start advertising",
        content: `1. Go to app.piads.co and click "Get Started"\n2. Choose "I'm an Advertiser"\n3. Enter your business details\n4. Add your business location (helps find nearby venues)\n5. Verify your email\n\nNote: PiAds is for local businesses only. Your ads will appear in venues near your business location.`,
      },
      {
        id: "browse-venues",
        title: "Browse local venues",
        description: "Find the perfect screens for your business",
        content: `Discover venues in your area:\n\n1. Go to Marketplace from your dashboard\n2. Use filters:\n   • Distance from your business\n   • Venue type (gym, cafe, restaurant, etc.)\n   • Price range\n   • Available dayparts\n3. View venue details: foot traffic, screen specs, photos\n4. Save favorites for quick booking\n\nTip: Start with venues your customers already visit!`,
      },
      {
        id: "advertiser-video",
        title: "Video: How to book your first ad",
        description: "Watch the booking process step by step",
        video: true,
      },
    ],
  },
  {
    id: "advertiser-campaigns",
    category: "Creating Campaigns",
    icon: Target,
    color: "bg-teal",
    colorLight: "bg-teal/10",
    textColor: "text-teal",
    items: [
      {
        id: "choose-venues-dayparts",
        title: "Choose your venues and dayparts",
        description: "Target the right audience at the right time",
        content: `Dayparts explained:\n\n• Breakfast (7-11am): Early birds, commuters\n• Lunch (11am-3pm): Lunch crowd, highest traffic\n• Evening (5-10pm): After-work crowd, dinner guests\n\nTo book:\n1. Select a venue from the Marketplace\n2. Choose which dayparts you want\n3. Select dates (minimum 1 week recommended)\n4. Add to cart\n5. Repeat for multiple venues\n\nPro tip: Lunch dayparts often have the most foot traffic!`,
      },
      {
        id: "set-budget",
        title: "Set your budget ($50-75/week to start)",
        description: "Affordable advertising for local businesses",
        content: `Typical costs:\n\n• Single screen, 1 daypart: $8-25/day\n• Single screen, all dayparts: $30-50/day\n• Weekly package: $50-150/week\n\nRecommended starter budget: $50-75/week\n\nThis gets you:\n• 1-2 screens\n• Prime dayparts (lunch or evening)\n• 7 days of exposure\n• ~1,000-2,000 impressions\n\nStart small, measure results, then scale up!`,
      },
      {
        id: "upload-creative",
        title: "Upload your creative",
        description: "Get your ad ready to display",
        content: `Creative specs:\n\n• Image: 1920x1080px, JPG/PNG, under 5MB\n• Video: 1920x1080, MP4, 15-30 seconds, under 50MB\n\nBest practices:\n• Keep text large and readable\n• Use your logo prominently\n• Include a clear call-to-action\n• Avoid tiny details (viewed from distance)\n\nUpload in Campaigns > Creatives > Upload New`,
      },
    ],
  },
  {
    id: "advertiser-managing",
    category: "Managing Campaigns",
    icon: Settings,
    color: "bg-purple-500",
    colorLight: "bg-purple-500/10",
    textColor: "text-purple-600",
    items: [
      {
        id: "view-performance",
        title: "View campaign performance",
        description: "Track impressions and engagement",
        content: `Your dashboard shows:\n\n• Total impressions (views)\n• Screens reached\n• Cost per impression\n• Daily/weekly trends\n\nTo view reports:\n1. Go to Campaigns > [Your Campaign]\n2. Click "View Report"\n3. Select date range\n4. Export to PDF if needed\n\nMetrics update daily. Check back regularly to optimize!`,
      },
      {
        id: "pause-cancel",
        title: "Pause or cancel campaigns",
        description: "Flexible control over your advertising",
        content: `To pause a campaign:\n1. Go to Campaigns > [Your Campaign]\n2. Click "Pause Campaign"\n3. Your ads stop immediately\n4. Resume anytime\n\nTo cancel:\n1. Click "Cancel Campaign"\n2. Unused days may be refunded (check policy)\n\nNote: Completed days are non-refundable.`,
      },
      {
        id: "how-billing-works",
        title: "How billing works",
        description: "Understand charges and payments",
        content: `Billing process:\n\n1. Add items to cart\n2. Checkout with credit card\n3. Charged immediately for booking\n4. Venue approves your ad\n5. Campaign starts on scheduled date\n\nIf venue rejects:\n• Full refund processed automatically\n• Usually within 3-5 business days\n\nView all invoices in Account > Billing`,
      },
    ],
  },
  {
    id: "advertiser-tips",
    category: "Tips for Success",
    icon: Lightbulb,
    color: "bg-yellow-500",
    colorLight: "bg-yellow-500/10",
    textColor: "text-yellow-600",
    items: [
      {
        id: "creative-best-practices",
        title: "Best practices for ad creatives",
        description: "Make your ads stand out",
        content: `Do:\n• Use bold, high-contrast colors\n• Keep text to 7 words or less\n• Show your product/service clearly\n• Include your business name\n• Add a simple CTA ("Visit us today!")\n\nDon't:\n• Use tiny fonts\n• Cram too much information\n• Use low-resolution images\n• Forget your branding\n\nTest tip: View your ad from 10 feet away!`,
      },
      {
        id: "daypart-guide",
        title: "When to run your ads (daypart guide)",
        description: "Match your ads to the right audience",
        content: `Best dayparts by business type:\n\n☕ Coffee shop: Breakfast (catch morning crowd)\n🍕 Restaurant: Lunch + Evening\n💪 Fitness studio: Morning + Evening\n🛍️ Retail: Lunch (shopping hours)\n🍺 Bar: Evening (happy hour)\n\nGeneral rule:\n• Lunch = highest volume\n• Evening = engaged audience\n• Breakfast = repeat exposure\n\nStart with one daypart, then expand based on results.`,
      },
    ],
  },
]

// Individual guide item with expandable content
function GuideItem({ item, color, colorLight, textColor }: {
  item: typeof venueGuides[0]["items"][0]
  color: string
  colorLight: string
  textColor: string
}) {
  const [isOpen, setIsOpen] = useState(false)

  if (item.video) {
    return (
      <div id={item.id} className="border rounded-2xl p-6 scroll-mt-32">
        <div className="flex items-start gap-3 mb-4">
          <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", colorLight)}>
            <Play className={cn("h-4 w-4", textColor)} />
          </div>
          <div>
            <h4 className="font-semibold">{item.title}</h4>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
        </div>
        <div className="relative aspect-video bg-secondary/50 rounded-xl overflow-hidden group cursor-pointer hover:bg-secondary/70 transition-colors">
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className={cn("w-14 h-14 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform", color)}>
              <Play className="h-6 w-6 text-white ml-1" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Video coming soon</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div id={item.id} className="border rounded-2xl overflow-hidden scroll-mt-32">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 hover:bg-secondary/20 transition-colors text-left flex items-start gap-3"
      >
        <ChevronRight
          className={cn(
            "h-5 w-5 text-muted-foreground mt-0.5 transition-transform duration-200 flex-shrink-0",
            isOpen && "rotate-90"
          )}
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold">{item.title}</h4>
          <p className="text-sm text-muted-foreground">{item.description}</p>
        </div>
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          isOpen ? "max-h-[1000px]" : "max-h-0"
        )}
      >
        <div className="px-6 pb-6">
          <div className={cn("rounded-xl p-4 ml-8", colorLight)}>
            <pre className="whitespace-pre-wrap text-sm font-sans text-muted-foreground">{item.content}</pre>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function GetStartedPage() {
  const [activeTab, setActiveTab] = useState<"venues" | "advertisers">("venues")
  const [searchQuery, setSearchQuery] = useState("")

  const guides = activeTab === "venues" ? venueGuides : advertiserGuides

  // Filter guides based on search
  const filteredGuides = searchQuery
    ? guides.map(guide => ({
        ...guide,
        items: guide.items.filter(
          item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(guide => guide.items.length > 0)
    : guides

  // Build sidebar sections from current guides
  const sidebarSections = filteredGuides.map(guide => ({
    id: guide.id,
    label: guide.category,
    icon: guide.icon,
  }))

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="pt-32 md:pt-36 pb-12 md:pb-16 border-b bg-gradient-to-b from-secondary/30 to-background">
        <div className="container max-w-6xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue to-teal flex items-center justify-center shadow-lg shadow-blue/25">
              <BookOpen className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-display">Get Started</h1>
              <p className="text-muted-foreground text-sm mt-1">
                Everything you need to know about PiAds
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 h-12 rounded-full bg-white border-secondary"
            />
          </div>

          {/* Tab Buttons */}
          <div className="flex gap-2 mt-6">
            <button
              onClick={() => {
                setActiveTab("venues")
                setSearchQuery("")
              }}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all text-sm",
                activeTab === "venues"
                  ? "bg-blue text-white"
                  : "bg-secondary/50 hover:bg-secondary text-foreground"
              )}
            >
              <Tv className="h-4 w-4" />
              For Venues
            </button>
            <button
              onClick={() => {
                setActiveTab("advertisers")
                setSearchQuery("")
              }}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all text-sm",
                activeTab === "advertisers"
                  ? "bg-teal text-white"
                  : "bg-secondary/50 hover:bg-secondary text-foreground"
              )}
            >
              <Store className="h-4 w-4" />
              For Advertisers
            </button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-10 md:py-14">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10">
            {/* Sidebar Navigation */}
            <nav className="hidden lg:block">
              <div className="sticky top-24 space-y-4 max-h-[calc(100vh-120px)] overflow-y-auto pr-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {activeTab === "venues" ? "Venue Guides" : "Advertiser Guides"}
                </p>
                {filteredGuides.map((guide) => {
                  const Icon = guide.icon
                  return (
                    <div key={guide.id} className="space-y-1">
                      <a
                        href={`#${guide.id}`}
                        className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-blue py-1.5 transition-colors"
                      >
                        <Icon className={cn("h-4 w-4", guide.textColor)} />
                        {guide.category}
                      </a>
                      <div className="ml-6 space-y-0.5 border-l border-gray-200 pl-3">
                        {guide.items.map((item) => (
                          <a
                            key={item.id}
                            href={`#${item.id}`}
                            className="block text-xs text-muted-foreground hover:text-blue py-1 transition-colors truncate"
                          >
                            {item.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </nav>

            {/* Main Content */}
            <div className="min-w-0">
              {searchQuery && filteredGuides.length === 0 ? (
                <div className="text-center py-16 border rounded-2xl">
                  <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No results found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try a different search term or browse the categories
                  </p>
                  <Button variant="outline" onClick={() => setSearchQuery("")}>
                    Clear search
                  </Button>
                </div>
              ) : (
                <div className="space-y-10">
                  {filteredGuides.map((guide) => {
                    const Icon = guide.icon
                    return (
                      <section key={guide.id} id={guide.id} className="scroll-mt-24">
                        <div className="flex items-center gap-3 mb-4">
                          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", guide.colorLight)}>
                            <Icon className={cn("h-5 w-5", guide.textColor)} />
                          </div>
                          <h2 className="text-xl font-bold font-display">{guide.category}</h2>
                        </div>
                        <div className="space-y-3">
                          {guide.items.map((item) => (
                            <GuideItem
                              key={item.id}
                              item={item}
                              color={guide.color}
                              colorLight={guide.colorLight}
                              textColor={guide.textColor}
                            />
                          ))}
                        </div>
                      </section>
                    )
                  })}
                </div>
              )}

              {/* CTA Section */}
              <div className="mt-12 bg-gradient-to-br from-blue/5 to-teal/5 rounded-2xl p-8 text-center">
                <h3 className="text-xl font-bold font-display mb-2">
                  Ready to get started?
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  {activeTab === "venues"
                    ? "Turn your screens into a revenue stream. Setup takes just 5 minutes."
                    : "Reach local customers where they already spend time. Start with just $50/week."}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button size="lg" className="bg-blue hover:bg-blue/90 rounded-full" asChild>
                    <Link href={`${APP_URL}/sign-up`}>
                      {activeTab === "venues" ? "Add Your Venue" : "Start Advertising"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-full" asChild>
                    <Link href="/contact">Contact Support</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
