import Link from "next/link";

const painPoints = [
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

const steps = [
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

const features = [
  {
    title: "Persistent memory",
    description:
      "It's not a chat that forgets. What you tell it stays saved and gets retrieved by relevance, not by date.",
  },
  {
    title: "Built for voice",
    description:
      "Answers are short and natural, ready for Siri to read out loud.",
  },
  {
    title: "Your data, your memory",
    description:
      "Every memory is tied to your account. Nothing is shared or mixed between people.",
  },
  {
    title: "Search by meaning",
    description:
      "You don't need the exact words: HeyYarvis understands what you're looking for and finds the right memory.",
  },
  {
    title: "Works with what you already use",
    description:
      "It's triggered with Siri, no new apps to install or screens to look at.",
  },
  {
    title: "Simple answers",
    description:
      "No long paragraphs: short answers, made to be heard while you do something else.",
  },
];

const personas = [
  {
    title: "Students",
    description:
      "Save due dates, ideas for assignments, and what your professor said, all with your voice.",
  },
  {
    title: "Professionals",
    description:
      "Remember commitments, meeting decisions, and to-dos without writing anything down.",
  },
  {
    title: "Anyone who forgets things",
    description:
      "If you've ever been late or forgotten something important because you didn't write it down, this is for you.",
  },
];

const privacyPoints = [
  "Every memory is tied only to your account.",
  "Nothing is shared between people or used to train third-party models.",
  "Data lives in a database with encryption at rest, not a loose note.",
  "You can request your data be deleted at any time.",
];

const faqs = [
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

const stack = ["Claude", "Supabase", "ChromaDB", "FastAPI", "Next.js", "Vercel"];
const marqueeStack = [...stack, ...stack];

type IconKind =
  | "doc"
  | "chat"
  | "mail"
  | "list"
  | "calendar"
  | "cap"
  | "heart"
  | "card"
  | "pin"
  | "folder"
  | "car"
  | "person"
  | "zap"
  | "box";

const iconPaths: Record<IconKind, string> = {
  mail: "M3 5.5h14v9H3v-9Zm0 0 7 5.5 7-5.5",
  chat: "M4 4.5h12v8H8.2L4.5 16V4.5Z",
  calendar: "M3.5 4.5h13v12h-13v-12Zm0 4h13M7 2.5v4M13 2.5v4",
  list: "M4 5.5h12M4 10h12M4 14.5h7.5",
  doc: "M6.5 2h5l3.5 3.5V18h-8.5V2Zm5 0v3.5H15",
  cap: "M10 3 2 7l8 4 8-4-8-4Zm-5.5 6.2V13c0 1.4 2.5 2.7 5.5 2.7s5.5-1.3 5.5-2.7V9.2M17 8v5",
  folder: "M3 5.5h4.5l1.6 1.8H17v9H3v-10.8Z",
  heart: "M10 17s-6-3.8-6-8.4C4 5.6 6 4 8 4c1 0 2 .5 2 1.4C10 4.5 11 4 12 4c2 0 4 1.6 4 4.6 0 4.6-6 8.4-6 8.4Z",
  card: "M2.5 5.5h15v9h-15v-9Zm0 3.2h15",
  pin: "M10 18s6-6.6 6-10.6a6 6 0 1 0-12 0C4 11.4 10 18 10 18Zm0-8.4a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  car: "M4 13l1.6-5.2h8.8L16 13M3 13h14v3.6a.9.9 0 0 1-.9.9H3.9a.9.9 0 0 1-.9-.9V13Zm3.3 4.5a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 0 0 0 2.6Zm7.4 0a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 0 0 0 2.6Z",
  person: "M10 9.5a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4ZM3.8 18c0-3.7 2.8-6.4 6.2-6.4s6.2 2.7 6.2 6.4",
  zap: "M11.2 2 4.3 12h5l-1 6.5L17.7 8h-5.2l0.7-6Z",
  box: "M3 6.2 10 3l7 3.2-7 3.2-7-3.2Zm0 0v8.6l7 3.2 7-3.2V6.2M10 9.6v9",
};

function AppIcon({ kind, className = "h-[52%] w-[52%]" }: { kind: IconKind; className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d={iconPaths[kind]} />
    </svg>
  );
}

type OrbitApp = { name: string; icon: IconKind };

const innerRingApps: OrbitApp[] = [
  { name: "Notion", icon: "doc" },
  { name: "Slack", icon: "chat" },
  { name: "Gmail", icon: "mail" },
  { name: "Calendario", icon: "calendar" },
  { name: "WhatsApp", icon: "chat" },
  { name: "Drive", icon: "folder" },
  { name: "Maps", icon: "pin" },
  { name: "Zapier", icon: "zap" },
  { name: "LinkedIn", icon: "person" },
];

const outerRingApps: OrbitApp[] = [
  { name: "Todoist", icon: "list" },
  { name: "Trello", icon: "list" },
  { name: "Asana", icon: "list" },
  { name: "ClickUp", icon: "list" },
  { name: "Telegram", icon: "chat" },
  { name: "Outlook", icon: "mail" },
  { name: "Google Classroom", icon: "cap" },
  { name: "Canvas", icon: "cap" },
  { name: "Whoop", icon: "heart" },
  { name: "Apple Health", icon: "heart" },
  { name: "Plaid", icon: "card" },
  { name: "Uber", icon: "car" },
  { name: "Lyft", icon: "car" },
  { name: "Dropbox", icon: "folder" },
  { name: "Make", icon: "zap" },
  { name: "Amazon", icon: "box" },
];

const allConnectedApps: OrbitApp[] = [...innerRingApps, ...outerRingApps];

function ringPositions(count: number, radius: number) {
  return Array.from({ length: count }, (_, i) => {
    const angle = ((360 / count) * i - 90) * (Math.PI / 180);
    return { x: 100 + radius * Math.cos(angle), y: 100 + radius * Math.sin(angle) };
  });
}

const innerPositions = ringPositions(innerRingApps.length, 42);
const outerPositions = ringPositions(outerRingApps.length, 74);
const networkNodes = [
  ...innerRingApps.map((app, i) => ({ ...app, ...innerPositions[i], size: 15 })),
  ...outerRingApps.map((app, i) => ({ ...app, ...outerPositions[i], size: 13 })),
];

export default function Home() {
  return (
    <main className="relative z-10 flex flex-1 flex-col">
      <section className="relative flex flex-col overflow-hidden pb-14 pt-16 sm:pt-20">
        <div className="relative z-10 flex flex-col items-center px-6 text-center">
          <span
            className="animate-fade-up rounded-full liquid-glass bg-background/60 px-3 py-1 text-xs font-medium text-muted"
            style={{ animationDelay: "0ms" }}
          >
            Private validation phase
          </span>
          <h1
            style={{ fontFamily: "var(--font-display)", animationDelay: "80ms" }}
            className="animate-fade-up mt-6 text-[46px] font-normal leading-[1.05] tracking-[-0.02em] sm:text-[68px] lg:text-[80px]"
          >
            <span className="text-foreground">Hey Yarvis</span>
          </h1>
          <p
            className="animate-fade-up mt-4 max-w-xs sm:max-w-md text-lg leading-8 text-muted opacity-80"
            style={{ animationDelay: "160ms" }}
          >
            Your second brain, that listens and remembers everything you tell
            it by voice.
          </p>
          <div
            className="animate-fade-up mt-7 flex flex-col gap-4 sm:flex-row"
            style={{ animationDelay: "240ms" }}
          >
            <Link
              href="/dashboard"
              className="btn-primary inline-flex h-12 items-center justify-center rounded-full px-[29px] text-sm font-medium"
            >
              View my memories
            </Link>
            <a
              href="https://github.com/maumtzbo-byte/HeyJarvis"
              className="btn-secondary inline-flex h-12 items-center justify-center rounded-full border border-border px-[29px] text-sm font-medium text-foreground/90"
            >
              View the code
            </a>
          </div>
        </div>

        {/* Network: HeyYarvis at the hub, every connected app as a node, lines converging to the center.
            Rendered in normal document flow (not absolutely positioned) so it can never overlap the
            content above or below it, regardless of viewport height or browser. */}
        <div
          aria-hidden
          className="pointer-events-none relative mx-auto mt-10 h-[280px] w-[280px] shrink-0 sm:mt-14 sm:h-[440px] sm:w-[440px] lg:h-[560px] lg:w-[560px]"
        >
          <div
            className="animate-glow-pulse absolute inset-0 -z-10 rounded-full opacity-70 blur-[70px] sm:blur-[110px]"
            style={{
              background:
                "radial-gradient(closest-side, rgba(255,255,255,0.55), rgba(255,255,255,0.16) 55%, transparent 75%)",
            }}
          />
          <div className="animate-network-breathe h-full w-full">
            <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible">
              {networkNodes.map((node) => (
                <line
                  key={`line-${node.name}`}
                  x1={100}
                  y1={100}
                  x2={node.x}
                  y2={node.y}
                  stroke="rgba(244,243,240,0.22)"
                  strokeWidth={0.4}
                />
              ))}

              {networkNodes.map((node) => (
                <foreignObject
                  key={node.name}
                  x={node.x - node.size / 2}
                  y={node.y - node.size / 2}
                  width={node.size}
                  height={node.size}
                >
                  <div
                    title={node.name}
                    className="liquid-glass flex h-full w-full items-center justify-center rounded-full border border-white/25 bg-[#0a0714]/80 text-foreground/90 shadow-[0_0_10px_rgba(255,255,255,0.15)]"
                  >
                    <AppIcon kind={node.icon} />
                  </div>
                </foreignObject>
              ))}

              <foreignObject x={82} y={82} width={36} height={36}>
                <div className="flex h-full w-full items-center justify-center rounded-full border border-white/40 bg-[#0a0714] shadow-[0_0_30px_rgba(255,255,255,0.35)]">
                  {/* Plain <img>, not next/image: next/image's `fill` (position:absolute + srcset)
                      does not lay out reliably inside an SVG foreignObject on Safari. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brand/logo-mark.png"
                    alt="HeyYarvis"
                    className="h-[70%] w-[70%] object-contain"
                  />
                </div>
              </foreignObject>
            </svg>
          </div>
        </div>

        <div className="relative z-10 mx-auto mt-10 w-full max-w-5xl px-6 sm:mt-14">
          <div className="mx-auto w-full max-w-xl overflow-hidden rounded-full border border-white/10 bg-background/90 px-6 py-3 shadow-[0_8px_40px_-8px_rgba(0,0,0,0.8)] backdrop-blur-xl [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
            <div className="flex w-max animate-marquee items-center gap-10">
              {marqueeStack.map((name, index) => (
                <div key={`${name}-${index}`} className="flex items-center gap-10">
                  <span className="text-sm font-medium text-foreground/70 whitespace-nowrap transition-colors hover:text-foreground">
                    {name}
                  </span>
                  <span className="h-1 w-1 shrink-0 rounded-full bg-foreground/25" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problema */}
      <section className="border-t border-border/80">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted/70">
            The problem
          </p>
          <h2 className="mt-3 max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">
            It's not that you have a bad memory. It's that it's scattered
            across 15 apps.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
            You jot things in Notion, promise things on WhatsApp, schedule in
            your calendar… and something still slips through. HeyYarvis
            brings it all into one place you can just talk to.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {painPoints.map((point) => (
              <div
                key={point.title}
                className="rounded-2xl border border-border p-6 transition-colors hover:border-foreground/20"
              >
                <h3 className="text-base font-semibold">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-t border-border/80">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted/70">
            Process
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            How it works
          </h2>
          <ol className="mt-10 grid gap-5 sm:grid-cols-3">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-foreground/20"
              >
                <span className="text-2xl font-semibold text-foreground/40">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-base font-semibold">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Features */}
      <section id="why-heyyarvis" className="border-t border-border/80">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted/70">
            Why us
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            Why HeyYarvis
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col gap-2 rounded-2xl border border-border p-6 transition-colors hover:border-foreground/20 hover:bg-surface/60"
              >
                <h3 className="text-base font-semibold">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations roadmap */}
      <section className="border-t border-border/80">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted/70">
            Roadmap
          </p>
          <h2 className="mt-3 max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">
            Where we're headed
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
            Today HeyYarvis works 100% by voice, through Siri Shortcuts
            connected directly to the API. The next step is connecting it
            directly with the apps you already use every day — not built yet,
            but that's the direction.
          </p>
          <div className="mt-10 flex flex-wrap gap-2.5">
            {allConnectedApps.map((app) => (
              <span
                key={app.name}
                className="liquid-glass inline-flex items-center gap-2 rounded-full bg-surface/60 px-3.5 py-2 text-xs font-medium text-foreground/80"
              >
                <AppIcon kind={app.icon} className="h-3.5 w-3.5 text-foreground/60" />
                {app.name}
              </span>
            ))}
            <span className="inline-flex items-center rounded-full border border-dashed border-border px-3.5 py-2 text-xs font-medium text-muted/70">
              and more...
            </span>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="border-t border-border/80">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted/70">
            Who it's for
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            Built for busy people
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {personas.map((persona) => (
              <div
                key={persona.title}
                className="rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-foreground/20"
              >
                <h3 className="text-base font-semibold">{persona.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {persona.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className="border-t border-border/80">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted/70">
                Privacy
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                Your memory is yours
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
                A product that stores what you tell it has to earn your
                trust. Here's how we handle your data today.
              </p>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {privacyPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 rounded-2xl border border-border p-5 text-sm leading-relaxed text-muted"
                >
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/50" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border/80">
        <div className="mx-auto max-w-3xl px-6 py-24">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted/70">
            FAQ
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            What you're probably wondering
          </h2>
          <div className="mt-10 flex flex-col divide-y divide-border rounded-2xl border border-border">
            {faqs.map((item) => (
              <details key={item.q} className="group px-6 py-5 open:bg-surface/40">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium marker:content-none">
                  {item.q}
                  <span className="shrink-0 text-lg text-muted transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-border/80">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 py-24 text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Start building your second brain
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-muted">
            HeyYarvis is in private validation. Try it, save your first
            memories, and tell us what's missing.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/dashboard"
              className="btn-primary inline-flex h-12 items-center justify-center rounded-full px-[29px] text-sm font-medium"
            >
              View my memories
            </Link>
            <a
              href="https://github.com/maumtzbo-byte/HeyJarvis"
              className="btn-secondary inline-flex h-12 items-center justify-center rounded-full border border-border px-[29px] text-sm font-medium text-foreground/90"
            >
              View the code
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
