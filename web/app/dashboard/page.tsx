"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PreviewBadge } from "../components/dashboard/preview-badge";
import { buildApiUrl } from "../lib/api-url";
import { bucketLabel, formatMemoryTime, GROUP_ORDER } from "../lib/memory-grouping";
import { useProfileName } from "../lib/use-profile-name";
import { supabase } from "../lib/supabase-client";
import { mockMemories, type MockMemory } from "./mock-data";

type RealMemory = {
  id: string;
  text: string;
  summary: string;
  created_at: string;
  reminder_at: string | null;
};

export default function DashboardPage() {
  const [query, setQuery] = useState("");
  const name = useProfileName();

  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);
  const [realMemories, setRealMemories] = useState<RealMemory[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) {
        if (!cancelled) {
          setUsingFallback(true);
          setLoading(false);
        }
        return;
      }
      try {
        const response = await fetch(buildApiUrl(`/memories/${data.session.user.id}`), {
          headers: { Authorization: `Bearer ${data.session.access_token}` },
        });
        if (!response.ok) throw new Error(`Error ${response.status}`);
        const body = await response.json();
        if (!cancelled) {
          setRealMemories(body.memories ?? []);
          setUsingFallback(false);
        }
      } catch {
        if (!cancelled) {
          setRealMemories(null);
          setUsingFallback(true);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const displayMemories: MockMemory[] = useMemo(() => {
    if (usingFallback || !realMemories) return mockMemories;
    return realMemories.map((memory) => {
      const group = bucketLabel(memory.created_at);
      return {
        id: memory.id,
        summary: memory.summary,
        text: memory.text,
        group,
        time: formatMemoryTime(memory.created_at, group),
      };
    });
  }, [usingFallback, realMemories]);

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? displayMemories.filter(
          (memory) =>
            memory.summary.toLowerCase().includes(q) ||
            memory.text.toLowerCase().includes(q)
        )
      : displayMemories;

    const map = new Map<string, typeof displayMemories>();
    for (const memory of filtered) {
      const bucket = map.get(memory.group) ?? [];
      bucket.push(memory);
      map.set(memory.group, bucket);
    }
    return GROUP_ORDER.map((label) => [label, map.get(label) ?? []] as const).filter(
      ([, items]) => items.length > 0
    );
  }, [query, displayMemories]);

  const isRealAndEmpty = !usingFallback && !loading && displayMemories.length === 0;

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8 px-6 py-10 sm:py-16">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1
            style={{ fontFamily: "var(--font-display)" }}
            className="text-2xl font-semibold tracking-tight"
          >
            Memories
          </h1>
          {usingFallback && <PreviewBadge />}
        </div>
        <p className="text-sm text-muted">
          {name ? `Hey ${name} — e` : "E"}verything you&rsquo;ve told HeyYarvis, searchable by
          meaning — not just keywords.
        </p>
      </div>

      <div className="relative">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
          strokeWidth={1.75}
        />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search your memories..."
          className="h-11 w-full rounded-full border border-border bg-surface pl-11 pr-4 text-sm outline-none transition-colors focus:border-accent-cool/50"
        />
      </div>

      {loading ? (
        <p className="text-sm text-muted">Loading...</p>
      ) : isRealAndEmpty ? (
        <p className="text-sm text-muted">
          Nothing yet — try saying{" "}
          <span className="text-foreground">&ldquo;Hey Siri, remember...&rdquo;</span> and
          it&rsquo;ll show up here.
        </p>
      ) : groups.length === 0 ? (
        <p className="text-sm text-muted">
          No memories match &ldquo;{query}&rdquo;.
        </p>
      ) : (
        <div className="flex flex-col gap-8">
          {groups.map(([label, items]) => (
            <div key={label} className="flex flex-col gap-3">
              <h2 className="font-mono text-[11px] uppercase tracking-wide text-muted/85">
                {label}
              </h2>
              <ul className="flex flex-col gap-2.5">
                {items.map((memory) => (
                  <li
                    key={memory.id}
                    className="card-hover-cool rounded-2xl border border-border bg-surface p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-sm font-medium">{memory.summary}</p>
                      <span className="shrink-0 font-mono text-[10px] uppercase tracking-wide text-muted/80">
                        {memory.time}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {memory.text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
