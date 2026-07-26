import Link from "next/link";
import { Reveal } from "../ui/reveal";
import { githubUrl } from "../../content/site-content";

export function FinalCta() {
  return (
    <section className="section-divider section-glow-warm">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 py-24 text-center">
        <Reveal>
          <h2
            style={{ fontFamily: "var(--font-display)" }}
            className="text-3xl font-medium tracking-tight sm:text-4xl"
          >
            Start building your{" "}
            <span className="italic font-light text-muted">second brain</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-md text-sm leading-relaxed text-muted">
            HeyYarvis is in private validation. Try it, save your first
            memories, and tell us what&rsquo;s missing.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/dashboard"
              className="btn-primary inline-flex h-12 items-center justify-center rounded-full px-[29px] text-sm font-medium"
            >
              Try HeyYarvis
            </Link>
            <a
              href={githubUrl}
              className="btn-secondary inline-flex h-12 items-center justify-center rounded-full border border-border px-[29px] text-sm font-medium text-foreground/90"
            >
              View the code
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
