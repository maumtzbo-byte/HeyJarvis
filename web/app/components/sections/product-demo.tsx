import { Mic } from "lucide-react";
import { Reveal } from "../ui/reveal";
import { demoConversation } from "../../content/site-content";

const WAVEFORM_BARS = [0, 120, 240, 360, 480];

export function ProductDemo() {
  return (
    <section className="section-divider relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px]"
        style={{
          background:
            "radial-gradient(680px circle at 50% 0%, rgba(217, 164, 65, 0.07), transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[420px]"
        style={{
          background:
            "radial-gradient(680px circle at 50% 100%, rgba(128, 115, 232, 0.08), transparent 65%)",
        }}
      />

      <div className="mx-auto max-w-5xl px-6 py-24">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted/85">
            See it in action
          </p>
          <h2
            style={{ fontFamily: "var(--font-display)" }}
            className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl"
          >
            Hear it for <span className="italic font-light text-muted">yourself</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            No screen, no typing. Just ask, and it remembers what you told it
            weeks ago.
          </p>
        </Reveal>

        <div className="mt-14 flex justify-center">
          <div className="liquid-glass w-full max-w-[320px] rounded-[2.75rem] border border-white/10 bg-surface/60 p-2.5 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]">
            <div className="flex min-h-[420px] flex-col justify-center gap-5 rounded-[2.25rem] border border-border/60 bg-background px-5 py-10">
              <Reveal delay={0}>
                <div className="mx-auto flex items-center gap-2 rounded-full border border-accent-warm/25 bg-accent-warm/5 px-3 py-1.5">
                  <Mic className="h-3 w-3 text-accent-warm" strokeWidth={2} />
                  <div className="flex h-3 items-center gap-[2px]">
                    {WAVEFORM_BARS.map((delay) => (
                      <span
                        key={delay}
                        className="animate-waveform h-full w-[2px] rounded-full bg-accent-warm"
                        style={{ animationDelay: `${delay}ms` }}
                      />
                    ))}
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wide text-accent-warm">
                    Listening
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm border border-border bg-surface px-4 py-3">
                  <p className="text-sm leading-snug text-foreground/90">
                    {demoConversation.prompt}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.5}>
                <div className="mr-auto max-w-[85%] rounded-2xl rounded-bl-sm border border-accent-cool/25 bg-accent-cool/[0.06] px-4 py-3">
                  <p className="text-sm leading-snug text-foreground/90">
                    {demoConversation.response}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.75}>
                <p className="text-center font-mono text-[10px] uppercase tracking-wide text-muted/85">
                  Answered instantly — no app to open
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
