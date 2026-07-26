import { Reveal, RevealItem, RevealStagger } from "../ui/reveal";
import { painPoints } from "../../content/site-content";

export function Problem() {
  return (
    <section className="section-divider">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted/70">
            The problem
          </p>
          <h2
            style={{ fontFamily: "var(--font-display)" }}
            className="mt-3 max-w-2xl text-2xl font-medium tracking-tight sm:text-3xl"
          >
            It&rsquo;s not that you have a bad memory.{" "}
            <span className="italic font-light text-muted">
              It&rsquo;s that it&rsquo;s scattered across 15 apps.
            </span>
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
            You jot things in Notion, promise things on WhatsApp, schedule in
            your calendar… and something still slips through. HeyYarvis
            brings it all into one place you can just talk to.
          </p>
        </Reveal>

        <RevealStagger className="mt-10 grid gap-5 sm:grid-cols-3">
          {painPoints.map((point) => (
            <RevealItem
              key={point.title}
              className="card-hover-neutral rounded-2xl border border-border p-6"
            >
              <h3 className="text-base font-semibold">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {point.description}
              </p>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
