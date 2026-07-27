"use client";

import { toneOptions, voiceStyleOptions } from "../../content/onboarding-content";

export function PersonalizeToneVoice({
  tone,
  voiceStyle,
  onToneChange,
  onVoiceStyleChange,
}: {
  tone: string;
  voiceStyle: string;
  onToneChange: (value: string) => void;
  onVoiceStyleChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2.5">
        <span className="text-xs font-medium uppercase tracking-wide text-muted">Tone</span>
        <div className="grid grid-cols-2 gap-2.5">
          {toneOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onToneChange(option.value)}
              className={`rounded-2xl border p-3.5 text-left transition-colors ${
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

      <div className="flex flex-col gap-2.5">
        <span className="text-xs font-medium uppercase tracking-wide text-muted">Personality</span>
        <div className="grid grid-cols-2 gap-2.5">
          {voiceStyleOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onVoiceStyleChange(option.value)}
              className={`rounded-2xl border p-3.5 text-left transition-colors ${
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
    </div>
  );
}
