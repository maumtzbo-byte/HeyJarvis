export const githubUrl = "https://github.com/maumtzbo-byte/HeyJarvis";

export const navLinks = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Why HeyYarvis", href: "/#why-heyyarvis" },
  { label: "My memories", href: "/dashboard" },
];

export const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "How it works", href: "/#how-it-works" },
      { label: "Why HeyYarvis", href: "/#why-heyyarvis" },
      { label: "My memories", href: "/dashboard" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Code on GitHub", href: githubUrl },
      { label: "Project README", href: `${githubUrl}#readme` },
    ],
  },
];

export const heroMemoryCards: {
  id: string;
  text: string;
  timestamp: string;
  rotate: number;
  cycleDelayMs: number;
  visibleDurationMs: number;
}[] = [
  {
    id: "meeting",
    text: "Meeting with Carlos — Thu 3pm",
    timestamp: "09:41 AM",
    rotate: -6,
    cycleDelayMs: 0,
    visibleDurationMs: 5200,
  },
  {
    id: "gift",
    text: "Remind me about mom's gift",
    timestamp: "11:02 AM",
    rotate: 4,
    cycleDelayMs: 1400,
    visibleDurationMs: 6100,
  },
  {
    id: "flight",
    text: "Flight lands 6:40pm, tell Sam",
    timestamp: "02:17 PM",
    rotate: -3,
    cycleDelayMs: 2600,
    visibleDurationMs: 4800,
  },
  {
    id: "idea",
    text: "Idea: rename the roadmap section",
    timestamp: "08:55 PM",
    rotate: 5,
    cycleDelayMs: 4100,
    visibleDurationMs: 5600,
  },
];

export const painPoints = [
  {
    title: "You forget things",
    description:
      "Important things get lost between notes, chats, and apps you never open again.",
  },
  {
    title: "Everything's scattered",
    description:
      "Your life doesn't live in one place, but your memory should.",
  },
  {
    title: "Voice assistants don't remember",
    description:
      "Siri answers you, but doesn't learn. Every question starts from zero.",
  },
];

export const steps = [
  {
    title: "You talk to Siri",
    description:
      '"Hey Siri, remember my meeting with Carlos is on Thursday." HeyYarvis saves what you tell it.',
  },
  {
    title: "It actually remembers",
    description:
      "Every memory gets summarized and stored in its own vector memory, tied only to you.",
  },
  {
    title: "You ask when you need it",
    description:
      '"Hey Siri, ask Yarvis when my meeting with Carlos is." It answers short and clear.',
  },
];

export const features: {
  title: string;
  description: string;
  icon: "brain" | "mic" | "lock" | "sparkles" | "puzzle" | "message";
}[] = [
  {
    title: "Persistent memory",
    description:
      "It's not a chat that forgets. What you tell it stays saved and gets retrieved by relevance, not by date.",
    icon: "brain",
  },
  {
    title: "Built for voice",
    description:
      "Answers are short and natural, ready for Siri to read out loud.",
    icon: "mic",
  },
  {
    title: "Your data, your memory",
    description:
      "Every memory is tied to your account. Nothing is shared or mixed between people.",
    icon: "lock",
  },
  {
    title: "Search by meaning",
    description:
      "You don't need the exact words: HeyYarvis understands what you're looking for and finds the right memory.",
    icon: "sparkles",
  },
  {
    title: "Works with what you already use",
    description:
      "It's triggered with Siri, no new apps to install or screens to look at.",
    icon: "puzzle",
  },
  {
    title: "Simple answers",
    description:
      "No long paragraphs: short answers, made to be heard while you do something else.",
    icon: "message",
  },
];

export const personas: {
  title: string;
  description: string;
  icon: "graduationCap" | "briefcase" | "userCheck";
}[] = [
  {
    title: "Students",
    description:
      "Save due dates, ideas for assignments, and what your professor said, all with your voice.",
    icon: "graduationCap",
  },
  {
    title: "Professionals",
    description:
      "Remember commitments, meeting decisions, and to-dos without writing anything down.",
    icon: "briefcase",
  },
  {
    title: "Anyone who forgets things",
    description:
      "If you've ever been late or forgotten something important because you didn't write it down, this is for you.",
    icon: "userCheck",
  },
];

export const privacyPoints: {
  title: string;
  description: string;
  icon: "userLock" | "shield" | "key" | "trash";
}[] = [
  {
    title: "Yours alone",
    description: "Every memory is tied only to your account.",
    icon: "userLock",
  },
  {
    title: "Never shared",
    description:
      "Nothing is shared between people or used to train third-party models.",
    icon: "shield",
  },
  {
    title: "Encrypted at rest",
    description: "Data lives in a database with encryption at rest, not a loose note.",
    icon: "key",
  },
  {
    title: "Deletable anytime",
    description: "You can request your data be deleted at any time.",
    icon: "trash",
  },
];

export const faqs = [
  {
    q: "Do I need to install an app?",
    a: "No. For now everything runs through Siri Shortcuts, nothing new to install on your iPhone.",
  },
  {
    q: "What happens if I ask about something I never told it?",
    a: "HeyYarvis tells you: it doesn't make up information it doesn't have.",
  },
  {
    q: "Can I delete my memories?",
    a: "Yes, anytime. They're yours.",
  },
  {
    q: "When will integrations with Notion, Gmail, or WhatsApp be ready?",
    a: "That's the next step on the roadmap. Right now the focus is making voice memory work perfectly before adding connections.",
  },
  {
    q: "Is it free?",
    a: "HeyYarvis is in private validation: limited access and free for those testing it.",
  },
];

export type RoadmapPhase = {
  label: string;
  status: "active" | "pending";
  description: string;
  apps?: string[];
};

export const roadmapPhases: RoadmapPhase[] = [
  {
    label: "Voice memory",
    status: "active",
    description:
      "Talk to Siri, HeyYarvis summarizes and stores it, then answers when you ask. Live today.",
  },
  {
    label: "Productivity & communication",
    status: "pending",
    description:
      "Direct connections to the tools you already use for work and messaging.",
    apps: [
      "Notion",
      "Slack",
      "Gmail",
      "Calendar",
      "WhatsApp",
      "Drive",
      "Todoist",
      "Trello",
      "Asana",
      "ClickUp",
      "Telegram",
      "Outlook",
    ],
  },
  {
    label: "Life & context",
    status: "pending",
    description:
      "Broader context from the rest of your day, so it can remember more than just what you tell it.",
    apps: [
      "Maps",
      "Zapier",
      "LinkedIn",
      "Google Classroom",
      "Canvas",
      "Whoop",
      "Apple Health",
      "Plaid",
      "Uber",
      "Lyft",
      "Dropbox",
      "Make",
      "Amazon",
    ],
  },
];

export const techStack = ["Claude", "Supabase", "ChromaDB", "FastAPI", "Next.js", "Vercel"];

export const demoConversation = {
  prompt: "Hey Siri, ask Yarvis when I'm meeting Carlos.",
  response:
    "Your meeting with Carlos is Thursday at 3pm — you also asked him to bring the slides.",
};
