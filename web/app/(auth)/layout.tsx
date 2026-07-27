import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative z-10 flex flex-1 flex-col">
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
