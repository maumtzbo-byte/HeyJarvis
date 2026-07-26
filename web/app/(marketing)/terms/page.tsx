import type { Metadata } from "next";
import { LegalPage } from "../../components/legal-page";
import { githubUrl } from "../../content/site-content";

export const metadata: Metadata = {
  title: "Terms of Service — HeyYarvis",
  description: "The terms for using HeyYarvis during private validation.",
};

export default function TermsPage() {
  return (
    <LegalPage eyebrow="Legal" title="Terms of Service" lastUpdated="July 2026">
      <p>
        HeyYarvis is a personal project, currently in private validation
        with a small number of people testing it. By using it, you agree to
        the following, written in plain language on purpose.
      </p>

      <section>
        <h2>What HeyYarvis is</h2>
        <p>
          A voice-first personal memory tool: you tell it things through
          Siri or the dashboard, it saves and summarizes them, and answers
          when you ask. It&rsquo;s an early-stage product, not a finished
          one.
        </p>
      </section>

      <section>
        <h2>No guarantees during private validation</h2>
        <ul>
          <li>
            The service can change, break, or be discontinued at any time
            without notice — this is expected at this stage.
          </li>
          <li>
            There&rsquo;s no uptime or availability guarantee.
          </li>
          <li>
            Answers are generated with AI (via the Claude API) and can be
            wrong. Don&rsquo;t rely on HeyYarvis for anything critical
            (medical, legal, financial, or safety-related).
          </li>
        </ul>
      </section>

      <section>
        <h2>Acceptable use</h2>
        <ul>
          <li>
            Don&rsquo;t use HeyYarvis to store sensitive information about
            other people without their consent.
          </li>
          <li>
            Don&rsquo;t try to abuse, overload, or reverse engineer the
            underlying API for purposes unrelated to using the product
            yourself.
          </li>
        </ul>
      </section>

      <section>
        <h2>Your data</h2>
        <p>
          The memories you save are yours. See the{" "}
          <a href="/privacy-policy">Privacy Policy</a>{" "}
          for how they&rsquo;re stored and how to request deletion.
        </p>
      </section>

      <section>
        <h2>No warranty, limited liability</h2>
        <p>
          HeyYarvis is provided &ldquo;as is,&rdquo; with no warranties of
          any kind, during this validation phase. To the extent permitted
          by law, the person building HeyYarvis isn&rsquo;t liable for
          damages arising from your use of it.
        </p>
      </section>

      <section>
        <h2>Changes and contact</h2>
        <p>
          These terms may change as the product evolves. Questions or
          concerns can be raised by{" "}
          <a href={`${githubUrl}/issues`}>opening an issue on GitHub</a>.
        </p>
      </section>
    </LegalPage>
  );
}
