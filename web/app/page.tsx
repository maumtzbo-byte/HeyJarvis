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
      <section className="mx-auto flex w-full max-w-5xl flex-col items-start gap-6 px-6 py-24 sm:py-32">
        <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
          Fase de validación privada
        </span>
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Tu segundo cerebro, accesible por voz.
        </h1>
        <p className="max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
          HeyJarvis escucha lo que le contás a través de Siri, lo recuerda, y
          te lo devuelve cuando se lo preguntás. Sin apps que abrir, sin
          notas que buscar.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/dashboard"
            className="inline-flex h-11 items-center justify-center rounded-full bg-accent px-6 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            Ver mis recuerdos
          </Link>
          <a
            href="https://github.com/maumtzbo-byte/HeyJarvis"
            className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-300 px-6 text-sm font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
          >
            Ver el código
          </a>
        </div>
      </section>

      <section
        id="como-funciona"
        className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950"
      >
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="text-2xl font-semibold tracking-tight">
            Cómo funciona
          </h2>
          <ol className="mt-10 grid gap-8 sm:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="flex flex-col gap-2">
                <span className="text-sm font-medium text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-base font-semibold">{step.title}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 py-20">
        <h2 className="text-2xl font-semibold tracking-tight">
          Por qué HeyJarvis
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col gap-2">
              <h3 className="text-base font-semibold">{feature.title}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-5xl px-6 py-16 text-sm text-zinc-500">
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
