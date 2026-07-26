"use client";

import { motion, useReducedMotion, useSpring } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const WAVEFORM_BARS = [0, 90, 180, 270, 360, 450, 540];
const SPRING = { stiffness: 150, damping: 20, mass: 0.6 };

export function VoiceOrb({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const rotateX = useSpring(0, SPRING);
  const rotateY = useSpring(0, SPRING);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (reduceMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 20);
    rotateX.set(-py * 20);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 800 }}
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

      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="liquid-glass relative flex h-[68%] w-[68%] items-center justify-center rounded-full border border-white/15 bg-background/40"
      >
        <div className="flex h-1/3 items-center gap-1">
          {WAVEFORM_BARS.map((delay) => (
            <span
              key={delay}
              className="animate-waveform h-full w-[3px] rounded-full bg-accent-warm sm:w-1"
              style={{ animationDelay: `${delay}ms` }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
