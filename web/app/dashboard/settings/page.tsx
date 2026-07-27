"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Session } from "@supabase/supabase-js";
import { API_URL_STORAGE_KEY, buildApiUrl, DEFAULT_API_URL } from "../../lib/api-url";
import { isSupabaseConfigured, supabase } from "../../lib/supabase-client";

type PersonalToken = {
  id: string;
  label: string;
  token_prefix: string;
  created_at: string;
  last_used_at: string | null;
  revoked_at: string | null;
};

export default function SettingsPage() {
  const [apiUrl, setApiUrl] = useState(DEFAULT_API_URL);
  const [session, setSession] = useState<Session | null>(null);

  const [tokens, setTokens] = useState<PersonalToken[]>([]);
  const [newRawToken, setNewRawToken] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [tokenError, setTokenError] = useState<string | null>(null);

  useEffect(() => {
    // Reads the stored API URL after mount: this can't happen in the
    // useState initializer because the initial render must match between
    // server and client to avoid a hydration mismatch.
    const storedApiUrl = window.localStorage.getItem(API_URL_STORAGE_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncs with localStorage after mount
    if (storedApiUrl) setApiUrl(storedApiUrl);
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session) fetchTokens(data.session.access_token);
    });
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });
    return () => subscription.subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchTokens(accessToken: string) {
    try {
      const response = await fetch(buildApiUrl("/profile/tokens", apiUrl), {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!response.ok) return;
      setTokens(await response.json());
    } catch {
      // Backend unreachable: leave the list empty, not a big deal.
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  async function handleGenerateToken() {
    if (!session) return;
    setGenerating(true);
    setTokenError(null);
    try {
      const response = await fetch(buildApiUrl("/profile/tokens", apiUrl), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ label: "iOS app" }),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.detail ?? `Error ${response.status} generating the token`);
      }
      const data = await response.json();
      setNewRawToken(data.raw_token);
      await fetchTokens(session.access_token);
    } catch (err) {
      setTokenError(
        err instanceof Error ? err.message : "Could not generate a token."
      );
    } finally {
      setGenerating(false);
    }
  }

  async function handleRevoke(tokenId: string) {
    if (!session) return;
    setTokenError(null);
    try {
      const response = await fetch(buildApiUrl(`/profile/tokens/${tokenId}`, apiUrl), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (!response.ok && response.status !== 404) {
        throw new Error(`Error ${response.status} revoking the token`);
      }
      await fetchTokens(session.access_token);
    } catch (err) {
      setTokenError(
        err instanceof Error ? err.message : "Could not revoke the token."
      );
    }
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8 px-6 py-10 sm:py-16">
      <div className="flex flex-col gap-2">
        <h1
          style={{ fontFamily: "var(--font-display)" }}
          className="text-2xl font-semibold tracking-tight"
        >
          Settings
        </h1>
        <p className="text-sm text-muted">
          Your account is connected automatically. Generate a personal API
          token below to use HeyYarvis from Siri on iOS.
        </p>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-6">
        <h2 className="text-sm font-medium">Account</h2>
        {session ? (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm">Signed in as {session.user.email}</p>
              <p className="mt-1 text-xs text-muted">
                Your tone and personality preferences shape how HeyYarvis answers you.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/onboarding"
                className="rounded-full border border-border px-4 py-2 text-xs font-medium transition-colors hover:border-accent-cool/50"
              >
                Edit preferences
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="text-xs text-muted transition-colors hover:text-foreground"
              >
                Log out
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted">
              Create an account to set the tone and personality HeyYarvis uses when it answers you.
            </p>
            <Link
              href="/signup"
              className="rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background transition-opacity hover:opacity-90"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1.5 rounded-2xl border border-border bg-surface p-6">
        <label htmlFor="apiUrl" className="text-sm font-medium">
          API URL
        </label>
        <p className="text-xs text-muted">
          Only change this if you&rsquo;re pointing the dashboard at a local or custom backend.
        </p>
        <input
          id="apiUrl"
          type="text"
          value={apiUrl}
          onChange={(event) => {
            setApiUrl(event.target.value);
            window.localStorage.setItem(API_URL_STORAGE_KEY, event.target.value);
          }}
          placeholder="https://your-backend.onrender.com"
          className="mt-2 h-10 rounded-md border border-border bg-transparent px-3 text-sm outline-none focus:border-accent-cool/50"
        />
      </div>

      {session && (
        <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-sm font-medium">Personal API token</h2>
          <p className="text-xs text-muted">
            Paste this into the HeyYarvis iOS app&rsquo;s Settings → API key field so Siri
            shortcuts can read and save your memories.
          </p>

          {newRawToken && (
            <div className="rounded-md border border-accent-cool/30 bg-accent-cool/[0.06] p-3">
              <p className="break-all font-mono text-xs">{newRawToken}</p>
              <p className="mt-1 text-[11px] text-muted">
                Copy this now — you won&rsquo;t be able to see it again.
              </p>
            </div>
          )}

          {tokenError && (
            <p className="rounded-md border border-red-900/60 bg-red-950/40 px-4 py-3 text-sm text-red-300">
              {tokenError}
            </p>
          )}

          <button
            type="button"
            onClick={handleGenerateToken}
            disabled={generating}
            className="inline-flex h-10 w-fit items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {generating ? "Generating..." : "Generate new token"}
          </button>

          {tokens.length > 0 && (
            <ul className="mt-2 flex flex-col gap-2">
              {tokens.map((token) => (
                <li
                  key={token.id}
                  className="flex items-center justify-between gap-3 text-xs text-muted"
                >
                  <span>
                    {token.label} · …{token.token_prefix.slice(-6)} · created{" "}
                    {new Date(token.created_at).toLocaleDateString("en-US")}
                    {token.revoked_at && " · revoked"}
                  </span>
                  {!token.revoked_at && (
                    <button
                      type="button"
                      onClick={() => handleRevoke(token.id)}
                      className="shrink-0 text-red-400 transition-colors hover:text-red-300"
                    >
                      Revoke
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
