import { redirect } from "next/navigation"

// The venue-era onboarding guide no longer matches the product. Getting
// started for hosts is covered by the homepage "how it works" section.
export default function GetStartedPage() {
  redirect("/#how-it-works")
}
