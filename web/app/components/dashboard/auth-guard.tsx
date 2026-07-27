"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase-client";

const DEFAULT_API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

function getApiUrl() {
  if (typeof window === "undefined") return DEFAULT_API_URL;
  return window.localStorage.getItem("heyjarvis:apiUrl") || DEFAULT_API_URL;
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const checked = useRef(false);

  useEffect(() => {
    async function checkSession(accessToken: string | undefined) {
      if (!accessToken) {
        router.replace("/login");
        return;
      }
      try {
        const response = await fetch(`${getApiUrl().replace(/\/$/, "")}/profile`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (response.ok) {
          const profile = await response.json();
          if (!profile.onboarding_completed) {
            router.replace("/onboarding");
            return;
          }
        }
      } catch {
        // Backend unreachable: still let a signed-in user through rather than
        // blocking the whole dashboard on a network hiccup.
      }
      setReady(true);
    }

    supabase.auth.getSession().then(({ data }) => {
      checked.current = true;
      checkSession(data.session?.access_token);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
      if (!checked.current) return;
      if (event === "SIGNED_OUT" || !session) {
        router.replace("/login");
      }
    });
    return () => subscription.subscription.unsubscribe();
  }, [router]);

  if (!ready) {
    return (
      <div className="flex flex-1 items-center justify-center px-6 py-24">
        <p className="text-sm text-muted">Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
}
