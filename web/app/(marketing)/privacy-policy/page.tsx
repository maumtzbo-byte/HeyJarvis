import type { Metadata } from "next";
import { LegalPage } from "../../components/legal-page";
import { githubUrl } from "../../content/site-content";

export const metadata: Metadata = {
  title: "Privacy Policy — HeyYarvis",
  description: "How HeyYarvis handles the memories you save.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      lastUpdated="July 2026"
    >
      <p>
        HeyYarvis is a personal project currently in private validation —
        there is no company behind it yet, just one person building in
        public. This policy is a plain-language, good-faith description of
        how your data is handled today. It isn&rsquo;t formal legal advice,
        and it will be replaced with a proper policy before any public
        launch.
      </p>

      <section>
        <h2>What we store</h2>
        <ul>
          <li>
            The text of the memories you save (what you tell HeyYarvis
            through Siri or the dashboard).
          </li>
          <li>
            A short summary of each memory, generated to make it easier to
            search and speak back to you.
          </li>
          <li>
            A user identifier used to keep your memories separate from
            everyone else&rsquo;s. We don&rsquo;t require your name, email,
            or any other personal profile information to use the voice
            memory feature.
          </li>
        </ul>
      </section>

      <section>
        <h2>How it&rsquo;s stored</h2>
        <p>
          Structured records live in a Supabase (PostgreSQL) database with
          encryption at rest. A summary of each memory is also stored as a
          vector embedding in ChromaDB, so HeyYarvis can find relevant
          memories by meaning rather than exact keywords.
        </p>
      </section>

      <section>
        <h2>Third parties involved in processing</h2>
        <ul>
          <li>
            <strong className="text-foreground">Anthropic (Claude API)</strong>{" "}
            — used to summarize what you save and to generate spoken
            answers to your questions.
          </li>
          <li>
            <strong className="text-foreground">Supabase</strong> — hosts
            the database.
          </li>
          <li>
            <strong className="text-foreground">Vercel</strong> — hosts this
            website.
          </li>
        </ul>
        <p className="mt-3">
          Your memories are never shared with other users, sold, or used to
          train third-party models.
        </p>
      </section>

      <section>
        <h2>Deleting your data</h2>
        <p>
          There isn&rsquo;t a self-serve delete button in the product yet.
          Until there is, you can request deletion of your memories at any
          time by{" "}
          <a href={`${githubUrl}/issues`}>opening an issue on GitHub</a>
          {" — "}that&rsquo;s also the fastest way to reach the person
          building this.
        </p>
      </section>

      <section>
        <h2>Changes</h2>
        <p>
          Since HeyYarvis is still an early, single-developer project, this
          policy may change as the product evolves. Meaningful changes will
          be reflected on this page.
        </p>
      </section>
    </LegalPage>
  );
}
