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
        description: "Sign up and create your first venue",
        content: `Step 1: Go to app.piads.co
Click "Get Started" on the homepage.

Step 2: Choose your role
Select "I'm a Venue" - this sets up your account for screen management and earning from ads.

Step 3: Sign up
• Enter your email address
• Create a password (or sign up with Google)
• Verify your email if prompted

Step 4: Create your venue
After signing in, you'll be prompted to create your first venue:
• Business name (e.g., "Joe's Coffee Shop")
• Address (helps advertisers find you)
• Venue type (cafe, restaurant, gym, salon, etc.)

Step 5: Choose your next step
After creating your venue, you'll see options to:
• Connect a screen
• Create a playlist
• Upload media

Tip: We recommend connecting your first screen next!`,
      },
      {
        id: "add-first-screen",
        title: "Connect your first screen",
        description: "The easiest way using the Web Player",
        content: `The Web Player is the easiest way to get started - no hardware needed!

Step 1: Click "New Screen"
From your dashboard, click the "New Screen" button.

Step 2: Select player type
You'll see options for different player types:
• Web Player (easiest - recommended to start)
• Raspberry Pi
• Fire TV
• Android

Select "Web Player" to get started quickly.

Step 3: Get your pairing code
Click "Need help getting a pairing code?" then click "Launch Web Player".
This opens a new browser tab with your pairing code displayed.

Step 4: Copy the pairing code
Copy the pairing code shown on the Web Player tab.

Step 5: Connect the screen
Back in the "Connect new screen" dialog:
• Paste the pairing code into the "Pairing code" field
• Give your screen a name (e.g., "Front Counter TV")
• Click "Connect"

Your screen is now connected! You'll see it appear on the Screens page.

Step 6: Activate your screen
• Click on your new screen to open the Editor
• At the top, toggle the switch to activate the screen
• Your screen is now live!

Next: Attach media or a playlist to display content.`,
      },
      {
        id: "device-setup",
        title: "Other player devices",
        description: "Raspberry Pi, Fire TV, and Android setup",
        content: `Besides the Web Player, you can use dedicated hardware for 24/7 displays.

RASPBERRY PI (Best for permanent displays)
1. Go to piads.co/devices and download the PiAds Player image
2. Flash the image to your SD card using Balena Etcher
3. Insert SD card and power on your Raspberry Pi
4. Connect to your WiFi or Ethernet
5. The player will display a pairing code
6. In PiAds dashboard, click "New Screen" and enter the code
7. Your screen connects automatically!

FIRE TV / FIRE TV STICK
1. In PiAds dashboard, click "New Screen" and select Fire TV / Android
2. The dashboard will guide you through installing the app on your device
3. On Fire TV, go to Settings > My Fire TV > Developer Options
4. Enable "Apps from Unknown Sources"
5. Install the PiAds app using the Downloader app
6. Open PiAds app - it shows a pairing code
7. Enter the code in the dashboard and your screen connects automatically!

ANDROID TV / ANDROID TABLET
1. In PiAds dashboard, click "New Screen" and select Android
2. The dashboard will guide you through installing the app on your device
3. Install and open the app
4. The app displays a pairing code
5. Enter the code in the dashboard and your screen connects automatically!

WEB PLAYER (For testing or computer displays)
1. Click "New Screen" in dashboard
2. Click "Need help getting a pairing code?"
3. Click "Launch Web Player" to open player in new tab
4. Copy the pairing code and paste it back in the dashboard
5. Your screen connects automatically!

Tip: Raspberry Pi is most reliable for 24/7 operation. Web Player is perfect for testing.`,
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
        id: "upload-media",
        title: "Upload media to your library",
        description: "Add images and videos to use in playlists",
        content: `Step 1: Go to Media Library
From your dashboard sidebar, click "Media".

Step 2: Upload your files
• Click "Upload" button or drag-and-drop files
• You can upload multiple files at once

Supported formats:
• Images: JPG, PNG, GIF, WebP
• Videos: MP4, WebM (recommended under 100MB)

Recommended specs:
• Resolution: 1920x1080 (Full HD) for landscape
• Resolution: 1080x1920 for portrait displays
• Videos: 15-30 seconds optimal for ads

Step 3: Organize with folders (optional)
Create folders to organize media by category:
• Promotions
• Menu items
• Announcements
• Background content

Tip: Name your files descriptively (e.g., "summer-sale-2025.jpg") for easy searching!`,
      },
      {
        id: "create-playlists",
        title: "Create and manage playlists",
        description: "Organize your content into playlists for scheduling",
        content: `Step 1: Navigate to Playlists
From your dashboard sidebar, click "Playlists".

Step 2: Click "Create Playlist"
Give your playlist a descriptive name (e.g., "Morning Specials", "Happy Hour Promos").

Step 3: Add content items
Click "Add Item" and choose from:

• From Library: Select uploaded images/videos
• YouTube: Paste any YouTube video URL
• Website: Enter any URL (dashboards, menus, etc.)
• Instagram: Paste Instagram post URL
• TikTok: Paste TikTok video URL
• Embed: Custom HTML embed code

Step 4: Set duration for each item
• Images: 10-15 seconds recommended
• Videos: Plays full length by default
• Websites: 30-60 seconds recommended

Step 5: Arrange order
Drag and drop items to reorder them. Content plays in sequence and loops.

Step 6: Save your playlist
Click "Save" to finalize. Your playlist is now ready to assign to screens!

Tip: Create different playlists for different dayparts - breakfast menu, lunch specials, evening events.`,
      },
      {
        id: "schedule-content",
        title: "Create a schedule for your screen",
        description: "Show different content at different times of day",
        content: `PiAds uses "dayparts" to automatically switch content throughout the day.

DAYPARTS EXPLAINED:
• Breakfast: 7:00 AM - 11:00 AM
• Lunch: 11:00 AM - 3:00 PM
• Evening: 5:00 PM - 10:00 PM

Step 1: Navigate to Schedules
From your dashboard sidebar, click "Schedules".

Step 2: Click "Create Schedule"
Name your schedule (e.g., "Weekday Schedule", "Weekend Schedule").

Step 3: Assign playlists to dayparts
For each daypart, select which playlist should play:
• Breakfast → "Morning Coffee Menu" playlist
• Lunch → "Lunch Specials" playlist
• Evening → "Happy Hour Promos" playlist

You can also leave a daypart empty if you don't want content during that time.

Step 4: Assign schedule to your screen
Go to Screens > Select your screen > Click "Schedule" tab > Choose your schedule.

How it works:
• At 7:00 AM, your Breakfast playlist starts automatically
• At 11:00 AM, it switches to your Lunch playlist
• At 5:00 PM, it switches to your Evening playlist
• Outside these hours, the screen shows your default playlist

Tip: You can have different schedules for weekdays vs weekends!`,
      },
      {
        id: "content-types",
        title: "All supported content types",
        description: "Images, videos, YouTube, Instagram, TikTok, websites, and more",
        content: `IMAGES
• Formats: JPG, PNG, GIF, WebP
• Best size: 1920x1080 (landscape) or 1080x1920 (portrait)
• Use for: Promotions, menu items, announcements

VIDEOS
• Formats: MP4, WebM
• Best specs: 1080p, H.264 codec, under 100MB
• Use for: Ads, promos, ambient content

YOUTUBE
• Just paste any YouTube URL
• Video plays with or without sound (configurable)
• Great for: Music videos, tutorials, brand content

INSTAGRAM
• Paste Instagram post or reel URL
• Shows the embedded post/video
• Great for: Social proof, user content

TIKTOK
• Paste TikTok video URL
• Plays the video with attribution
• Great for: Trendy content, viral videos

WEBSITE / WEBPAGE
• Enter any URL
• Displays the full webpage
• Great for: Live dashboards, Google Slides, menus, weather

EMBED (Advanced)
• Paste custom HTML/iframe code
• For advanced integrations
• Great for: Custom widgets, live feeds

Pro tip: Mix content types to keep your display interesting and engaging!`,
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
        id: "enable-ads",
        title: "Enable ads on your screens",
        description: "Create an ad schedule to start earning from local advertisers",
        content: `To enable ads, you create a schedule with the "Enable Ads" option turned on.

Step 1: Go to Schedules
From your dashboard sidebar, click "Schedules".

Step 2: Click "Create Schedule"
This opens the schedule creation form.

Step 3: Enter schedule details
• Schedule Name: Give it a descriptive name (e.g., "Weekday Ads")
• Group Name: Organize schedules into groups (e.g., "Main Floor")

Step 4: Enable the "Enable Ads" option
Toggle the "Enable Ads" switch to ON. This tells PiAds that this time slot is available for advertisers.

Step 5: Select the time slots
Choose which dayparts you want to accept ads:
• Breakfast (7 AM - 11 AM)
• Lunch (11 AM - 3 PM)
• Evening (5 PM - 10 PM)

Note: You don't need to attach a playlist - just enable ads and select the times.

Step 6: Set your pricing
Set your price for each daypart you enabled:
• Breakfast: Suggested $8-12/day
• Lunch: Suggested $12-18/day (highest traffic)
• Evening: Suggested $15-25/day

Step 7: Save the schedule
Click "Create" to save. Your screen is now listed in the PiAds Marketplace!

Pricing tips:
• Higher foot traffic = charge more
• Start lower to attract first advertisers, then increase`,
      },
      {
        id: "approve-advertisers",
        title: "Review and approve ad requests",
        description: "You control every ad that appears on your screens",
        content: `When an advertiser books your screen, you have full control:

Step 1: Get notified
You'll receive an email and in-app notification when someone books your screen.

Step 2: Review the ad request
Go to Ads > Pending Approvals to see:
• The advertiser's business name and profile
• Their ad creative (image or video)
• The dates and dayparts they booked
• Total value of the booking

Step 3: Preview the creative
Click on the ad to see exactly what will display on your screen. Check for:
• Appropriate content for your venue
• Professional quality
• No competing businesses (e.g., a coffee shop showing an ad for a rival cafe)

Step 4: Approve or Reject
• Approve: The ad is scheduled and will play during booked times
• Reject: The advertiser is refunded, and they can try another venue

Step 5: Set up auto-approval (optional)
In Settings, you can enable auto-approval for:
• Trusted advertisers you've approved before
• Specific business categories
• All advertisers (not recommended)

Note: You can also set content guidelines in your venue profile to let advertisers know what you accept.`,
      },
      {
        id: "how-payouts-work",
        title: "How payouts work (you keep 75%)",
        description: "Get paid for every ad that runs on your screens",
        content: `REVENUE SPLIT
• You keep: 75% of all ad revenue
• PiAds fee: 25% (covers platform, payment processing, support)

EXAMPLE EARNINGS
If an advertiser pays $100/week for your screen:
• You receive: $75/week
• Monthly: $300/month per screen
• With 3 screens: $900/month potential

SETTING UP PAYOUTS
Step 1: Go to Settings > Payouts
Step 2: Click "Connect Stripe" to link your bank account
Step 3: Complete Stripe's verification (takes ~5 minutes)
Step 4: You're all set to receive payments!

PAYOUT SCHEDULE
• Earnings are calculated in real-time
• Payouts processed monthly
• Minimum payout threshold: $25
• Direct deposit to your bank account

TRACKING YOUR EARNINGS
Go to Dashboard > Revenue to see:
• Total earnings this month
• Earnings by screen
• Pending vs. paid amounts
• Historical earnings

Note: Stripe connection is optional but required to receive payouts. You can run the platform without it if you just want to manage your own content.`,
      },
    ],
  },
  {
    id: "venue-advanced",
    category: "Advanced Features",
    icon: Settings,
    color: "bg-purple-500",
    colorLight: "bg-purple-500/10",
    textColor: "text-purple-600",
    items: [
      {
        id: "screen-zones",
        title: "Use screen zones for multi-area layouts",
        description: "Display different content in different areas of your screen",
        content: `Screen zones let you divide your display into multiple areas, each showing different content.

EXAMPLE LAYOUTS
• Main + Sidebar: 75% main content, 25% sidebar with announcements
• Grid: 4 equal sections showing different content
• Picture-in-picture: Full-screen video with small overlay

HOW TO SET UP ZONES
Step 1: Go to Screens > Select your screen
Step 2: Click "Configure Zones"
Step 3: Choose a layout template or create custom
Step 4: Assign a playlist to each zone
Step 5: Save and preview

ZONE CONTENT IDEAS
• Main area: Your primary playlist
• Sidebar: Social media feed, announcements
• Bottom ticker: Scrolling text, specials
• Corner: Clock, weather, or logo

Note: Zones work on all player types. More complex layouts may require higher-spec devices.`,
      },
      {
        id: "screen-overlays",
        title: "Add overlays (clock, weather, QR codes)",
        description: "Display persistent information over your content",
        content: `Overlays are elements that display on top of your playlist content.

AVAILABLE OVERLAYS

Clock Overlay
• Shows current time
• Multiple formats (12h, 24h)
• Customizable position (corners)

Weather Overlay
• Current temperature and conditions
• Updates automatically
• Based on your venue location

QR Code Overlay
• Display a QR code linking to your website, menu, or special offer
• Customizable size and position
• Track scans in analytics

Announcement Overlay
• Scrolling text banner
• Great for daily specials, WiFi password, events
• Customizable colors and speed

HOW TO ADD OVERLAYS
Step 1: Go to Screens > Select your screen
Step 2: Click "Overlays" tab
Step 3: Toggle on desired overlays
Step 4: Configure position, style, and content
Step 5: Save changes

The overlays will appear immediately on your player!`,
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
        id: "screen-offline",
        title: "Screen showing as offline",
        description: "How to reconnect your player device",
        content: `If your screen shows as "Offline" in the dashboard:

CHECK THESE FIRST
1. Is the device powered on?
2. Is the device connected to the internet?
3. Is the PiAds app/player running?

FOR RASPBERRY PI
• Check the power light (should be solid)
• Check Ethernet cable or WiFi connection
• Try unplugging and replugging power
• The device should auto-reconnect within 2 minutes

FOR FIRE TV / ANDROID
• Make sure the PiAds app is open and running
• Check WiFi connection in device settings
• Force close and reopen the app
• Check if the device needs a software update

FOR WEB BROWSER
• Refresh the browser page (F5)
• Check if the URL is correct: app.piads.co/player/[screen-id]
• Try a different browser
• Clear browser cache and cookies

STILL OFFLINE?
• Generate a new pairing code in dashboard
• Re-pair the device with the new code
• Contact support@piads.co with your screen ID`,
      },
      {
        id: "content-not-updating",
        title: "Content changes not showing",
        description: "Sync issues and how to fix them",
        content: `Content typically syncs to your player within 1-2 minutes.

IF CONTENT ISN'T UPDATING

Step 1: Check your dashboard
Make sure your changes were saved:
• Go to Playlists and verify items are there
• Go to Screens and verify playlist is assigned
• Check which daypart is currently active

Step 2: Force a refresh on the player
• Raspberry Pi: Reboot the device
• Fire TV/Android: Force close and reopen the app
• Web Browser: Press F5 or Ctrl+R

Step 3: Check internet connection
• Run a speed test on the player device
• Minimum recommended: 5 Mbps
• Video content needs more bandwidth

Step 4: Clear cache
• Web Browser: Clear cache in browser settings
• Fire TV: Go to App Settings > PiAds > Clear Cache
• Raspberry Pi: Reboot clears cache automatically

COMMON CAUSES
• Schedule daypart doesn't match current time
• Playlist not assigned to the screen
• Internet connection too slow for video
• Browser cache showing old content

If issues persist, contact support@piads.co`,
      },
      {
        id: "video-not-playing",
        title: "Videos not playing or buffering",
        description: "Fix video playback issues",
        content: `COMMON VIDEO ISSUES AND FIXES

Video won't play at all:
• Check video format (use MP4 with H.264 codec)
• Make sure file isn't corrupted (plays on your computer?)
• Try re-uploading the video
• Check file size (under 100MB recommended)

Video is buffering/stuttering:
• Check internet speed (10+ Mbps recommended for HD video)
• Try a lower resolution version
• Shorter videos buffer less
• Use Ethernet instead of WiFi if possible

YouTube videos not playing:
• Check if the video is public (not private/unlisted)
• Some videos have embedding disabled by owner
• Try a different YouTube URL

No audio on videos:
• Some players mute by default (check player settings)
• Fire TV: Check device volume
• Web Browser: Click on player to enable audio (browser policy)

VIDEO BEST PRACTICES
• Format: MP4 with H.264 video, AAC audio
• Resolution: 1920x1080 (1080p) or lower
• Length: 15-30 seconds ideal for ads
• File size: Under 100MB for reliable playback
• Bitrate: 5-10 Mbps for smooth playback`,
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
        content: `Step 1: Go to app.piads.co
Click "Get Started" on the homepage.

Step 2: Choose your role
Select "I'm an Advertiser" - this sets up your account for booking ads on local venue screens.

Step 3: Sign up
• Enter your email address
• Create a password (or sign up with Google)
• Verify your email if prompted

Step 4: Complete your business profile
After signing in, add your business details:
• Business name
• Business type/category
• Business address (helps find nearby venues)
• Website (optional)
• Logo (optional, for your profile)

Why this matters:
Your business profile is shown to venues when they review your ad requests. A complete profile builds trust and increases approval rates!

Note: PiAds is designed for local businesses. Your ads will appear in venues near your business location.`,
      },
      {
        id: "browse-venues",
        title: "Browse the marketplace",
        description: "Find the perfect screens for your business",
        content: `Step 1: Go to Marketplace
From your dashboard sidebar, click "Marketplace".

Step 2: Browse available venues
You'll see a list of local venues with available ad space:
• Venue name and type (cafe, gym, restaurant, etc.)
• Location and distance from you
• Number of screens
• Pricing per daypart
• Venue photos

Step 3: Use filters to narrow down
Filter by:
• Distance from your business
• Venue type (cafe, gym, salon, bar, etc.)
• Price range
• Screen orientation (landscape/portrait)
• Available dayparts

Step 4: View venue details
Click on any venue to see:
• Full venue profile and photos
• Screen specifications
• Pricing for each daypart
• Availability calendar
• Reviews from other advertisers

Step 5: Check the availability calendar
The calendar shows which dayparts are available:
• Green = Available to book
• Gray = Already booked
• Red = Venue blocked

Tip: Start with venues your target customers already visit. A yoga studio for your wellness brand, a cafe for your local bakery!`,
      },
      {
        id: "understand-dayparts",
        title: "Understanding dayparts",
        description: "Learn how time-based advertising works",
        content: `PiAds divides the day into "dayparts" - time slots when your ad plays.

THE THREE DAYPARTS

Breakfast (7:00 AM - 11:00 AM)
• Audience: Early risers, commuters, morning coffee crowd
• Best for: Coffee shops, breakfast spots, morning services
• Typical traffic: Moderate
• Often lowest price

Lunch (11:00 AM - 3:00 PM)
• Audience: Lunch crowd, shoppers, midday visitors
• Best for: Restaurants, retail, services
• Typical traffic: Highest
• Often premium pricing

Evening (5:00 PM - 10:00 PM)
• Audience: After-work crowd, dinner guests, evening visitors
• Best for: Restaurants, bars, entertainment, evening services
• Typical traffic: High
• Often premium pricing

HOW DAYPARTS WORK
When you book a daypart, your ad plays during those hours:
• You can book one, two, or all three dayparts
• Your ad rotates with other content/ads in that time slot
• Each daypart is priced separately

BOOKING STRATEGY
• Testing: Start with one daypart for one week
• Growing: Add more dayparts based on results
• Maximum reach: Book all three dayparts

Tip: Lunch often has the highest foot traffic, but Evening has a more engaged audience (people relaxing vs. rushing).`,
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
        id: "upload-creative",
        title: "Upload your ad creative",
        description: "Create and upload your ad content",
        content: `Before booking, you'll need ad creative (the image or video that displays).

Step 1: Go to Creatives
From your dashboard sidebar, click "Creatives".

Step 2: Click "Upload New"
Give your creative a name (e.g., "Summer Sale 2025", "Grand Opening").

Step 3: Upload your file
Drag and drop or click to select your file.

CREATIVE SPECIFICATIONS

For images:
• Size: 1920 x 1080 pixels (landscape) or 1080 x 1920 (portrait)
• Format: JPG, PNG
• Max file size: 5MB
• Resolution: 72 DPI minimum

For videos:
• Size: 1920 x 1080 pixels (landscape) or 1080 x 1920 (portrait)
• Format: MP4 (H.264 codec recommended)
• Length: 15-30 seconds ideal
• Max file size: 50MB
• Audio: Optional (many venues play muted)

Step 4: Preview your creative
After upload, preview how it looks on a screen mockup.

Step 5: Save
Your creative is now ready to use in campaigns!

Tip: Create both landscape and portrait versions if you plan to advertise on different screen orientations.`,
      },
      {
        id: "book-ad-slots",
        title: "Book ad slots on venues",
        description: "Step-by-step booking process",
        content: `Step 1: Find a venue in Marketplace
Browse and select a venue you want to advertise at.

Step 2: Check availability
Look at the availability calendar:
• Select your desired dates
• See which dayparts are available

Step 3: Select dayparts to book
Click on the dayparts you want:
• Breakfast ($X/day)
• Lunch ($X/day)
• Evening ($X/day)

The price is shown for each daypart. Select multiple days by clicking and dragging.

Step 4: Add to cart
Click "Add to Cart" to save this booking.

Step 5: Continue shopping (optional)
You can add more venues/dayparts to your cart before checkout.

Step 6: Review your cart
Go to your cart to see:
• All selected venues and dayparts
• Dates booked
• Total cost

Step 7: Select your creative
Choose which creative (ad) to use for this campaign.

Step 8: Checkout
• Enter payment details (credit card)
• Review final total
• Click "Book Now"

WHAT HAPPENS NEXT
1. Your booking is submitted to the venue owner
2. They review your creative and business profile
3. If approved, your campaign is confirmed
4. If rejected, you receive a full refund

Most venues respond within 24-48 hours.`,
      },
      {
        id: "set-budget",
        title: "Budgeting and pricing guide",
        description: "Plan your advertising spend",
        content: `TYPICAL PRICING

Per daypart, per day:
• Breakfast: $8 - $12
• Lunch: $12 - $18
• Evening: $15 - $25

(Prices vary by venue location, traffic, and demand)

STARTER BUDGET: $50-75/WEEK

With this budget you can get:
• 1-2 screens
• 1-2 dayparts
• 7 days of exposure
• Estimated 1,000-2,000 impressions

EXAMPLE CAMPAIGNS

Budget-friendly ($50/week):
• 1 venue, lunch daypart, 7 days
• Great for testing

Mid-range ($150/week):
• 2-3 venues, lunch + evening, 7 days
• Good coverage

Premium ($300+/week):
• 3-5 venues, all dayparts, 7 days
• Maximum reach

COST-SAVING TIPS
• Book multiple days at once (some venues offer discounts)
• Start with one daypart to test effectiveness
• Try less popular dayparts (breakfast often cheaper)
• Look for newer venues offering intro pricing

ROI TRACKING
Track your return by:
• Adding a unique QR code to your ad
• Using a promo code specific to this campaign
• Asking customers "How did you hear about us?"`,
      },
      {
        id: "creative-best-practices",
        title: "Design tips for effective ads",
        description: "Make your ads stand out and convert",
        content: `Your ad will be viewed from 5-15 feet away for 10-15 seconds. Design accordingly!

DO'S

✓ Use bold, high-contrast colors
Your ad competes with a busy environment. Make it pop.

✓ Keep text to 7 words or less
People glance, they don't read. "50% Off This Week" beats a paragraph.

✓ Make your logo prominent
Brand recognition matters. Logo should be clearly visible.

✓ Include a clear call-to-action
Tell viewers what to do: "Visit us today!", "Scan for 20% off"

✓ Use high-resolution images
Blurry ads look unprofessional. Use 1920x1080 minimum.

✓ Consider adding a QR code
Makes it easy for viewers to take action immediately.

DON'TS

✗ Don't use tiny fonts
If you can't read it from 10 feet away, it's too small.

✗ Don't cram too much information
One message, one offer, one CTA.

✗ Don't use low-resolution images
Pixelated images hurt your brand.

✗ Don't forget your branding
Every ad should clearly identify your business.

✗ Don't use busy backgrounds
Simple backgrounds let your message shine.

THE 10-FOOT TEST
Step 10 feet away from your computer screen. Can you:
• Read all text?
• Identify your brand?
• Understand the offer?

If not, simplify your design!`,
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
        id: "track-campaigns",
        title: "Track your active campaigns",
        description: "Monitor status and performance",
        content: `Step 1: Go to Campaigns
From your dashboard sidebar, click "Campaigns".

CAMPAIGN STATUSES

Pending Approval
Your booking is waiting for venue approval. Most respond within 24-48 hours.

Approved / Scheduled
Your campaign is confirmed and will start on the scheduled date.

Active
Your ad is currently playing on screens!

Completed
The campaign has finished running.

Rejected
The venue declined your booking. You'll receive a full refund.

VIEWING CAMPAIGN DETAILS
Click on any campaign to see:
• Venue and screen information
• Dates and dayparts booked
• Your creative (ad)
• Current status
• Performance metrics (if active/completed)

NOTIFICATIONS
You'll receive email notifications when:
• Your campaign is approved
• Your campaign is rejected
• Your campaign starts running
• Your campaign completes`,
      },
      {
        id: "view-reports",
        title: "View performance reports",
        description: "Track impressions and engagement metrics",
        content: `Step 1: Go to Reports
From your dashboard sidebar, click "Reports" or go to a campaign and click "View Report".

AVAILABLE METRICS

Impressions
How many times your ad was displayed. Note: This is displays, not unique viewers.

Play Count
Number of times your ad played in its full duration.

Screens Reached
How many different screens showed your ad.

Cost Per Impression (CPI)
Your total spend divided by impressions. Lower is better.

Daily Breakdown
See how impressions varied day by day.

Daypart Performance
Compare performance across breakfast, lunch, and evening.

QR SCANS (if using QR codes)
If your creative includes a PiAds-tracked QR code:
• Total scans
• Scans by day
• Scans by time of day
• Unique vs. repeat scans

EXPORTING REPORTS
Click "Export" to download reports as:
• PDF (for sharing)
• CSV (for spreadsheets)

USING DATA TO OPTIMIZE
• Compare performance across venues - focus budget on best performers
• Compare dayparts - some work better for your business
• Track week-over-week trends
• Correlate ad exposure with your own sales data`,
      },
      {
        id: "manage-creatives",
        title: "Manage your creatives library",
        description: "Organize and update your ad content",
        content: `Step 1: Go to Creatives
From your dashboard sidebar, click "Creatives".

VIEWING YOUR CREATIVES
You'll see all uploaded creatives with:
• Thumbnail preview
• Name
• Type (image/video)
• Dimensions
• Upload date
• Status (active in campaigns or not)

ORGANIZING CREATIVES
• Use descriptive names: "Summer Sale 2025 - Landscape"
• Keep both landscape and portrait versions
• Archive old creatives you no longer use

UPDATING A CREATIVE
If you need to change your ad:
1. Upload a new creative
2. Go to your active campaign
3. Swap the creative (if the campaign allows)

Note: Some campaigns lock the creative once approved. In this case, wait for the campaign to end.

CREATIVE REQUIREMENTS REMINDER
• Images: 1920x1080 (landscape) or 1080x1920 (portrait)
• Videos: MP4, 15-30 seconds, under 50MB
• No text smaller than 24pt font
• Include your business name/logo

BEST PRACTICES
• Create seasonal variations of your ads
• Test different messages with different venues
• Keep your highest-performing creatives for reuse
• Update creatives at least quarterly`,
      },
      {
        id: "how-billing-works",
        title: "Billing and payment",
        description: "Understand charges, refunds, and invoices",
        content: `HOW PAYMENT WORKS

1. You add items to your cart
2. At checkout, you pay the full amount
3. Payment is held until venue approves
4. If approved: Payment is processed
5. If rejected: Full refund issued

PAYMENT METHODS
• Credit card (Visa, Mastercard, Amex)
• Debit card

WHEN YOU'RE CHARGED
You're charged immediately at checkout, but the charge only finalizes when the venue approves your booking.

REFUNDS

If venue rejects your booking:
• Automatic full refund
• Processed within 3-5 business days
• You'll receive email confirmation

If you cancel before approval:
• Full refund available
• Cancel in Campaigns > [Your Campaign] > Cancel

If you cancel after approval:
• Refund policy varies by venue
• Unused days may be refunded
• Check venue terms at booking

VIEWING INVOICES
Go to Account > Billing to see:
• All past transactions
• Invoice PDFs for download
• Refund history

RECEIPT FOR BUSINESS EXPENSES
Each transaction generates a PDF receipt with:
• Your business name
• Transaction details
• Amount paid
• Can be used for expense reporting`,
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
        id: "choose-venues",
        title: "How to choose the right venues",
        description: "Target venues where your customers already go",
        content: `The key to effective advertising: be where your customers already spend time.

MATCHING STRATEGY

If you're a... → Advertise at...

Coffee shop → Gyms, yoga studios, offices
Restaurant → Coffee shops, gyms, salons
Fitness studio → Healthy cafes, juice bars
Salon/Spa → Gyms, yoga studios, cafes
Retail store → Coffee shops, restaurants
Professional services → Coffee shops, coworking spaces
Entertainment → Restaurants, bars, cafes

VENUE EVALUATION CHECKLIST

Location
☐ Within 2 miles of your business
☐ In the same neighborhood
☐ On a route your customers travel

Audience Match
☐ Demographics align with your target customer
☐ Venue type matches your brand
☐ Time of day matches when people need you

Quality
☐ Venue looks professional in photos
☐ Screen placement is visible
☐ Positive reviews from other advertisers

VALUE
☐ Price fits your budget
☐ Estimated impressions seem reasonable
☐ Multiple dayparts available if needed

START SMALL
Book 1-2 venues for one week first. Measure results, then expand to more venues.`,
      },
      {
        id: "daypart-strategy",
        title: "Daypart strategy by business type",
        description: "When to run your ads for maximum impact",
        content: `Match your ad timing to when people are most receptive:

☕ COFFEE SHOP / CAFE
Best dayparts: Breakfast, Lunch
Why: Catch people when they're thinking about coffee
Venues: Gyms (post-workout), salons (waiting area)

🍕 RESTAURANT / FOOD
Best dayparts: Lunch, Evening
Why: Advertise when people are hungry
Venues: Gyms, offices, salons, coffee shops

💪 FITNESS / GYM
Best dayparts: Breakfast, Evening
Why: Target people before/after work
Venues: Coffee shops, healthy cafes

💇 SALON / SPA
Best dayparts: Lunch, Evening
Why: Reach people with downtime
Venues: Gyms, cafes, restaurants

🛍️ RETAIL STORE
Best dayparts: Lunch, Evening
Why: When people are out and shopping
Venues: Coffee shops, restaurants

🍺 BAR / NIGHTLIFE
Best dayparts: Evening only
Why: Target the after-work crowd
Venues: Restaurants, gyms, salons

🏢 PROFESSIONAL SERVICES
Best dayparts: Breakfast, Lunch
Why: Business hours mindset
Venues: Coffee shops, coworking spaces

GENERAL RULES
• Lunch = Highest foot traffic
• Evening = Most engaged audience
• Breakfast = Most consistent (regulars)

Start with one daypart, measure results, then add more.`,
      },
      {
        id: "measure-roi",
        title: "Measuring your return on investment",
        description: "Track whether your ads are working",
        content: `Don't just run ads - measure their impact!

TRACKING METHODS

1. Unique Promo Code
Create a promo code just for this campaign:
"COFFEE20" for 20% off
Display it in your ad
Track redemptions

2. QR Code
Add a QR code to your ad
Link to a unique landing page
Track scans and conversions

3. "How did you hear about us?"
Ask new customers directly
Train staff to ask
Track responses in a simple spreadsheet

4. Compare Sales Data
Note your baseline sales before the campaign
Compare during and after
Look for increases during your ad dayparts

CALCULATING ROI

Simple formula:
ROI = (Revenue from campaign - Cost) / Cost × 100%

Example:
• Campaign cost: $100/week
• New customers attributed: 10
• Average customer value: $25
• Revenue: $250
• ROI: ($250 - $100) / $100 = 150%

WHAT'S A GOOD ROI?
• 100%+ = Great, scale up
• 50-100% = Good, keep testing
• 0-50% = Okay, try optimizing
• Negative = Try different venues/dayparts

OPTIMIZATION TIPS
• Test different creatives
• Try different dayparts
• Focus budget on best-performing venues
• Run for at least 2 weeks before making decisions`,
      },
      {
        id: "common-mistakes",
        title: "Common mistakes to avoid",
        description: "Learn from what doesn't work",
        content: `MISTAKE 1: Too much text
Problem: Cramming your entire menu into one ad
Fix: One message, one offer, 7 words or less

MISTAKE 2: Wrong audience
Problem: Advertising steaks at a vegan cafe
Fix: Research venue audience before booking

MISTAKE 3: No call-to-action
Problem: Beautiful ad but no next step
Fix: Always tell viewers what to do: "Visit today", "Scan to save"

MISTAKE 4: Giving up too early
Problem: Running ads for 3 days and expecting results
Fix: Run for at least 2 weeks, ideally 4

MISTAKE 5: Not tracking results
Problem: "I think it's working maybe"
Fix: Use promo codes, QR codes, or ask customers

MISTAKE 6: Set and forget
Problem: Same ad running for months
Fix: Refresh creative monthly, adjust based on data

MISTAKE 7: Wrong daypart
Problem: Advertising breakfast items in the evening
Fix: Match your offer to the time of day

MISTAKE 8: Ignoring the 10-foot rule
Problem: Tiny text nobody can read
Fix: Test your ad from 10 feet away

MISTAKE 9: No branding
Problem: Great offer but who is it from?
Fix: Logo and business name must be prominent

MISTAKE 10: Choosing venues by price alone
Problem: Cheapest venues with no relevant audience
Fix: Prioritize audience fit over price`,
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
            <div className="whitespace-pre-wrap text-sm font-sans text-muted-foreground">
              {item.content?.split('\n').map((line, i) => {
                const trimmed = line.trim()
                // Step headers like "Step 1:", "Step 2:"
                const isStepHeader = /^Step \d+[:.]/i.test(trimmed)
                // All caps headers (with optional parentheses content) like "RASPBERRY PI (Best for...)" or "FIRE TV / FIRE TV STICK"
                const isCapsHeader = /^[A-Z][A-Z\s\/]+(\s*\(.*\))?$/.test(trimmed) && trimmed.length > 3

                if (isStepHeader) {
                  return <div key={i} className="font-semibold text-foreground mt-3 first:mt-0">{line}</div>
                }
                if (isCapsHeader) {
                  return <div key={i} className="font-semibold text-foreground mt-4 first:mt-0">{line}</div>
                }
                return <div key={i}>{line || '\u00A0'}</div>
              })}
            </div>
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
