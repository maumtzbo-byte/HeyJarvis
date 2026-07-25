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

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="relative flex flex-col items-center overflow-hidden px-6 pb-24 pt-20 text-center sm:pt-28">
        <div
          aria-hidden
          className="orb-glow pointer-events-none absolute left-1/2 top-24 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-white/20 blur-[110px] sm:top-16"
        />

        <div className="orb-breathe relative h-40 w-40 sm:h-48 sm:w-48">
          <Image
            src="/brand/hero-orb.png"
            alt="HeyJarvis"
            fill
            sizes="192px"
            priority
            className="rounded-full object-contain"
          />
        </div>

        <span className="relative mt-8 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
          Fase de validación privada
        </span>
        <h1 className="relative mt-6 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Tu segundo cerebro, accesible por voz.
        </h1>
        <p className="relative mt-5 max-w-xl text-lg text-muted">
          HeyJarvis escucha lo que le contás a través de Siri, lo recuerda, y
          te lo devuelve cuando se lo preguntás. Sin apps que abrir, sin
          notas que buscar.
        </p>
        <div className="relative mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/dashboard"
            className="inline-flex h-11 items-center justify-center rounded-full bg-accent px-6 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Ver mis recuerdos
          </Link>
          <a
            href="https://github.com/maumtzbo-byte/HeyJarvis"
            className="inline-flex h-11 items-center justify-center rounded-full border border-border px-6 text-sm font-medium text-foreground transition-colors hover:bg-surface"
          >
            Ver el código
          </a>
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
