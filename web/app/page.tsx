import Image from "next/image";
import Link from "next/link";

const steps = [
  {
    title: "Le hablás a Siri",
    description:
      '"Oye Siri, recordá que mi reunión con Carlos es el jueves." HeyJarvis guarda lo que le contás.',
  },
  {
    title: "Lo recuerda de verdad",
    description:
      "Cada recuerdo se resume y se guarda en una memoria vectorial propia, asociada solo a vos.",
  },
  {
    title: "Se lo preguntás cuando lo necesitás",
    description:
      '"Oye Siri, pregúntale a Jarvis cuándo es mi reunión con Carlos." Te responde corto y claro.',
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

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="relative flex min-h-[calc(100svh-73px)] flex-col overflow-visible">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="orb-breathe relative h-64 w-64 opacity-40 sm:h-80 sm:w-80">
            <Image
              src="/brand/hero-orb.png"
              alt=""
              fill
              sizes="320px"
              priority
              className="rounded-full object-contain"
            />
          </div>
        </div>
        <div
          aria-hidden
          className="orb-glow pointer-events-none absolute left-1/2 top-1/3 h-[480px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[110px]"
          style={{
            backgroundImage:
              "linear-gradient(to left, #6366f1, #a855f7, #fcd34d)",
          }}
        />

        <div className="relative flex flex-1 flex-col items-center justify-center px-6 text-center">
          <span className="rounded-full liquid-glass px-3 py-1 text-xs font-medium text-muted">
            Fase de validación privada
          </span>
          <h1
            style={{ fontFamily: "var(--font-display)" }}
            className="mt-6 text-[64px] font-normal leading-[1.02] tracking-[-0.024em] sm:text-[110px] lg:text-[160px]"
          >
            <span className="text-foreground">Hey </span>
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(to left, #6366f1, #a855f7, #fcd34d)",
              }}
            >
              Jarvis
            </span>
          </h1>
          <p className="mt-[9px] max-w-xs sm:max-w-md text-lg leading-8 text-muted opacity-80">
            Tu segundo cerebro, que escucha y recuerda todo lo que le contás
            por voz.
          </p>
          <div className="mt-[25px] flex flex-col gap-4 sm:flex-row">
            <Link
              href="/dashboard"
              className="inline-flex h-12 items-center justify-center rounded-full liquid-glass px-[29px] text-sm font-medium text-foreground transition-opacity hover:opacity-80"
            >
              Ver mis recuerdos
            </Link>
            <a
              href="https://github.com/maumtzbo-byte/HeyJarvis"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border px-[29px] text-sm font-medium text-foreground/90 transition-colors hover:bg-surface"
            >
              Ver el código
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-5xl px-6 pb-10">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-12">
            <p className="shrink-0 text-sm leading-tight text-foreground/50">
              Construido con
              <br />
              tecnología real
            </p>
            <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="flex w-max animate-marquee items-center gap-16">
                {marqueeStack.map((name, index) => (
                  <div key={`${name}-${index}`} className="flex items-center gap-3">
                    <span className="liquid-glass flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-semibold text-foreground">
                      {name[0]}
                    </span>
                    <span className="text-base font-semibold text-foreground whitespace-nowrap">
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="text-2xl font-semibold tracking-tight">
            Cómo funciona
          </h2>
          <ol className="mt-10 grid gap-6 sm:grid-cols-3">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-6"
              >
                <span className="text-sm font-medium text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-base font-semibold">{step.title}</h3>
                <p className="text-sm text-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="text-2xl font-semibold tracking-tight">
            Por qué HeyJarvis
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col gap-2 rounded-2xl border border-border p-6"
              >
                <h3 className="text-base font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-16 text-sm text-muted">
          <p>
            HeyJarvis está en fase de validación: por ahora se usa a través
            de Atajos de Siri conectados directamente a la API, sin
            integraciones con Gmail, WhatsApp o Notion todavía.
          </p>
        </div>
      </section>
    </main>
  );
}
