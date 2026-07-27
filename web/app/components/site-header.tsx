"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks } from "../content/site-content";

const SECTION_IDS = navLinks
  .filter((link) => link.href.startsWith("/#"))
  .map((link) => link.href.slice(2));

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (elements.length === 0) return;

    const intersecting = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            intersecting.set(entry.target.id, entry.intersectionRatio);
          } else {
            intersecting.delete(entry.target.id);
          }
        }
        const [topId] = [...intersecting.entries()].sort((a, b) => b[1] - a[1])[0] ?? [null];
        setActiveSection(topId);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled || mobileOpen
          ? "bg-background/80 backdrop-blur-md border-b border-border/80"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
          <Image
            src="/brand/logo-mark.png"
            alt=""
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

        <nav className="hidden items-center gap-8 text-sm sm:flex">
          {navLinks.map((link) => {
            const sectionId = link.href.startsWith("/#") ? link.href.slice(2) : null;
            const isActive = sectionId !== null && sectionId === activeSection;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`relative transition-colors hover:text-foreground ${
                  isActive ? "text-foreground" : "text-foreground/70"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1.5 left-0 h-px w-full bg-accent-warm" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="liquid-glass hidden items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-foreground transition-opacity hover:opacity-80 sm:inline-flex"
          >
            View my memories
          </Link>
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-panel"
            onClick={() => setMobileOpen((open) => !open)}
            className="liquid-glass flex h-10 w-10 items-center justify-center rounded-full text-foreground sm:hidden"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" strokeWidth={1.75} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.75} />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-nav-panel"
          className="border-t border-border/80 bg-background/95 backdrop-blur-md sm:hidden"
        >
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
            {navLinks.map((link) => {
              const sectionId = link.href.startsWith("/#") ? link.href.slice(2) : null;
              const isActive = sectionId !== null && sectionId === activeSection;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-lg px-3 py-3 text-base transition-colors ${
                    isActive
                      ? "bg-surface text-foreground"
                      : "text-foreground/80 hover:bg-surface/60"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
