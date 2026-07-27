"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase-client";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.57-5.17 3.57-8.82Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.88-3c-1.08.72-2.46 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.95H1.26v3.11A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29a7.2 7.2 0 0 1 0-4.58V6.6H1.26a12 12 0 0 0 0 10.8l4.01-3.11Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.76 0 3.34.6 4.58 1.79l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.26 6.6l4.01 3.11C6.22 6.86 8.87 4.75 12 4.75Z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
      <path d="M16.36 1.43c0 1.14-.42 2.2-1.14 3-.81.94-2.15 1.66-3.26 1.57-.14-1.1.4-2.26 1.1-3 .81-.9 2.24-1.6 3.3-1.57ZM20.5 17.2c-.55 1.27-.82 1.83-1.53 2.95-.99 1.55-2.4 3.48-4.14 3.5-1.55.02-1.94-1-4.03-1s-2.53.98-4.06 1c-1.73.02-3.05-1.75-4.04-3.3C.5 16.85-.16 12.1 1.32 8.75c.94-2.13 2.7-3.44 4.55-3.47 1.53-.03 2.98 1.03 3.92 1.03.94 0 2.7-1.27 4.55-1.08.78.03 2.97.31 4.37 2.36-.11.07-2.6 1.52-2.58 4.55.03 3.61 3.17 4.81 3.37 4.86-.03.09-.53 1.8-1.98 3.5" />
    </svg>
  );
}

export function OAuthButtons() {
  const [loadingProvider, setLoadingProvider] = useState<"google" | "apple" | null>(null);

  async function handleOAuth(provider: "google" | "apple") {
    setLoadingProvider(provider);
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
  }

  return (
    <div className="flex flex-col gap-2.5">
      <button
        type="button"
        onClick={() => handleOAuth("google")}
        disabled={loadingProvider !== null}
        className="btn-secondary inline-flex h-11 items-center justify-center gap-2.5 rounded-full border border-border bg-background/40 text-sm font-medium disabled:opacity-50"
      >
        <GoogleIcon />
        {loadingProvider === "google" ? "Redirecting..." : "Continue with Google"}
      </button>
      <button
        type="button"
        onClick={() => handleOAuth("apple")}
        disabled={loadingProvider !== null}
        className="btn-secondary inline-flex h-11 items-center justify-center gap-2.5 rounded-full border border-border bg-background/40 text-sm font-medium disabled:opacity-50"
      >
        <AppleIcon />
        {loadingProvider === "apple" ? "Redirecting..." : "Continue with Apple"}
      </button>
    </div>
  );
}
