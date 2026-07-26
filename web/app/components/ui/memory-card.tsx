"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const HIDDEN_GAP_MS = 1800;

export function MemoryCard({
  text,
  timestamp,
  rotate,
  className,
  cycleDelayMs,
  visibleDurationMs,
}: {
  text: string;
  timestamp: string;
  rotate: number;
  className?: string;
  cycleDelayMs: number;
  visibleDurationMs: number;
}) {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    let timeout: ReturnType<typeof setTimeout>;

    function showThenHide() {
      setVisible(true);
      timeout = setTimeout(() => {
        setVisible(false);
        timeout = setTimeout(showThenHide, HIDDEN_GAP_MS);
      }, visibleDurationMs);
    }

    timeout = setTimeout(showThenHide, cycleDelayMs);

    return () => clearTimeout(timeout);
  }, [reduceMotion, cycleDelayMs, visibleDurationMs]);

  return (
    <motion.div
      className={className}
      style={{ rotate: `${rotate}deg` }}
      initial={false}
      animate={
        reduceMotion
          ? undefined
          : { opacity: visible ? 1 : 0, y: visible ? 0 : 10, scale: visible ? 1 : 0.96 }
      }
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="liquid-glass flex flex-col gap-1.5 rounded-xl bg-background/85 px-3.5 py-3 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.7)]">
        <p className="text-xs font-medium leading-snug text-foreground/90 sm:text-sm">
          {text}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-wide text-muted">
          {timestamp}
        </p>
      </div>
    </motion.div>
  );
}
