"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navLinks } from "../content/site-content";

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/80"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-5">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/brand/logo-mark.png"
            alt="HeyYarvis"
            width={32}
            height={32}
            className="rounded-full"
            priority
          />
          <span
            style={{ fontFamily: "var(--font-display)" }}
            className="text-base font-semibold tracking-tight"
          >
            HeyYarvis
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-foreground/90 sm:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition-opacity hover:opacity-70"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/dashboard"
          className="liquid-glass inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-foreground transition-opacity hover:opacity-80"
        >
          View my memories
        </Link>
      </div>
    </header>
  );
}
