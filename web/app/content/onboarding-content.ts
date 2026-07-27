export const pronounOptions = [
  { value: "she/her", label: "She/her" },
  { value: "he/him", label: "He/him" },
  { value: "they/them", label: "They/them" },
  { value: "prefer not to say", label: "Prefer not to say" },
];

export const useCaseOptions = [
  { value: "work", label: "Work", description: "Meetings, decisions, tasks" },
  { value: "personal", label: "Personal life", description: "Errands, family, everyday things" },
  { value: "school", label: "School", description: "Assignments, due dates, classes" },
  { value: "everything", label: "A bit of everything", description: "No single focus" },
];

export const focusAreaOptions = [
  { value: "meetings", label: "Meetings & appointments" },
  { value: "ideas", label: "Ideas" },
  { value: "errands", label: "Errands & shopping" },
  { value: "reminders", label: "Personal reminders" },
  { value: "codes", label: "Passwords & codes" },
];

export const toneOptions = [
  { value: "direct and concise", label: "Direct and concise", description: "Short, to the point" },
  { value: "warm and friendly", label: "Warm and friendly", description: "Conversational, kind" },
  {
    value: "formal and professional",
    label: "Formal and professional",
    description: "Polished, businesslike",
  },
  { value: "playful and casual", label: "Playful and casual", description: "Relaxed, informal" },
];

export const voiceStyleOptions = [
  {
    value: "straight to the point",
    label: "Straight to the point",
    description: "No small talk",
  },
  {
    value: "encouraging coach",
    label: "Encouraging coach",
    description: "Upbeat, supportive",
  },
  { value: "witty friend", label: "Witty friend", description: "A little humor" },
  {
    value: "calm and professional",
    label: "Calm and professional",
    description: "Even, measured",
  },
];

export type JarvisPersona = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tone: string;
  voiceStyle: string;
  example: { prompt: string; response: string };
};

export const jarvisPersonas: JarvisPersona[] = [
  {
    id: "straight-shooter",
    name: "The Straight Shooter",
    tagline: "Short, to the point",
    description: "No small talk. Just the answer you asked for.",
    tone: "direct and concise",
    voiceStyle: "straight to the point",
    example: {
      prompt: "When's my meeting with Carlos?",
      response: "Thursday at 3pm.",
    },
  },
  {
    id: "coach",
    name: "The Coach",
    tagline: "Upbeat, has your back",
    description: "Warm and encouraging, like a friend who's rooting for you.",
    tone: "warm and friendly",
    voiceStyle: "encouraging coach",
    example: {
      prompt: "When's my meeting with Carlos?",
      response: "You've got Carlos Thursday at 3 — you're all set!",
    },
  },
  {
    id: "pro",
    name: "The Pro",
    tagline: "Polished and composed",
    description: "Formal, measured, and businesslike — every time.",
    tone: "formal and professional",
    voiceStyle: "calm and professional",
    example: {
      prompt: "When's my meeting with Carlos?",
      response: "Your meeting with Carlos is scheduled for Thursday at 3pm.",
    },
  },
  {
    id: "wit",
    name: "The Wit",
    tagline: "Relaxed, a little humor",
    description: "Casual and playful, with a bit of personality in every answer.",
    tone: "playful and casual",
    voiceStyle: "witty friend",
    example: {
      prompt: "When's my meeting with Carlos?",
      response: "Thursday, 3pm — mark it before you forget again.",
    },
  },
];

export function findPersonaByToneAndVoice(
  tone: string | null | undefined,
  voiceStyle: string | null | undefined
): JarvisPersona | undefined {
  if (!tone || !voiceStyle) return undefined;
  return jarvisPersonas.find((p) => p.tone === tone && p.voiceStyle === voiceStyle);
}
