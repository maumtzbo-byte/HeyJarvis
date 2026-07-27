import { UserLock, ShieldCheck, KeyRound, Trash2, type LucideIcon } from "lucide-react";
import { Reveal, RevealItem, RevealStagger } from "../ui/reveal";
import { privacyPoints } from "../../content/site-content";

const iconMap: Record<(typeof privacyPoints)[number]["icon"], LucideIcon> = {
  userLock: UserLock,
  shield: ShieldCheck,
  key: KeyRound,
  trash: Trash2,
};

export function Privacy() {
  return (
    <section className="section-divider section-glow-cool">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1fr] lg:items-start">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted/85">
              Privacy
            </p>
            <h2
              style={{ fontFamily: "var(--font-display)" }}
              className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl"
            >
              Your memory is <span className="italic font-light text-muted">yours</span>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
              A product that stores what you tell it has to earn your trust.
              Here&rsquo;s how we handle your data today.
            </p>
          </Reveal>

          <RevealStagger className="grid gap-4 sm:grid-cols-2">
            {privacyPoints.map((point) => {
              const Icon = iconMap[point.icon];
              return (
                <RevealItem
                  key={point.title}
                  className="card-hover-cool flex flex-col gap-2 rounded-2xl border border-border p-5"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-cool/15 to-transparent ring-1 ring-accent-cool/20">
                    <Icon className="h-4 w-4 text-accent-cool" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-1 text-sm font-semibold">{point.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {point.description}
                  </p>
                </RevealItem>
              );
            })}
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}
