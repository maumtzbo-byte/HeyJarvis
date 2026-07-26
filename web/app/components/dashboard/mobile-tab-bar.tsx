"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Sparkles, Plug, Settings } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Memories", icon: BookOpen },
  { href: "/dashboard/ask", label: "Ask", icon: Sparkles },
  { href: "/dashboard/connectors", label: "Connectors", icon: Plug },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function MobileTabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border/80 bg-background/90 backdrop-blur-md pb-[env(safe-area-inset-bottom)] sm:hidden">
      <div className="mx-auto flex max-w-md items-stretch justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-1 flex-col items-center gap-1 py-3 text-[11px] font-medium transition-colors ${
                isActive ? "text-accent-cool" : "text-muted"
              }`}
            >
              <Icon className="h-5 w-5" strokeWidth={1.75} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
