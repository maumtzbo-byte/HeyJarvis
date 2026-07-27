import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative z-10 flex flex-1 flex-col overflow-hidden">
      <div
        aria-hidden
        className="animate-glow-pulse pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-warm/[0.12] blur-[110px] sm:h-[560px] sm:w-[560px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] bottom-[-10%] -z-10 h-[360px] w-[360px] rounded-full bg-accent-cool/[0.08] blur-[100px]"
      />
      <header className="mx-auto flex w-full max-w-6xl items-center px-6 py-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5">
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
      </header>
      <main className="flex flex-1 items-center justify-center px-6 py-10">{children}</main>
    </div>
  );
}
