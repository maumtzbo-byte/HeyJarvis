import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ask — HeyYarvis",
  description: "Ask about anything you've told HeyYarvis.",
};

export default function AskLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
