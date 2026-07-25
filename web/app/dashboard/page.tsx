"use client";

import { FormEvent, useEffect, useState } from "react";

type Memory = {
  id: string;
  text: string;
  summary: string;
  created_at: string;
};

const DEFAULT_API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

const STORAGE_KEYS = {
  apiUrl: "heyjarvis:apiUrl",
  userId: "heyjarvis:userId",
};

export default function DashboardPage() {
  const [apiUrl, setApiUrl] = useState(DEFAULT_API_URL);
  const [userId, setUserId] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [memories, setMemories] = useState<Memory[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Lee valores guardados del navegador después del montaje: no puede
    // hacerse en el initializer de useState porque el render inicial debe
    // coincidir entre servidor y cliente para evitar un hydration mismatch.
    const storedApiUrl = window.localStorage.getItem(STORAGE_KEYS.apiUrl);
    const storedUserId = window.localStorage.getItem(STORAGE_KEYS.userId);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sincroniza con localStorage tras el montaje
    if (storedApiUrl) setApiUrl(storedApiUrl);
    if (storedUserId) setUserId(storedUserId);
  }, []);

  async function fetchMemories(event: FormEvent) {
    event.preventDefault();
    if (!userId.trim()) {
      setError("Ingresá tu user_id.");
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
        throw new Error(body?.detail ?? `Error ${response.status} al consultar la API`);
      }

      const data = await response.json();
      setMemories(data.memories ?? []);

      window.localStorage.setItem(STORAGE_KEYS.apiUrl, apiUrl);
      window.localStorage.setItem(STORAGE_KEYS.userId, userId.trim());
    } catch (err) {
      setMemories(null);
      setError(
        err instanceof Error
          ? err.message
          : "No se pudo conectar con la API de HeyJarvis."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-16">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Mis recuerdos
        </h1>
        <p className="text-sm text-muted">
          Consultá los recuerdos guardados en tu cuenta de HeyJarvis.
        </p>
      </div>

      <form
        onSubmit={fetchMemories}
        className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6"
      >
        <div className="flex flex-col gap-1.5">
          <label htmlFor="apiUrl" className="text-sm font-medium">
            URL de la API
          </label>
          <input
            id="apiUrl"
            type="text"
            value={apiUrl}
            onChange={(event) => setApiUrl(event.target.value)}
            placeholder="https://tu-backend.onrender.com"
            className="h-10 rounded-md border border-border bg-transparent px-3 text-sm outline-none focus:border-accent"
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
            className="h-10 rounded-md border border-border bg-transparent px-3 text-sm outline-none focus:border-accent"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="apiKey" className="text-sm font-medium">
            API key <span className="text-muted">(opcional)</span>
          </label>
          <input
            id="apiKey"
            type="password"
            value={apiKey}
            onChange={(event) => setApiKey(event.target.value)}
            placeholder="Solo si el backend la exige"
            className="h-10 rounded-md border border-border bg-transparent px-3 text-sm outline-none focus:border-accent"
            autoComplete="off"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-10 items-center justify-center rounded-full bg-accent px-6 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Buscando..." : "Ver recuerdos"}
        </button>
      </form>

      {error && (
        <p className="rounded-md border border-red-900/60 bg-red-950/40 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      {memories && memories.length === 0 && !error && (
        <p className="text-sm text-muted">
          Todavía no hay recuerdos guardados para este usuario.
        </p>
      )}

      {memories && memories.length > 0 && (
        <ul className="flex flex-col gap-3">
          {memories.map((memory) => (
            <li
              key={memory.id}
              className="rounded-2xl border border-border bg-surface p-4"
            >
              <p className="text-sm font-medium">{memory.summary}</p>
              <p className="mt-1 text-sm text-muted">{memory.text}</p>
              <p className="mt-2 text-xs text-muted/70">
                {new Date(memory.created_at).toLocaleString("es-AR")}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
