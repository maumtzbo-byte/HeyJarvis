import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <Image
        src="/brand/logo-mark.png"
        alt=""
        width={48}
        height={48}
        className="rounded-full opacity-80"
      />
      <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-muted/70">
        404
      </p>
      <h1
        style={{ fontFamily: "var(--font-display)" }}
        className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl"
      >
        This memory doesn&rsquo;t exist{" "}
        <span className="italic font-light text-muted">yet.</span>
      </h1>
      <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
        The page you&rsquo;re looking for isn&rsquo;t here. It may have moved,
        or never existed in the first place.
      </p>
      <Link
        href="/"
        className="btn-primary mt-8 inline-flex h-11 items-center justify-center rounded-full px-7 text-sm font-medium"
      >
        Back to HeyYarvis
      </Link>
    </div>
  );
}
