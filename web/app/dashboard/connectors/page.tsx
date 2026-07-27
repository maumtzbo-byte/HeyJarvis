"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Link2,
  FileText,
  MessageSquare,
  Mail,
  CalendarDays,
  MessageCircle,
  Cloud,
  CheckSquare,
  KanbanSquare,
  ListTodo,
  Workflow,
  Send,
  Inbox,
  MapPin,
  Zap,
  Briefcase,
  GraduationCap,
  BookOpen,
  Activity,
  HeartPulse,
  Landmark,
  Car,
  Navigation,
  Box,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react";
import { roadmapPhases } from "../../content/site-content";

const phasesWithApps = roadmapPhases.filter(
  (phase): phase is typeof phase & { apps: string[] } => Boolean(phase.apps?.length)
);

const APP_ICONS: Record<string, LucideIcon> = {
  Notion: FileText,
  Slack: MessageSquare,
  Gmail: Mail,
  Calendar: CalendarDays,
  WhatsApp: MessageCircle,
  Drive: Cloud,
  Todoist: CheckSquare,
  Trello: KanbanSquare,
  Asana: ListTodo,
  ClickUp: Workflow,
  Telegram: Send,
  Outlook: Inbox,
  Maps: MapPin,
  Zapier: Zap,
  LinkedIn: Briefcase,
  "Google Classroom": GraduationCap,
  Canvas: BookOpen,
  Whoop: Activity,
  "Apple Health": HeartPulse,
  Plaid: Landmark,
  Uber: Car,
  Lyft: Navigation,
  Dropbox: Box,
  Make: Workflow,
  Amazon: ShoppingCart,
};

export default function ConnectorsPage() {
  const [query, setQuery] = useState("");

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    return phasesWithApps
      .map((phase) => ({
        ...phase,
        apps: q ? phase.apps.filter((app) => app.toLowerCase().includes(q)) : phase.apps,
      }))
      .filter((phase) => phase.apps.length > 0);
  }, [query]);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8 px-6 py-10 sm:py-16">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1
            style={{ fontFamily: "var(--font-display)" }}
            className="text-2xl font-semibold tracking-tight"
          >
            Connectors
          </h1>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-muted">
            Coming soon
          </span>
        </div>
        <p className="text-sm text-muted">
          Direct connections to the tools you already use. None of these are
          live yet — the current focus is making voice memory work
          perfectly first. This is a preview of what&rsquo;s planned.
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
          placeholder="Search connectors..."
          className="h-11 w-full rounded-full border border-border bg-surface pl-11 pr-4 text-sm outline-none transition-colors focus:border-accent-cool/50"
        />
      </div>

      {groups.length === 0 ? (
        <p className="text-sm text-muted">
          No connectors match &ldquo;{query}&rdquo;.
        </p>
      ) : (
        <div className="flex flex-col gap-8">
          {groups.map((phase) => (
            <div key={phase.label} className="flex flex-col gap-3">
              <h2 className="font-mono text-[11px] uppercase tracking-wide text-muted/85">
                {phase.label}
              </h2>
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {phase.apps.map((app) => {
                  const AppIcon = APP_ICONS[app] ?? Link2;
                  return (
                  <li
                    key={app}
                    className="card-hover-cool flex items-center justify-between gap-3 rounded-2xl border border-border bg-surface p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-accent-cool/15 to-transparent ring-1 ring-accent-cool/20">
                        <AppIcon className="h-4 w-4 text-accent-cool" strokeWidth={1.75} />
                      </div>
                      <span className="text-sm font-medium">{app}</span>
                    </div>
                    <button
                      type="button"
                      disabled
                      className="shrink-0 cursor-not-allowed rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted/80"
                    >
                      Connect
                    </button>
                  </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
