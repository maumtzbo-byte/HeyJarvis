"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Sparkles, Plug, Settings, ArrowLeft } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Memories", icon: BookOpen },
  { href: "/dashboard/ask", label: "Ask", icon: Sparkles },
  { href: "/dashboard/connectors", label: "Connectors", icon: Plug },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-border/80 bg-surface/40 sm:flex">
      <div className="flex flex-col gap-8 p-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/brand/logo-mark.png"
            alt="HeyYarvis"
            width={28}
            height={28}
            className="rounded-full"
          />
          <span
            style={{ fontFamily: "var(--font-display)" }}
            className="text-sm font-semibold tracking-tight"
          >
            HeyYarvis
          </span>
        </Link>

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-accent-cool/10 text-foreground ring-1 ring-accent-cool/25"
                    : "text-foreground/65 hover:bg-surface hover:text-foreground"
                }`}
              >
                <Icon
                  className={`h-4 w-4 ${isActive ? "text-accent-cool" : ""}`}
                  strokeWidth={1.75}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.75} />
          Back to site
        </Link>
      </div>
    </aside>
  );
}
