"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { isSupabaseConfigured, supabase } from "../../lib/supabase-client";
import { OAuthButtons } from "../../components/auth/oauth-buttons";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkEmail, setCheckEmail] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
    });

    setLoading(false);
    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    if (data.session) {
      router.push("/onboarding");
    } else {
      // Email confirmation is required before a session exists.
      setCheckEmail(true);
    }
  }

  if (checkEmail) {
    return (
      <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-8 text-center">
        <h1
          style={{ fontFamily: "var(--font-display)" }}
          className="text-2xl font-semibold tracking-tight"
        >
          Check your email
        </h1>
        <p className="mt-3 text-sm text-muted">
          We sent a confirmation link to <span className="text-foreground">{email}</span>. Open
          it, then come back and log in.
        </p>
        <Link
          href="/login"
          className="mt-6 inline-flex h-10 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          Go to log in
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-8">
      <h1
        style={{ fontFamily: "var(--font-display)" }}
        className="text-2xl font-semibold tracking-tight"
      >
        Create your account
      </h1>
      <p className="mt-2 text-sm text-muted">
        Next you&rsquo;ll answer a few quick questions so HeyYarvis knows how to talk to you.
      </p>

      {!isSupabaseConfigured && (
        <p className="mt-4 rounded-md border border-yellow-900/60 bg-yellow-950/30 px-4 py-3 text-xs text-yellow-300">
          Accounts aren&rsquo;t configured on this deployment yet.
        </p>
      )}

      <div className="mt-6">
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
            className="h-10 rounded-md border border-border bg-transparent px-3 text-sm outline-none focus:border-accent-cool/50"
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
            minLength={6}
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-10 rounded-md border border-border bg-transparent px-3 text-sm outline-none focus:border-accent-cool/50"
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
          className="inline-flex h-10 items-center justify-center rounded-full bg-foreground text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Already have an account?{" "}
        <Link href="/login" className="text-foreground underline underline-offset-2">
          Log in
        </Link>
      </p>
    </div>
  );
}
