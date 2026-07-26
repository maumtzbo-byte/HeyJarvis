"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PreviewBadge } from "../components/dashboard/preview-badge";
import { mockMemories } from "./mock-data";

const GROUP_ORDER = ["Today", "Yesterday", "This week", "Last week"];

export default function DashboardPage() {
  const [query, setQuery] = useState("");

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? mockMemories.filter(
          (memory) =>
            memory.summary.toLowerCase().includes(q) ||
            memory.text.toLowerCase().includes(q)
        )
      : mockMemories;

    const map = new Map<string, typeof mockMemories>();
    for (const memory of filtered) {
      const bucket = map.get(memory.group) ?? [];
      bucket.push(memory);
      map.set(memory.group, bucket);
    }
    return GROUP_ORDER.map((label) => [label, map.get(label) ?? []] as const).filter(
      ([, items]) => items.length > 0
    );
  }, [query]);

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
          <PreviewBadge />
        </div>
        <p className="text-sm text-muted">
          Everything you&rsquo;ve told HeyYarvis, searchable by meaning — not
          just keywords.
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

      {groups.length === 0 ? (
        <p className="text-sm text-muted">
          No memories match &ldquo;{query}&rdquo;.
        </p>
      ) : (
        <div className="flex flex-col gap-8">
          {groups.map(([label, items]) => (
            <div key={label} className="flex flex-col gap-3">
              <h2 className="font-mono text-[11px] uppercase tracking-wide text-muted/70">
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
                      <span className="shrink-0 font-mono text-[10px] uppercase tracking-wide text-muted/60">
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
