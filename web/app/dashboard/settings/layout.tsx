import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings — HeyYarvis",
  description: "Connect your real HeyYarvis backend.",
};

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
