export const GROUP_ORDER = ["Today", "Yesterday", "This week", "Last week", "Older"];

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function bucketLabel(createdAtISO: string, now: Date = new Date()): string {
  const created = new Date(createdAtISO);
  const diffDays = Math.round(
    (startOfDay(now).getTime() - startOfDay(created).getTime()) / 86_400_000
  );

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays <= now.getDay()) return "This week";
  if (diffDays <= now.getDay() + 7) return "Last week";
  return "Older";
}

export function formatMemoryTime(createdAtISO: string, group: string): string {
  const d = new Date(createdAtISO);
  const time = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  if (group === "Today" || group === "Yesterday") return time;
  const weekday = d.toLocaleDateString("en-US", { weekday: "short" });
  return `${weekday}, ${time}`;
}
