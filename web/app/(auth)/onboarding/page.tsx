"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase-client";
import {
  focusAreaOptions,
  toneOptions,
  useCaseOptions,
  voiceStyleOptions,
} from "../../content/onboarding-content";

const DEFAULT_API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
const STEP_COUNT = 4;

function getApiUrl() {
  if (typeof window === "undefined") return DEFAULT_API_URL;
  return window.localStorage.getItem("heyjarvis:apiUrl") || DEFAULT_API_URL;
}

export default function OnboardingPage() {
  const router = useRouter();
  const [checkingSession, setCheckingSession] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  const [step, setStep] = useState(0);
  const [useCase, setUseCase] = useState("");
  const [focusAreas, setFocusAreas] = useState<string[]>([]);
  const [tone, setTone] = useState("");
  const [voiceStyle, setVoiceStyle] = useState("");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace("/login");
        return;
      }
      setSession(data.session);
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
        body: JSON.stringify({ use_case: useCase, focus_areas: focusAreas, tone, voice_style: voiceStyle }),
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
    (step === 0 && useCase) ||
    (step === 1 && focusAreas.length > 0) ||
    (step === 2 && tone) ||
    (step === 3 && voiceStyle);

  return (
    <div className="w-full max-w-lg rounded-2xl border border-border bg-surface p-8">
      <div className="flex items-center gap-1.5">
        {Array.from({ length: STEP_COUNT }).map((_, index) => (
          <span
            key={index}
            className={`h-1 flex-1 rounded-full ${
              index <= step ? "bg-accent-warm" : "bg-border"
            }`}
          />
        ))}
      </div>

      {step === 0 && (
        <div className="mt-6 flex flex-col gap-4">
          <div>
            <h1
              style={{ fontFamily: "var(--font-display)" }}
              className="text-xl font-semibold tracking-tight"
            >
              What will you use HeyYarvis for?
            </h1>
            <p className="mt-1 text-sm text-muted">This helps us tailor what it pays attention to.</p>
          </div>
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

      {step === 1 && (
        <div className="mt-6 flex flex-col gap-4">
          <div>
            <h1
              style={{ fontFamily: "var(--font-display)" }}
              className="text-xl font-semibold tracking-tight"
            >
              What do you want it to remember most?
            </h1>
            <p className="mt-1 text-sm text-muted">Pick as many as apply.</p>
          </div>
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

      {step === 2 && (
        <div className="mt-6 flex flex-col gap-4">
          <div>
            <h1
              style={{ fontFamily: "var(--font-display)" }}
              className="text-xl font-semibold tracking-tight"
            >
              What tone should it use when it answers you?
            </h1>
            <p className="mt-1 text-sm text-muted">This changes how HeyYarvis actually replies.</p>
          </div>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {toneOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setTone(option.value)}
                className={`rounded-2xl border p-4 text-left transition-colors ${
                  tone === option.value
                    ? "border-accent-cool bg-accent-cool/[0.08]"
                    : "border-border hover:border-accent-cool/40"
                }`}
              >
                <p className="text-sm font-medium">{option.label}</p>
                <p className="mt-1 text-xs text-muted">{option.description}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="mt-6 flex flex-col gap-4">
          <div>
            <h1
              style={{ fontFamily: "var(--font-display)" }}
              className="text-xl font-semibold tracking-tight"
            >
              What personality should it have?
            </h1>
            <p className="mt-1 text-sm text-muted">Last one — this is the voice behind the answers.</p>
          </div>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {voiceStyleOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setVoiceStyle(option.value)}
                className={`rounded-2xl border p-4 text-left transition-colors ${
                  voiceStyle === option.value
                    ? "border-accent-cool bg-accent-cool/[0.08]"
                    : "border-border hover:border-accent-cool/40"
                }`}
              >
                <p className="text-sm font-medium">{option.label}</p>
                <p className="mt-1 text-xs text-muted">{option.description}</p>
              </button>
            ))}
          </div>
        </div>
      )}

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
            className="inline-flex h-10 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            Continue
          </button>
        ) : (
          <button
            type="button"
            disabled={!canContinue || saving}
            onClick={finishOnboarding}
            className="inline-flex h-10 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            {saving ? "Saving..." : "Finish"}
          </button>
        )}
      </div>
    </div>
  );
}
