import Image from "next/image";
import Link from "next/link";

const painPoints = [
  {
    title: "Se te olvida",
    description:
      "Las cosas importantes se pierden entre notas, chats y apps que nunca volvés a abrir.",
  },
  {
    title: "Está todo separado",
    description:
      "Tu vida no vive en un solo lugar, pero tu memoria sí debería estar en uno.",
  },
  {
    title: "Los asistentes no recuerdan",
    description:
      "Siri te responde, pero no aprende. Cada pregunta vuelve a empezar de cero.",
  },
];

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
  {
    title: "Búsqueda por significado",
    description:
      "No necesitás la palabra exacta: HeyYarvis entiende qué buscás y encuentra el recuerdo correcto.",
  },
  {
    title: "Funciona con lo que ya usás",
    description:
      "Se activa con Siri, sin apps nuevas que instalar ni pantallas que mirar.",
  },
  {
    title: "Respuestas simples",
    description:
      "Nada de párrafos largos: contestaciones cortas, pensadas para escuchar mientras hacés otra cosa.",
  },
];

const personas = [
  {
    title: "Estudiantes",
    description:
      "Guardá fechas de entrega, ideas para trabajos y lo que dijo el profesor, todo con la voz.",
  },
  {
    title: "Profesionales",
    description:
      "Recordá compromisos, decisiones de reuniones y pendientes sin tener que anotar nada a mano.",
  },
  {
    title: "Quien se olvida de todo",
    description:
      "Si alguna vez llegaste tarde o te olvidaste algo importante por no anotarlo, esto es para vos.",
  },
];

const privacyPoints = [
  "Cada recuerdo está asociado únicamente a tu usuario.",
  "Nada se comparte entre personas ni se usa para entrenar modelos de terceros.",
  "Los datos viven en una base con cifrado en reposo, no en una nota suelta.",
  "Podés pedir que se borre tu información en cualquier momento.",
];

const faqs = [
  {
    q: "¿Necesito instalar una app?",
    a: "No. Por ahora todo funciona con Atajos de Siri, sin instalar nada nuevo en tu iPhone.",
  },
  {
    q: "¿Qué pasa si le pido algo que nunca le conté?",
    a: "HeyYarvis te lo dice: no inventa información que no tiene guardada.",
  },
  {
    q: "¿Puedo borrar mis recuerdos?",
    a: "Sí, cuando quieras. Son tuyos.",
  },
  {
    q: "¿Cuándo van a estar las integraciones con Notion, Gmail o WhatsApp?",
    a: "Es el siguiente paso del roadmap. Hoy el foco es que la memoria por voz funcione perfecto antes de sumar conexiones.",
  },
  {
    q: "¿Es gratis?",
    a: "HeyYarvis está en fase de validación privada: acceso limitado y sin costo para quienes lo están probando.",
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

        {/* Network: HeyYarvis at the hub, every connected app as a node, lines converging to the center.
            Every layer is centered with left-1/2 + translateX(-50%) — the one centering technique that
            behaves identically across browsers, since Safari does not center absolutely positioned
            children of a flex container the way Chromium does. */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-0">
          <div
            className="animate-glow-pulse absolute left-1/2 bottom-0 h-[300px] w-[440px] rounded-full opacity-60 blur-[80px] sm:h-[460px] sm:w-[820px] sm:blur-[100px] lg:h-[560px] lg:w-[960px]"
            style={{
              transform: "translate(-50%, -6%)",
              background:
                "radial-gradient(closest-side, rgba(255,255,255,0.6), rgba(255,255,255,0.2) 55%, transparent 75%)",
            }}
          />
          <div
            className="absolute left-1/2 bottom-0 rounded-full"
            style={{
              transform: "translate(-50%, 38%)",
              width: "min(90vw, 700px)",
              height: "min(90vw, 700px)",
              background:
                "radial-gradient(circle at 50% 42%, rgba(244,243,240,0.16), rgba(244,243,240,0.04) 45%, rgba(5,1,14,0) 68%)",
            }}
          />
          <div
            className="absolute left-1/2 bottom-0 h-[300px] w-[300px] sm:h-[560px] sm:w-[560px] lg:h-[720px] lg:w-[720px]"
            style={{ transform: "translate(-50%, 38%)" }}
          >
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

      {/* Problema */}
      <section className="border-t border-border/80">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted/70">
            El problema
          </p>
          <h2 className="mt-3 max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">
            No es que tengas mala memoria. Es que está repartida en 15 apps.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
            Anotás en Notion, prometés en WhatsApp, agendás en el calendario…
            y aun así se te escapa algo. HeyYarvis junta todo eso en un solo
            lugar al que le podés hablar.
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

      {/* Cómo funciona */}
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

      {/* Funciones */}
      <section id="por-que" className="border-t border-border/80">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted/70">
            Diferencial
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            Por qué HeyYarvis
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

      {/* Roadmap de integraciones */}
      <section className="border-t border-border/80">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted/70">
            Roadmap
          </p>
          <h2 className="mt-3 max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">
            Hacia dónde vamos
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
            Hoy HeyYarvis funciona 100% por voz, a través de Atajos de Siri
            conectados directamente a la API. El siguiente paso es conectarlo
            directo con las apps que ya usás todos los días — todavía no está
            construido, pero es el rumbo.
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
              y más...
            </span>
          </div>
        </div>
      </section>

      {/* Para quién */}
      <section className="border-t border-border/80">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted/70">
            Para quién
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            Pensado para gente ocupada
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

      {/* Privacidad */}
      <section className="border-t border-border/80">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted/70">
                Privacidad
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                Tu memoria es tuya
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
                Un producto que guarda lo que le contás tiene que ganarse tu
                confianza. Así manejamos tus datos hoy.
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
            Preguntas frecuentes
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            Lo que seguro te estás preguntando
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

      {/* CTA final */}
      <section className="border-t border-border/80">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 py-24 text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Empezá a construir tu segundo cerebro
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-muted">
            HeyYarvis está en fase de validación privada. Probalo, guardá tus
            primeros recuerdos y contanos qué te falta.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
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
      </section>
    </main>
  );
}
