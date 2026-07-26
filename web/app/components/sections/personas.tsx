import { GraduationCap, Briefcase, UserCheck, type LucideIcon } from "lucide-react";
import { Reveal, RevealItem, RevealStagger } from "../ui/reveal";
import { personas } from "../../content/site-content";

const iconMap: Record<(typeof personas)[number]["icon"], LucideIcon> = {
  graduationCap: GraduationCap,
  briefcase: Briefcase,
  userCheck: UserCheck,
};

export function Personas() {
  return (
    <section className="section-divider section-glow-warm">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted/70">
            Who it&rsquo;s for
          </p>
          <h2
            style={{ fontFamily: "var(--font-display)" }}
            className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl"
          >
            Built for <span className="italic font-light text-muted">busy</span> people
          </h2>
        </Reveal>

        <RevealStagger className="mt-10 grid gap-5 sm:grid-cols-3">
          {personas.map((persona) => {
            const Icon = iconMap[persona.icon];
            return (
              <RevealItem
                key={persona.title}
                className="card-hover-warm flex items-start gap-4 rounded-2xl border border-border bg-surface p-6"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-warm/15 to-transparent ring-1 ring-accent-warm/20">
                  <Icon className="h-5 w-5 text-accent-warm" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="text-base font-semibold">{persona.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {persona.description}
                  </p>
                </div>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}
