// A static review build of the new landing page. The normal site keeps its
// existing routes, server APIs, and production deployment configuration.
import RootLayout, { metadata } from "./layout";
import { ConsentBanner } from "@/components/consent-banner";

export { metadata };

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RootLayout>
      {children}
      <ConsentBanner privacyHref="https://www.piads.co/privacy" />
    </RootLayout>
  );
}
