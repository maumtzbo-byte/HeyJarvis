"use client";

import Link from "next/link";
import { Reveal } from "../ui/reveal";
import { MemoryCard } from "../ui/memory-card";
import { VoiceOrb } from "../voice-orb";
import { githubUrl, heroMemoryCards } from "../../content/site-content";

const cardPositions = [
  "absolute top-[4%] left-[0%] w-[150px] sm:w-[190px]",
  "absolute top-[0%] right-[2%] w-[150px] sm:w-[190px]",
  "absolute bottom-[10%] left-[2%] hidden w-[190px] sm:block",
  "absolute bottom-[2%] right-[0%] hidden w-[190px] sm:block",
];

export function Hero() {
  return (
    <section className="relative flex flex-col overflow-hidden pb-14 pt-16 sm:pt-20">
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <Reveal>
          <span className="rounded-full liquid-glass bg-background/60 px-3 py-1 text-xs font-medium text-muted">
            Private validation phase
          </span>
        </Reveal>

        <Reveal delay={0.08}>
          <h1
            style={{ fontFamily: "var(--font-display)" }}
            className="mt-6 text-[40px] leading-[1.08] tracking-[-0.02em] sm:text-[60px] lg:text-[72px]"
          >
            <span className="font-normal text-foreground">Your </span>
            <span className="font-semibold text-foreground">second brain</span>
            <span className="font-normal text-foreground">, </span>
            <span className="font-light italic text-muted">accessible</span>
            <span className="font-normal text-foreground"> by voice.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mx-auto mt-4 max-w-xs text-lg leading-8 text-muted opacity-90 sm:max-w-md">
            Talk to it like Siri. It remembers like nothing else does.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-7 flex flex-col gap-4 sm:flex-row">
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

      <Reveal delay={0.32}>
        <div className="relative mx-auto mt-10 h-[280px] w-full max-w-[340px] sm:mt-14 sm:h-[440px] sm:max-w-[640px] lg:h-[560px] lg:max-w-[760px]">
          <div className="flex h-full w-full items-center justify-center">
            <VoiceOrb />
          </div>

          {heroMemoryCards.map((card, index) => (
            <div key={card.id} className={cardPositions[index]}>
              <MemoryCard
                text={card.text}
                timestamp={card.timestamp}
                rotate={card.rotate}
                cycleDelayMs={card.cycleDelayMs}
                visibleDurationMs={card.visibleDurationMs}
              />
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
