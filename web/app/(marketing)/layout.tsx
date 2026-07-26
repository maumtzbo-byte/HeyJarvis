import SiteHeader from "../components/site-header";
import SiteFooter from "../components/site-footer";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <div className="relative z-10 flex flex-1 flex-col">{children}</div>
      <SiteFooter />
    </div>
  );
}
