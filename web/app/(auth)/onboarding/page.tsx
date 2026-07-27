"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase-client";
import {
  findPersonaByToneAndVoice,
  focusAreaOptions,
  jarvisPersonas,
  pronounOptions,
  useCaseOptions,
} from "../../content/onboarding-content";
import { JarvisPersonaCarousel } from "../../components/onboarding/jarvis-persona-carousel";
import { PersonalizeToneVoice } from "../../components/onboarding/personalize-tone-voice";

const DEFAULT_API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
const STEP_COUNT = 4;

function getApiUrl() {
  if (typeof window === "undefined") return DEFAULT_API_URL;
  return window.localStorage.getItem("heyjarvis:apiUrl") || DEFAULT_API_URL;
}

function StepHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h1
        style={{ fontFamily: "var(--font-display)" }}
        className="text-2xl font-semibold tracking-tight"
      >
        {title}
      </h1>
      <p className="mt-1.5 text-sm text-muted">{subtitle}</p>
    </div>
  );
}

export default function OnboardingPage() {
  const router = useRouter();
  const [checkingSession, setCheckingSession] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  const [step, setStep] = useState(0);
  const [fullName, setFullName] = useState("");
  const [pronouns, setPronouns] = useState("");
  const [useCase, setUseCase] = useState("");
  const [focusAreas, setFocusAreas] = useState<string[]>([]);
  const [tone, setTone] = useState("");
  const [voiceStyle, setVoiceStyle] = useState("");
  const [personaMode, setPersonaMode] = useState<"curated" | "custom">("curated");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Measured from a permanent block-level sibling of the step content, not
  // from anything inside the carousel: the carousel's own card widths are
  // derived from this measurement, so measuring an element that shares an
  // auto-sized ancestor with the carousel's content creates a feedback loop
  // (confirmed empirically — width balloons geometrically across renders).
  // This div sits directly inside the fixed-width (max-w-lg) outer card, as
  // a plain block sibling, so its width is fixed by the card alone.
  //
  // A callback ref (not useRef+useEffect([])) because the sizer only enters
  // the DOM once `checkingSession` flips false and the real card renders —
  // an effect with an empty dep array fires on the earlier "Loading..." commit,
  // before the node exists, and never re-runs to pick it up.
  const [sizerNode, setSizerNode] = useState<HTMLDivElement | null>(null);
  const [viewportWidth, setViewportWidth] = useState(0);

  useLayoutEffect(() => {
    if (!sizerNode) return;
    function measure() {
      setViewportWidth(sizerNode?.offsetWidth ?? 0);
    }
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(sizerNode);
    return () => ro.disconnect();
  }, [sizerNode]);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) {
        router.replace("/login");
        return;
      }
      setSession(data.session);

      try {
        const response = await fetch(`${getApiUrl().replace(/\/$/, "")}/profile`, {
          headers: { Authorization: `Bearer ${data.session.access_token}` },
        });
        if (response.ok) {
          const profile = await response.json();
          if (profile.onboarding_completed) {
            setFullName(profile.full_name ?? "");
            setPronouns(profile.pronouns ?? "");
            setUseCase(profile.use_case ?? "");
            setFocusAreas(profile.focus_areas ?? []);
            setTone(profile.tone ?? "");
            setVoiceStyle(profile.voice_style ?? "");
            setPersonaMode(
              findPersonaByToneAndVoice(profile.tone, profile.voice_style) ? "curated" : "custom"
            );
          }
        }
      } catch {
        // Backend unreachable: fine, just start with a blank form.
      }

      setCheckingSession(false);
    });
  }, [router]);

  function toggleFocusArea(value: string) {
    setFocusAreas((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  }

  async function finishOnboarding() {
    if (!session) return;
    setSaving(true);
    setError(null);

    try {
      const response = await fetch(`${getApiUrl().replace(/\/$/, "")}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          full_name: fullName.trim(),
          pronouns: pronouns || null,
          use_case: useCase,
          focus_areas: focusAreas,
          tone,
          voice_style: voiceStyle,
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.detail ?? `Error ${response.status} saving your preferences`);
      }

      router.push("/dashboard");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not save your preferences. Check the backend URL in Settings."
      );
    } finally {
      setSaving(false);
    }
  }

  if (checkingSession) {
    return <p className="text-sm text-muted">Loading...</p>;
  }

  const canContinue =
    (step === 0 && fullName.trim().length > 0) ||
    (step === 1 && useCase) ||
    (step === 2 && focusAreas.length > 0) ||
    (step === 3 && tone.length > 0 && voiceStyle.length > 0);

  return (
    <div className="liquid-glass w-full max-w-lg overflow-hidden rounded-[2rem] border border-white/10 bg-surface/70 p-8 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)] sm:p-10">
      <div className="flex items-center gap-1.5">
        {Array.from({ length: STEP_COUNT }).map((_, index) => (
          <span
            key={index}
            className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
              index <= step ? "bg-accent-warm" : "bg-border"
            }`}
          />
        ))}
      </div>

      <div ref={setSizerNode} aria-hidden className="-mx-8 h-px sm:-mx-10" />

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          {step === 0 && (
            <div className="mt-7 flex flex-col gap-5">
              <StepHeading
                title="What should we call you?"
                subtitle="So HeyYarvis can talk to you like it actually knows you."
              />
              <div className="flex flex-col gap-1.5">
                <label htmlFor="fullName" className="text-sm font-medium">
                  Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  autoFocus
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Carlos"
                  className="h-11 rounded-xl border border-border bg-background/40 px-3.5 text-sm outline-none transition-colors focus:border-accent-warm/50"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-medium">
                  Pronouns <span className="text-muted">(optional)</span>
                </span>
                <div className="flex flex-wrap gap-2">
                  {pronounOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() =>
                        setPronouns((current) => (current === option.value ? "" : option.value))
                      }
                      className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                        pronouns === option.value
                          ? "border-accent-warm bg-accent-warm/[0.08] text-foreground"
                          : "border-border text-muted hover:border-accent-warm/40"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="mt-7 flex flex-col gap-5">
              <StepHeading
                title="What will you use HeyYarvis for?"
                subtitle="This helps us tailor what it pays attention to."
              />
              <div className="grid gap-2.5 sm:grid-cols-2">
                {useCaseOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setUseCase(option.value)}
                    className={`rounded-2xl border p-4 text-left transition-colors ${
                      useCase === option.value
                        ? "border-accent-warm bg-accent-warm/[0.08]"
                        : "border-border hover:border-accent-warm/40"
                    }`}
                  >
                    <p className="text-sm font-medium">{option.label}</p>
                    <p className="mt-1 text-xs text-muted">{option.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="mt-7 flex flex-col gap-5">
              <StepHeading
                title="What do you want it to remember most?"
                subtitle="Pick as many as apply."
              />
              <div className="flex flex-wrap gap-2">
                {focusAreaOptions.map((option) => {
                  const selected = focusAreas.includes(option.value);
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => toggleFocusArea(option.value)}
                      className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                        selected
                          ? "border-accent-warm bg-accent-warm/[0.08] text-foreground"
                          : "border-border text-muted hover:border-accent-warm/40"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="mt-7 flex flex-col gap-5">
              <StepHeading
                title="Choose your Jarvis"
                subtitle={
                  personaMode === "curated"
                    ? "Swipe to see each personality, or personalize your own."
                    : "Mix and match the tone and personality yourself."
                }
              />

              {personaMode === "curated" ? (
                <JarvisPersonaCarousel
                  personas={jarvisPersonas}
                  selectedId={findPersonaByToneAndVoice(tone, voiceStyle)?.id ?? null}
                  viewportWidth={viewportWidth}
                  onSelect={(persona) => {
                    setTone(persona.tone);
                    setVoiceStyle(persona.voiceStyle);
                  }}
                />
              ) : (
                <PersonalizeToneVoice
                  tone={tone}
                  voiceStyle={voiceStyle}
                  onToneChange={setTone}
                  onVoiceStyleChange={setVoiceStyle}
                />
              )}

              <button
                type="button"
                onClick={() => setPersonaMode((mode) => (mode === "curated" ? "custom" : "curated"))}
                className="text-center text-sm text-muted underline underline-offset-2 transition-colors hover:text-foreground"
              >
                {personaMode === "curated" ? "Want a different mix? Personalize yours" : "‹ Back to curated picks"}
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {error && (
        <p className="mt-4 rounded-md border border-red-900/60 bg-red-950/40 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      <div className="mt-8 flex items-center justify-between">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((current) => current - 1)}
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            Back
          </button>
        ) : (
          <span />
        )}

        {step < STEP_COUNT - 1 ? (
          <button
            type="button"
            disabled={!canContinue}
            onClick={() => setStep((current) => current + 1)}
            className="btn-primary inline-flex h-11 items-center justify-center rounded-full px-6 text-sm font-medium disabled:opacity-40"
          >
            Continue
          </button>
        ) : (
          <button
            type="button"
            disabled={!canContinue || saving}
            onClick={finishOnboarding}
            className="btn-primary inline-flex h-11 items-center justify-center rounded-full px-6 text-sm font-medium disabled:opacity-40"
          >
            {saving ? "Saving..." : "Finish"}
          </button>
        )}
      </div>
    </div>
  );
}
