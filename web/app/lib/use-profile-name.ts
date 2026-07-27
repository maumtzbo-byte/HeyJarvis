"use client";

import { useEffect, useState } from "react";
import { buildApiUrl } from "./api-url";
import { supabase } from "./supabase-client";

export function useProfileName(): string | null {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) return;
      try {
        const response = await fetch(buildApiUrl("/profile"), {
          headers: { Authorization: `Bearer ${data.session.access_token}` },
        });
        if (!response.ok) return;
        const profile = await response.json();
        if (!cancelled && profile.full_name) {
          setName(String(profile.full_name).trim().split(/\s+/)[0] || null);
        }
      } catch {
        // Backend unreachable: no greeting, no big deal.
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return name;
}
