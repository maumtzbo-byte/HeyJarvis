import Image from "next/image";
import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/brand/logo-mark.png"
            alt="HeyJarvis"
            width={28}
            height={28}
            className="rounded-full"
            priority
          />
          <span className="text-base font-semibold tracking-tight">
            HeyJarvis
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-muted">
          <Link href="/#como-funciona" className="transition-colors hover:text-foreground">
            Cómo funciona
          </Link>
          <Link href="/dashboard" className="transition-colors hover:text-foreground">
            Mis recuerdos
          </Link>
        </nav>
      </div>
    </header>
  );
}
