import { Reveal } from "../ui/reveal";
import { faqs } from "../../content/site-content";

export function Faq() {
  return (
    <section className="section-divider">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted/85">
            FAQ
          </p>
          <h2
            style={{ fontFamily: "var(--font-display)" }}
            className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl"
          >
            What you&rsquo;re probably <span className="italic font-light text-muted">wondering</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
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
        </Reveal>
      </div>
    </section>
  );
}
