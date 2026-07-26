import { Code2 } from "lucide-react";
import { Reveal } from "../ui/reveal";
import { githubUrl, techStack } from "../../content/site-content";

const marqueeStack = [...techStack, ...techStack];

export function BuildingInPublic() {
  return (
    <section className="section-divider">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted/70">
            Building in public
          </p>
          <h2
            style={{ fontFamily: "var(--font-display)" }}
            className="mt-3 max-w-2xl text-2xl font-medium tracking-tight sm:text-3xl"
          >
            No testimonials yet —{" "}
            <span className="italic font-light text-muted">
              we&rsquo;re still in private validation.
            </span>
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
            HeyYarvis doesn&rsquo;t have real users to quote yet, so we&rsquo;re not going
            to invent any. The code is open, the roadmap below is real, and
            you can follow along or try it yourself.
          </p>
          <a
            href={githubUrl}
            className="btn-secondary mt-6 inline-flex h-11 items-center gap-2 rounded-full border border-border px-6 text-sm font-medium text-foreground/90"
          >
            <Code2 className="h-4 w-4" strokeWidth={1.75} />
            Follow the build on GitHub
          </a>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-12 overflow-hidden rounded-full border border-white/10 bg-surface/60 px-6 py-3 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
            <div className="pause-on-hover flex w-max animate-marquee items-center gap-10">
              {marqueeStack.map((name, index) => (
                <div key={`${name}-${index}`} className="flex items-center gap-10">
                  <span className="text-sm font-medium text-foreground/70 whitespace-nowrap">
                    {name}
                  </span>
                  <span className="h-1 w-1 shrink-0 rounded-full bg-foreground/25" />
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
