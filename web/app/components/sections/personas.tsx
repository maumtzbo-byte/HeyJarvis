import { Reveal, RevealItem, RevealStagger } from "../ui/reveal";
import { personas } from "../../content/site-content";

export function Personas() {
  return (
    <section className="border-t border-border/80">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted/70">
            Who it&rsquo;s for
          </p>
          <h2
            style={{ fontFamily: "var(--font-display)" }}
            className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl"
          >
            Built for busy people
          </h2>
        </Reveal>

        <RevealStagger className="mt-10 grid gap-5 sm:grid-cols-3">
          {personas.map((persona) => (
            <RevealItem
              key={persona.title}
              className="rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20"
            >
              <h3 className="text-base font-semibold">{persona.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {persona.description}
              </p>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
