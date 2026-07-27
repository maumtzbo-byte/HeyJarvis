"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { isSupabaseConfigured, supabase } from "../../lib/supabase-client";
import { OAuthButtons } from "../../components/auth/oauth-buttons";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setLoading(false);
    if (signInError) {
      setError(signInError.message);
      return;
    }
    router.push("/dashboard");
  }

  return (
    <div className="liquid-glass w-full max-w-sm rounded-[2rem] border border-white/10 bg-surface/70 p-8 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)] sm:p-10">
      <h1
        style={{ fontFamily: "var(--font-display)" }}
        className="text-3xl font-semibold tracking-tight"
      >
        Welcome back
      </h1>
      <p className="mt-2 text-sm text-muted">Log in to HeyYarvis.</p>

      {!isSupabaseConfigured && (
        <p className="mt-4 rounded-md border border-yellow-900/60 bg-yellow-950/30 px-4 py-3 text-xs text-yellow-300">
          Accounts aren&rsquo;t configured on this deployment yet.
        </p>
      )}

      <div className="mt-7">
        <OAuthButtons />
      </div>

      <div className="my-6 flex items-center gap-3 text-xs text-muted">
        <span className="h-px flex-1 bg-border" />
        or
        <span className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-11 rounded-xl border border-border bg-background/40 px-3.5 text-sm outline-none transition-colors focus:border-accent-cool/50"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-11 rounded-xl border border-border bg-background/40 px-3.5 text-sm outline-none transition-colors focus:border-accent-cool/50"
          />
        </div>

        {error && (
          <p className="rounded-md border border-red-900/60 bg-red-950/40 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading || !isSupabaseConfigured}
          className="btn-primary mt-1 inline-flex h-11 items-center justify-center rounded-full text-sm font-medium disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>

      <p className="mt-7 text-center text-sm text-muted">
        No account yet?{" "}
        <Link href="/signup" className="text-foreground underline underline-offset-2">
          Sign up
        </Link>
      </p>
    </div>
  );
}
