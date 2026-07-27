import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connectors — HeyYarvis",
  description: "Direct connections to the tools you already use — coming soon.",
};

export default function ConnectorsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
