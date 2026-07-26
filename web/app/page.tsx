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

        {/* Rising-planet orb: massive, anchored to the bottom edge, cut off by the section frame */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex justify-center"
        >
          <div
            className="animate-glow-pulse absolute bottom-0 h-[360px] w-[640px] -translate-y-[10%] rounded-full opacity-60 blur-[90px] sm:h-[460px] sm:w-[860px]"
            style={{
              background:
                "radial-gradient(closest-side, rgba(255,255,255,0.6), rgba(139,130,255,0.28) 55%, transparent 75%)",
            }}
          />
          <div className="relative h-[420px] w-[420px] translate-y-[42%] sm:h-[640px] sm:w-[640px] lg:h-[760px] lg:w-[760px]">
            <div className="orb-breathe absolute inset-0">
              <div className="orb-spin absolute inset-0">
                <Image
                  src="/brand/hero-orb.png"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 760px, (min-width: 640px) 640px, 420px"
                  priority
                  className="object-contain"
                />
              </div>
            </div>
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
                <span
                  className="bg-clip-text text-2xl font-semibold text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #6366f1, #a855f7, #fcd34d)",
                  }}
                >
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
            Por qué HeyJarvis
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
            HeyJarvis está en fase de validación: por ahora se usa a través
            de Atajos de Siri conectados directamente a la API, sin
            integraciones con Gmail, WhatsApp o Notion todavía.
          </p>
        </div>
      </section>
    </main>
  );
}
