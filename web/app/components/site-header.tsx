import Image from "next/image";
import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-background/70 backdrop-blur-md">
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
          <span className="text-base font-semibold tracking-tight">
            HeyYarvis
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-foreground/90 sm:flex">
          <Link href="/#como-funciona" className="transition-opacity hover:opacity-70">
            Cómo funciona
          </Link>
          <Link href="/dashboard" className="transition-opacity hover:opacity-70">
            Mis recuerdos
          </Link>
        </nav>
        <Link
          href="/dashboard"
          className="liquid-glass inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-foreground transition-opacity hover:opacity-80"
        >
          Ver mis recuerdos
        </Link>
      </div>
      <div className="mt-[3px] h-px w-full bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
    </header>
  );
}
