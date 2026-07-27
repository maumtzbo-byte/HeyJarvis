"use client";

import { FormEvent, useEffect, useState } from "react";

type Memory = {
  id: string;
  text: string;
  summary: string;
  created_at: string;
};

const DEFAULT_API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

const STORAGE_KEYS = {
  apiUrl: "heyjarvis:apiUrl",
  userId: "heyjarvis:userId",
};

export default function SettingsPage() {
  const [apiUrl, setApiUrl] = useState(DEFAULT_API_URL);
  const [userId, setUserId] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [memories, setMemories] = useState<Memory[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reads stored values from the browser after mount: this can't happen in
    // the useState initializer because the initial render must match between
    // server and client to avoid a hydration mismatch.
    const storedApiUrl = window.localStorage.getItem(STORAGE_KEYS.apiUrl);
    const storedUserId = window.localStorage.getItem(STORAGE_KEYS.userId);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncs with localStorage after mount
    if (storedApiUrl) setApiUrl(storedApiUrl);
    if (storedUserId) setUserId(storedUserId);
  }, []);

  async function fetchMemories(event: FormEvent) {
    event.preventDefault();
    if (!userId.trim()) {
      setError("Enter your user_id.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${apiUrl.replace(/\/$/, "")}/memories/${encodeURIComponent(userId.trim())}`,
        {
          headers: apiKey ? { "X-API-Key": apiKey } : undefined,
        }
      );

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.detail ?? `Error ${response.status} calling the API`);
      }

      const data = await response.json();
      setMemories(data.memories ?? []);

      window.localStorage.setItem(STORAGE_KEYS.apiUrl, apiUrl);
      window.localStorage.setItem(STORAGE_KEYS.userId, userId.trim());
    } catch (err) {
      setMemories(null);
      setError(
        err instanceof Error ? err.message : "Could not connect to the HeyYarvis API."
      );
    } finally {
      setLoading(false);
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
          Memories and Ask show sample data so you can preview the product.
          Connect your real backend here to pull your actual saved memories.
        </p>
      </div>

      <form
        onSubmit={fetchMemories}
        className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6"
      >
        <div className="flex flex-col gap-1.5">
          <label htmlFor="apiUrl" className="text-sm font-medium">
            API URL
          </label>
          <input
            id="apiUrl"
            type="text"
            value={apiUrl}
            onChange={(event) => setApiUrl(event.target.value)}
            placeholder="https://your-backend.onrender.com"
            className="h-10 rounded-md border border-border bg-transparent px-3 text-sm outline-none focus:border-accent-cool/50"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="userId" className="text-sm font-medium">
            user_id
          </label>
          <input
            id="userId"
            type="text"
            value={userId}
            onChange={(event) => setUserId(event.target.value)}
            placeholder="carlos-123"
            className="h-10 rounded-md border border-border bg-transparent px-3 text-sm outline-none focus:border-accent-cool/50"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="apiKey" className="text-sm font-medium">
            API key <span className="text-muted">(optional)</span>
          </label>
          <input
            id="apiKey"
            type="password"
            value={apiKey}
            onChange={(event) => setApiKey(event.target.value)}
            placeholder="Only if the backend requires it"
            className="h-10 rounded-md border border-border bg-transparent px-3 text-sm outline-none focus:border-accent-cool/50"
            autoComplete="off"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-10 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Searching..." : "Fetch real memories"}
        </button>
      </form>

      {error && (
        <p className="rounded-md border border-red-900/60 bg-red-950/40 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      {memories && memories.length === 0 && !error && (
        <p className="text-sm text-muted">No memories saved for this user yet.</p>
      )}

      {memories && memories.length > 0 && (
        <ul className="flex flex-col gap-3">
          {memories.map((memory) => (
            <li key={memory.id} className="rounded-2xl border border-border bg-surface p-4">
              <p className="text-sm font-medium">{memory.summary}</p>
              <p className="mt-1 text-sm text-muted">{memory.text}</p>
              <p className="mt-2 text-xs text-muted/85">
                {new Date(memory.created_at).toLocaleString("en-US")}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
