import type { Metadata } from "next";
import { DashboardSidebar } from "../components/dashboard/sidebar";
import { MobileTabBar } from "../components/dashboard/mobile-tab-bar";
import { AuthGuard } from "../components/dashboard/auth-guard";

export const metadata: Metadata = {
  title: "Memories — HeyYarvis",
  description: "Everything you've told HeyYarvis, searchable by meaning.",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
      <div className="relative z-10 flex flex-1 flex-col sm:flex-row">
        <DashboardSidebar />
        <main className="flex-1 pb-24 sm:pb-0">{children}</main>
        <MobileTabBar />
      </div>
    </AuthGuard>
  );
}
