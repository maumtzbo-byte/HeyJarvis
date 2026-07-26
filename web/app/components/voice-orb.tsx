"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

const WAVEFORM_BARS = [0, 90, 180, 270, 360, 450, 540];

export function VoiceOrb({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={`relative flex h-32 w-32 items-center justify-center sm:h-48 sm:w-48 lg:h-64 lg:w-64 ${className ?? ""}`}
    >
      <div className="animate-glow-pulse absolute inset-0 -z-10 rounded-full bg-accent-warm/30 blur-[50px] sm:blur-[70px]" />

      <div className="absolute inset-0 opacity-45 mix-blend-screen">
        <Image
          src="/brand/hero-orb.png"
          alt=""
          width={960}
          height={960}
          className="h-full w-full object-contain"
          priority
        />
      </div>

      {!reduceMotion && (
        <motion.span
          aria-hidden
          className="absolute h-full w-full rounded-full border border-accent-cool/70"
          animate={{ scale: [0, 2.4], opacity: [0.55, 0] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            repeatDelay: 3.4,
            ease: "easeOut",
          }}
        />
      )}

      <div className="liquid-glass relative flex h-[68%] w-[68%] items-center justify-center rounded-full border border-white/15 bg-background/40">
        <div className="flex h-1/3 items-center gap-1">
          {WAVEFORM_BARS.map((delay) => (
            <span
              key={delay}
              className="animate-waveform h-full w-[3px] rounded-full bg-accent-warm sm:w-1"
              style={{ animationDelay: `${delay}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
