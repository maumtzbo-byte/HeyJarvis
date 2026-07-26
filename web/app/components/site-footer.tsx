import Image from "next/image";
import Link from "next/link";
import { footerColumns } from "../content/site-content";

export default function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-border/80 bg-background">
      <div className="mx-auto max-w-5xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-[1.3fr_1fr_1fr]">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Image
                src="/brand/logo-mark.png"
                alt=""
                width={22}
                height={22}
                className="rounded-full"
              />
              <span
                style={{ fontFamily: "var(--font-display)" }}
                className="text-sm font-semibold text-foreground"
              >
                HeyYarvis
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              Your second brain, accessible by voice. Currently in private
              validation.
            </p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title} className="flex flex-col gap-3">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted/70">
                {column.title}
              </p>
              <ul className="flex flex-col gap-2.5 text-sm text-muted">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border/80 pt-6 text-xs text-muted/70 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} HeyYarvis. All rights reserved.</p>
          <p>Built with Claude, Supabase, and Next.js.</p>
        </div>
      </div>
    </footer>
  );
}
