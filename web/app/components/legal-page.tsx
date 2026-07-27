import { ReactNode } from "react";

export function LegalPage({
  eyebrow,
  title,
  lastUpdated,
  children,
}: {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16 sm:py-24">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted/85">
        {eyebrow}
      </p>
      <h1
        style={{ fontFamily: "var(--font-display)" }}
        className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl"
      >
        {title}
      </h1>
      <p className="mt-3 font-mono text-xs uppercase tracking-wide text-muted/80">
        Last updated {lastUpdated}
      </p>

      <div className="mt-10 flex flex-col gap-8 text-sm leading-relaxed text-muted [&_a]:text-foreground [&_a]:underline [&_a]:decoration-border [&_a]:underline-offset-4 [&_a:hover]:decoration-foreground [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:mb-2 [&_li]:mt-1.5 [&_ul]:list-disc [&_ul]:pl-5">
        {children}
      </div>
    </div>
  );
}
