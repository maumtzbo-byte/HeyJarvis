"use client";

import { motion, type MotionStyle } from "framer-motion";
import { Check } from "lucide-react";
import type { JarvisPersona } from "../../content/onboarding-content";

export function PersonaCard({
  persona,
  isSelected,
  onTap,
  onFocus,
  style,
}: {
  persona: JarvisPersona;
  isSelected: boolean;
  onTap: () => void;
  onFocus: () => void;
  style?: MotionStyle;
}) {
  return (
    <motion.button
      type="button"
      aria-pressed={isSelected}
      onTap={onTap}
      onFocus={onFocus}
      style={style}
      className={`liquid-glass flex h-full w-full flex-col gap-3 rounded-[1.5rem] border p-5 text-left ${
        isSelected
          ? "border-accent-cool bg-accent-cool/[0.08]"
          : "border-white/10 bg-background/60"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <h2
          style={{ fontFamily: "var(--font-display)" }}
          className="text-lg font-semibold tracking-tight"
        >
          {persona.name}
        </h2>
        {isSelected && (
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-cool text-background">
            <Check className="h-3 w-3" strokeWidth={3} />
          </span>
        )}
      </div>
      <p className="text-xs font-medium text-accent-cool">{persona.tagline}</p>
      <p className="text-sm text-muted">{persona.description}</p>
      <div className="mt-1 flex flex-col gap-1.5">
        <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm border border-border bg-surface px-3 py-2">
          <p className="text-xs leading-relaxed text-foreground/90">{persona.example.prompt}</p>
        </div>
        <div className="mr-auto max-w-[85%] rounded-2xl rounded-bl-sm border border-accent-cool/25 bg-accent-cool/[0.06] px-3 py-2">
          <p className="text-xs leading-relaxed text-foreground/90">{persona.example.response}</p>
        </div>
      </div>
    </motion.button>
  );
}
