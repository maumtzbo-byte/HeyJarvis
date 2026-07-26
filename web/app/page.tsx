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
      <section className="relative flex min-h-[calc(100svh-73px)] flex-col overflow-visible">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[27%] -translate-x-1/2 -translate-y-1/2 opacity-70"
        >
          <div className="orb-glow-white" />
          <div className="orb-breathe relative h-40 w-40 sm:h-52 sm:w-52">
            <div className="orb-spin absolute inset-0">
              <Image
                src="/brand/hero-orb.png"
                alt=""
                fill
                sizes="208px"
                priority
                className="object-contain"
              />
            </div>
          </div>
        </div>

        <div className="relative flex flex-1 flex-col items-center justify-center px-6 text-center">
          <span
            className="animate-fade-up rounded-full liquid-glass bg-background/60 px-3 py-1 text-xs font-medium text-muted"
            style={{ animationDelay: "0ms" }}
          >
            Fase de validación privada
          </span>
          <h1
            style={{ fontFamily: "var(--font-display)", animationDelay: "80ms" }}
            className="animate-fade-up mt-6 text-[64px] font-normal leading-[1.02] tracking-[-0.024em] sm:text-[110px] lg:text-[160px]"
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
            className="animate-fade-up mt-[9px] max-w-xs sm:max-w-md text-lg leading-8 text-muted opacity-80"
            style={{ animationDelay: "160ms" }}
          >
            Tu segundo cerebro, que escucha y recuerda todo lo que le contás
            por voz.
          </p>
          <div
            className="animate-fade-up mt-[25px] flex flex-col gap-4 sm:flex-row"
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

        <div className="relative mx-auto w-full max-w-5xl px-6 pb-10">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-12">
            <p className="shrink-0 text-sm leading-tight text-foreground/50">
              Construido con
              <br />
              tecnología real
            </p>
            <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="flex w-max animate-marquee items-center gap-10">
                {marqueeStack.map((name, index) => (
                  <div key={`${name}-${index}`} className="flex items-center gap-10">
                    <span className="text-base font-medium text-foreground/60 whitespace-nowrap transition-colors hover:text-foreground">
                      {name}
                    </span>
                    <span className="h-1 w-1 shrink-0 rounded-full bg-foreground/20" />
                  </div>
                ))}
              </div>
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
