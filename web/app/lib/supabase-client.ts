import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// createClient throws immediately if the URL isn't well-formed, which would
// crash every page that imports this module (including at build time, where
// it takes the whole deployment down) on a deployment that hasn't set the
// Supabase env vars yet. Fall back to a harmless placeholder URL so the
// client can always be constructed; isSupabaseConfigured gates real usage.
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key"
);
