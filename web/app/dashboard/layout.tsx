import { DashboardSidebar } from "../components/dashboard/sidebar";
import { MobileTabBar } from "../components/dashboard/mobile-tab-bar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative z-10 flex flex-1 flex-col sm:flex-row">
      <DashboardSidebar />
      <main className="flex-1 pb-24 sm:pb-0">{children}</main>
      <MobileTabBar />
    </div>
  );
}
