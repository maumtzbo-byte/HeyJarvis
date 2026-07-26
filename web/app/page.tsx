import Image from "next/image";
import Link from "next/link";

const steps = [
  {
    title: "Le hablás a Siri",
    description:
      '"Oye Siri, recordá que mi reunión con Carlos es el jueves." HeyYarvis guarda lo que le contás.',
  },
  {
    title: "Lo recuerda de verdad",
    description:
      "Cada recuerdo se resume y se guarda en una memoria vectorial propia, asociada solo a vos.",
  },
  {
    title: "Se lo preguntás cuando lo necesitás",
    description:
      '"Oye Siri, pregúntale a Yarvis cuándo es mi reunión con Carlos." Te responde corto y claro.',
  },
];

const features = [
  {
    title: "Memoria persistente",
    description:
      "No es un chat que se olvida. Lo que le contás queda guardado y se recupera por relevancia, no por fecha.",
  },
  {
    title: "Pensado para voz",
    description:
      "Las respuestas son cortas y naturales, listas para que Siri te las lea en voz alta.",
  },
  {
    title: "Tus datos, tu memoria",
    description:
      "Cada recuerdo queda asociado a tu usuario. Nada se comparte ni se mezcla entre personas.",
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

function AppIcon({ kind }: { kind: IconKind }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[52%] w-[52%]"
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
      <section className="relative flex min-h-[calc(100svh-73px)] flex-col overflow-hidden">
        <div className="relative z-10 flex flex-col items-center px-6 pt-16 text-center sm:pt-20">
          <span
            className="animate-fade-up rounded-full liquid-glass bg-background/60 px-3 py-1 text-xs font-medium text-muted"
            style={{ animationDelay: "0ms" }}
          >
            Fase de validación privada
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
            Tu segundo cerebro, que escucha y recuerda todo lo que le contás
            por voz.
          </p>
          <div
            className="animate-fade-up mt-7 flex flex-col gap-4 sm:flex-row"
            style={{ animationDelay: "240ms" }}
          >
            <Link
              href="/dashboard"
              className="btn-primary inline-flex h-12 items-center justify-center rounded-full px-[29px] text-sm font-medium"
            >
              Ver mis recuerdos
            </Link>
            <a
              href="https://github.com/maumtzbo-byte/HeyJarvis"
              className="btn-secondary inline-flex h-12 items-center justify-center rounded-full border border-border px-[29px] text-sm font-medium text-foreground/90"
            >
              Ver el código
            </a>
          </div>
        </div>

        {/* Network: HeyYarvis at the hub, every connected app as a node, lines converging to the center */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex justify-center"
        >
          <div
            className="animate-glow-pulse absolute bottom-0 h-[420px] w-[700px] -translate-y-[6%] rounded-full opacity-60 blur-[100px] sm:h-[560px] sm:w-[960px]"
            style={{
              background:
                "radial-gradient(closest-side, rgba(255,255,255,0.6), rgba(255,255,255,0.2) 55%, transparent 75%)",
            }}
          />
          <div
            className="absolute bottom-0 rounded-full"
            style={{
              width: "700px",
              height: "700px",
              transform: "translateY(38%)",
              background:
                "radial-gradient(circle at 50% 42%, rgba(244,243,240,0.16), rgba(244,243,240,0.04) 45%, rgba(5,1,14,0) 68%)",
            }}
          />
          <div className="relative h-[420px] w-[420px] translate-y-[38%] sm:h-[640px] sm:w-[640px] lg:h-[760px] lg:w-[760px]">
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
                  <div className="relative h-[70%] w-[70%]">
                    <Image
                      src="/brand/logo-mark.png"
                      alt="HeyYarvis"
                      fill
                      sizes="120px"
                      className="object-contain"
                    />
                  </div>
                </div>
              </foreignObject>
            </svg>
          </div>
        </div>

        <div className="relative z-10 mx-auto mt-auto w-full max-w-5xl px-6 pb-10">
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

      <section id="como-funciona" className="border-t border-border/80">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted/70">
            Proceso
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            Cómo funciona
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

      <section className="border-t border-border/80">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted/70">
            Diferencial
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            Por qué HeyYarvis
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
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

      <section className="border-t border-border/80">
        <div className="mx-auto max-w-5xl px-6 py-16 text-sm text-muted">
          <p>
            HeyYarvis está en fase de validación: hoy funciona a través de
            Atajos de Siri conectados directamente a la API. Las integraciones
            directas con apps como Notion, Gmail o WhatsApp son parte de la
            visión del producto y todavía están en camino.
          </p>
        </div>
      </section>
    </main>
  );
}
