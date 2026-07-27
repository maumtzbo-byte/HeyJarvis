import { BrainCircuit, Mic, Lock, Sparkles, Puzzle, MessageCircle, type LucideIcon } from "lucide-react";
import { Reveal, RevealItem, RevealStagger } from "../ui/reveal";
import { features } from "../../content/site-content";

const iconMap: Record<(typeof features)[number]["icon"], LucideIcon> = {
  brain: BrainCircuit,
  mic: Mic,
  lock: Lock,
  sparkles: Sparkles,
  puzzle: Puzzle,
  message: MessageCircle,
};

export function Features() {
  return (
    <section id="why-heyyarvis" className="section-divider section-glow-cool">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted/85">
            Why us
          </p>
          <h2
            style={{ fontFamily: "var(--font-display)" }}
            className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl"
          >
            <span className="italic font-light text-muted">Why</span> HeyYarvis
          </h2>
        </Reveal>

        <RevealStagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = iconMap[feature.icon];
            const isVoice = feature.icon === "mic";
            return (
              <RevealItem
                key={feature.title}
                className={`${isVoice ? "card-hover-warm" : "card-hover-cool"} flex flex-col gap-3 rounded-2xl border border-border p-6`}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ring-1 ${
                    isVoice
                      ? "bg-gradient-to-br from-accent-warm/15 to-transparent ring-accent-warm/20"
                      : "bg-gradient-to-br from-accent-cool/15 to-transparent ring-accent-cool/20"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 ${isVoice ? "text-accent-warm" : "text-accent-cool"}`}
                    strokeWidth={1.75}
                  />
                </div>
                <h3 className="text-base font-semibold">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted">
                  {feature.description}
                </p>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}
