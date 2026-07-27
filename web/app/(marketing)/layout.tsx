import SiteHeader from "../components/site-header";
import SiteFooter from "../components/site-footer";
import { ScrollProgress } from "../components/scroll-progress";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-1 flex-col">
      <ScrollProgress />
      <SiteHeader />
      <main className="relative z-10 flex flex-1 flex-col">{children}</main>
      <SiteFooter />
    </div>
  );
}
