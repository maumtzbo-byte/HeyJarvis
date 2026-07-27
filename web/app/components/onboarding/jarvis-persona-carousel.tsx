"use client";

import { useLayoutEffect, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
  type PanInfo,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PersonaCard } from "./persona-card";
import type { JarvisPersona } from "../../content/onboarding-content";

const GAP = 14;
const CARD_WIDTH_RATIO = 0.76;
const FLICK_VELOCITY = 500;
const FLICK_DISTANCE = 60;

function PersonaCardSlot({
  persona,
  index,
  cardWidth,
  viewportWidth,
  step,
  x,
  isSelected,
  onSelect,
  onFocus,
}: {
  persona: JarvisPersona;
  index: number;
  cardWidth: number;
  viewportWidth: number;
  step: number;
  x: MotionValue<number>;
  isSelected: boolean;
  onSelect: () => void;
  onFocus: () => void;
}) {
  const distance = useTransform(x, (latest) => {
    if (!step) return 0;
    const cardLeft = index * step + latest;
    const centeredLeft = (viewportWidth - cardWidth) / 2;
    return (cardLeft - centeredLeft) / step;
  });
  const scale = useTransform(distance, [-2, -1, 0, 1, 2], [0.82, 0.89, 1, 0.89, 0.82]);
  const opacity = useTransform(distance, [-2, -1, 0, 1, 2], [0.35, 0.6, 1, 0.6, 0.35]);

  return (
    <motion.div
      style={{ width: cardWidth, marginRight: GAP, flexShrink: 0, scale, opacity }}
    >
      <PersonaCard persona={persona} isSelected={isSelected} onTap={onSelect} onFocus={onFocus} />
    </motion.div>
  );
}

export function JarvisPersonaCarousel({
  personas,
  selectedId,
  viewportWidth,
  onSelect,
}: {
  personas: JarvisPersona[];
  selectedId: string | null;
  viewportWidth: number;
  onSelect: (persona: JarvisPersona) => void;
}) {
  const [focusIndex, setFocusIndex] = useState(() => {
    const idx = personas.findIndex((p) => p.id === selectedId);
    return idx >= 0 ? idx : 0;
  });

  const x = useMotionValue(0);
  const reduceMotion = useReducedMotion();

  const cardWidth = Math.round(viewportWidth * CARD_WIDTH_RATIO);
  const step = cardWidth + GAP;

  useLayoutEffect(() => {
    if (!step) return;
    x.set(-focusIndex * step + (viewportWidth - cardWidth) / 2);
    // Re-center on measurement/resize changes without animating.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, viewportWidth]);

  function goTo(index: number) {
    const clamped = Math.max(0, Math.min(personas.length - 1, index));
    setFocusIndex(clamped);
    const target = -clamped * step + (viewportWidth - cardWidth) / 2;
    animate(
      x,
      target,
      reduceMotion
        ? { duration: 0 }
        : { type: "spring", stiffness: 300, damping: 32, mass: 0.9 }
    );
  }

  function handleDragEnd(_event: unknown, info: PanInfo) {
    let delta = 0;
    if (info.offset.x < -FLICK_DISTANCE || info.velocity.x < -FLICK_VELOCITY) delta = 1;
    else if (info.offset.x > FLICK_DISTANCE || info.velocity.x > FLICK_VELOCITY) delta = -1;
    goTo(focusIndex + delta);
  }

  const dragConstraints = {
    left: -(personas.length - 1) * step + (viewportWidth - cardWidth) / 2,
    right: (viewportWidth - cardWidth) / 2,
  };

  return (
    <fieldset className="flex min-w-0 flex-col gap-3 border-0 p-0">
      <legend className="sr-only">Choose your Jarvis personality</legend>

      <div className="-mx-8 overflow-hidden sm:-mx-10">
        <motion.div
          drag={step ? "x" : false}
          dragElastic={0.12}
          dragConstraints={dragConstraints}
          dragMomentum={false}
          onDragEnd={handleDragEnd}
          style={{ x }}
          className="flex items-stretch py-1"
        >
          {personas.map((persona, index) => (
            <PersonaCardSlot
              key={persona.id}
              persona={persona}
              index={index}
              cardWidth={cardWidth}
              viewportWidth={viewportWidth}
              step={step}
              x={x}
              isSelected={persona.id === selectedId}
              onSelect={() => onSelect(persona)}
              onFocus={() => goTo(index)}
            />
          ))}
        </motion.div>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          aria-label="Previous personality"
          disabled={focusIndex === 0}
          onClick={() => goTo(focusIndex - 1)}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent-cool/50 hover:text-foreground disabled:opacity-30"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />
        </button>

        <div className="flex items-center gap-1.5">
          {personas.map((persona, index) => (
            <button
              key={persona.id}
              type="button"
              aria-label={`View ${persona.name}`}
              onClick={() => goTo(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === focusIndex ? "w-5 bg-accent-cool" : "w-1.5 bg-border"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Next personality"
          disabled={focusIndex === personas.length - 1}
          onClick={() => goTo(focusIndex + 1)}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent-cool/50 hover:text-foreground disabled:opacity-30"
        >
          <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
        </button>
      </div>

      <p className="text-center text-xs text-muted">
        {selectedId
          ? `Selected — ${personas.find((p) => p.id === selectedId)?.name}`
          : "Swipe to explore, then tap to choose"}
      </p>
    </fieldset>
  );
}
