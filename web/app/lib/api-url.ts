const DEFAULT_API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
const API_URL_STORAGE_KEY = "heyjarvis:apiUrl";

export function getApiUrl(): string {
  if (typeof window === "undefined") return DEFAULT_API_URL;
  return window.localStorage.getItem(API_URL_STORAGE_KEY) || DEFAULT_API_URL;
}

/** Joins a base API URL with a path, stripping exactly one trailing slash
 * from the base so callers never end up with `//profile`. `base` defaults
 * to `getApiUrl()`, but callers with their own base (e.g. an editable form
 * field) can pass one explicitly. */
export function buildApiUrl(path: string, base: string = getApiUrl()): string {
  return `${base.replace(/\/$/, "")}${path}`;
}

export { API_URL_STORAGE_KEY, DEFAULT_API_URL };
