"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { PreviewBadge } from "../../components/dashboard/preview-badge";
import { mockConversationStarter, type MockChatMessage } from "../mock-data";

const CANNED_RESPONSE =
  "This is a preview with sample data. In the real app, HeyYarvis would search your memories and answer with Claude — connect a real backend in Settings to try it live.";

export default function AskPage() {
  const [messages, setMessages] = useState<MockChatMessage[]>(mockConversationStarter);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, thinking]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setInput("");
    setThinking(true);

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", text: CANNED_RESPONSE }]);
      setThinking(false);
    }, 900);
  }

  return (
    <div className="mx-auto flex min-h-[75vh] max-w-3xl flex-col px-6 py-10 sm:py-16">
      <div className="flex items-center gap-3">
        <h1
          style={{ fontFamily: "var(--font-display)" }}
          className="text-2xl font-semibold tracking-tight"
        >
          Ask
        </h1>
        <PreviewBadge />
      </div>
      <p className="mt-2 text-sm text-muted">
        Ask about anything you&rsquo;ve told HeyYarvis, the same way you would with Siri.
      </p>

      <div className="mt-8 flex flex-1 flex-col gap-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              message.role === "user"
                ? "ml-auto max-w-[85%] rounded-2xl rounded-br-sm border border-border bg-surface px-4 py-3"
                : "mr-auto max-w-[85%] rounded-2xl rounded-bl-sm border border-accent-cool/25 bg-accent-cool/[0.06] px-4 py-3"
            }
          >
            <p className="text-sm leading-relaxed text-foreground/90">{message.text}</p>
            {message.memoriesUsed && (
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {message.memoriesUsed.map((used) => (
                  <span
                    key={used}
                    className="rounded-full border border-border px-2.5 py-0.5 text-[10px] text-muted"
                  >
                    {used}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}

        {thinking && (
          <div className="mr-auto flex items-center gap-1.5 rounded-2xl rounded-bl-sm border border-accent-cool/25 bg-accent-cool/[0.06] px-4 py-3.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-cool" />
            <span
              className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-cool"
              style={{ animationDelay: "150ms" }}
            />
            <span
              className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-cool"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        )}
        <div ref={endRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="sticky bottom-24 mt-6 flex items-center gap-2 rounded-full border border-border bg-surface p-1.5 sm:bottom-6"
      >
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask something..."
          className="h-9 flex-1 bg-transparent px-3 text-sm outline-none"
        />
        <button
          type="submit"
          aria-label="Send"
          disabled={!input.trim()}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-foreground text-background transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          <Send className="h-4 w-4" strokeWidth={1.75} />
        </button>
      </form>
    </div>
  );
}
