import { redirect } from 'next/navigation'

export async function GET() {
  redirect('https://piads-android.s3.us-east-1.amazonaws.com/apps/PiAds-Kiosk-v1.5.1.apk')
}
