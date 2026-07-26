import { Reveal, RevealItem, RevealStagger } from "../ui/reveal";
import { steps } from "../../content/site-content";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-border/80">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted/70">
            Process
          </p>
          <h2
            style={{ fontFamily: "var(--font-display)" }}
            className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl"
          >
            How it works
          </h2>
        </Reveal>

        <RevealStagger className="mt-10 grid gap-5 sm:grid-cols-3">
          {steps.map((step, index) => (
            <RevealItem
              key={step.title}
              className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent-warm/40"
            >
              <span className="font-mono text-2xl font-medium text-accent-warm/70">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-base font-semibold">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
