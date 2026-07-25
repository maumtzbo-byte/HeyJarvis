import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-base font-semibold tracking-tight">
          HeyJarvis
        </Link>
        <nav className="flex items-center gap-6 text-sm text-zinc-600 dark:text-zinc-400">
          <Link href="/#como-funciona" className="hover:text-foreground">
            Cómo funciona
          </Link>
          <Link href="/dashboard" className="hover:text-foreground">
            Mis recuerdos
          </Link>
        </nav>
      </div>
    </header>
  );
}
