import { CheckCircle2, Circle } from "lucide-react";
import { Reveal, RevealItem, RevealStagger } from "../ui/reveal";
import { roadmapPhases } from "../../content/site-content";

export function Roadmap() {
  return (
    <section className="border-t border-border/80">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted/70">
            Roadmap
          </p>
          <h2
            style={{ fontFamily: "var(--font-display)" }}
            className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl"
          >
            Where we&rsquo;re headed
          </h2>
        </Reveal>

        <RevealStagger className="relative mt-12 flex flex-col gap-10">
          <div
            aria-hidden
            className="absolute bottom-2 left-[11px] top-2 w-px bg-border sm:left-[15px]"
          />
          {roadmapPhases.map((phase) => {
            const isActive = phase.status === "active";
            const StatusIcon = isActive ? CheckCircle2 : Circle;
            return (
              <RevealItem key={phase.label} className="relative flex gap-5 pl-0">
                <div className="relative z-10 flex-shrink-0">
                  <StatusIcon
                    className={`h-6 w-6 sm:h-8 sm:w-8 ${
                      isActive ? "text-accent-cool" : "text-muted/50"
                    }`}
                    strokeWidth={1.75}
                    fill={isActive ? "var(--color-background)" : "none"}
                  />
                </div>
                <div className="flex-1 pb-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-semibold">{phase.label}</h3>
                    <span
                      className={`rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide ${
                        isActive
                          ? "bg-accent-cool/15 text-accent-cool"
                          : "bg-surface text-muted"
                      }`}
                    >
                      {isActive ? "Live" : "Planned"}
                    </span>
                  </div>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                    {phase.description}
                  </p>
                  {phase.apps && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {phase.apps.map((app) => (
                        <span
                          key={app}
                          className="rounded-full border border-border px-3 py-1 text-xs font-medium text-foreground/70"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}
