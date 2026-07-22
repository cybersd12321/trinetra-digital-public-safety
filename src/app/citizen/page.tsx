"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { MessagesSquare, Send, Shield } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { scamSamples } from "@/lib/data/samples";
import { shieldRespond } from "@/lib/engines/shieldAgent";
import { ChatMessage } from "@/lib/types";
import { riskColor, uid } from "@/lib/utils";

function renderContent(text: string) {
  return text.split("\n").map((line, i) => {
    if (line.startsWith("### ")) {
      return (
        <h3 key={i} className="text-amber-200 font-semibold text-sm mb-1">
          {line.replace(/^### /, "")}
        </h3>
      );
    }
    const html = line
      .replace(/\*\*(.+?)\*\*/g, '<strong class="text-amber-200 font-semibold">$1</strong>')
      .replace(/_(.+?)_/g, '<em class="text-sky-300/90">$1</em>');
    if (!line.trim()) return <div key={i} className="h-2" />;
    return (
      <p
        key={i}
        className="text-sm text-[var(--muted)] leading-relaxed"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  });
}

export default function CitizenPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const welcome = shieldRespond("hello");
    setMessages([
      {
        id: uid("m"),
        role: "assistant",
        content: welcome.content,
        riskLevel: welcome.riskLevel,
        timestamp: new Date().toISOString(),
      },
    ]);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: uid("m"),
      role: "user",
      content: trimmed,
      timestamp: new Date().toISOString(),
    };

    const reply = shieldRespond(trimmed);
    const botMsg: ChatMessage = {
      id: uid("m"),
      role: "assistant",
      content: reply.content,
      riskLevel: reply.riskLevel,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(input);
  };

  return (
    <AppShell
      title="Citizen Fraud Shield"
      subtitle="Conversational AI · instant verdicts · guided 1930 / NCRB reporting"
    >
      <div className="grid lg:grid-cols-[1fr_300px] gap-4 max-w-5xl">
        <div className="card flex flex-col h-[min(720px,calc(100vh-10rem))] overflow-hidden">
          <div className="px-4 py-3 border-b border-[var(--border)] flex items-center gap-2 bg-[var(--bg-elevated)]">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
              <MessagesSquare className="h-4 w-4 text-emerald-400" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Shield chat</div>
              <div className="text-[11px] text-[var(--faint)]">
                WhatsApp / IVR / app parity · demo web channel
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[90%] rounded-2xl px-4 py-3 ${
                    m.role === "user"
                      ? "bg-amber-500/15 border border-amber-500/30 rounded-br-md"
                      : "bg-[var(--surface-2)] border border-[var(--border)] rounded-bl-md"
                  }`}
                  style={
                    m.role === "assistant" && m.riskLevel && m.riskLevel !== "safe"
                      ? { borderColor: `${riskColor(m.riskLevel)}44` }
                      : undefined
                  }
                >
                  {m.role === "assistant" && m.riskLevel ? (
                    <div className="mb-2">
                      <RiskBadge level={m.riskLevel} />
                    </div>
                  ) : null}
                  <div className={m.role === "user" ? "text-sm text-amber-50" : ""}>
                    {m.role === "user" ? m.content : renderContent(m.content)}
                  </div>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="p-3 border-t border-[var(--border)] bg-[var(--bg-elevated)]">
            <div className="flex flex-wrap gap-1.5 mb-2">
              {(
                [
                  ["Digital arrest call", scamSamples.digitalArrest],
                  ["Bank SMS", scamSamples.safeBank],
                  ["How to report?", "How do I report on cybercrime.gov.in and 1930?"],
                ] as const
              ).map(([label, sample]) => (
                <button
                  key={label}
                  type="button"
                  className="text-[11px] px-2.5 py-1 rounded-full border border-[var(--border)] text-[var(--muted)] hover:border-amber-500/40 hover:text-amber-200 transition-colors"
                  onClick={() => send(sample)}
                >
                  {label}
                </button>
              ))}
            </div>
            <form onSubmit={onSubmit} className="flex gap-2">
              <input
                className="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste suspicious message or describe the call…"
              />
              <button type="submit" className="btn btn-primary px-4 shrink-0">
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="h-4 w-4 text-emerald-400" />
              <h2 className="font-semibold text-white">Always remember</h2>
            </div>
            <ul className="text-sm text-[var(--muted)] space-y-2">
              <li>Police / CBI / ED never demand money on video calls.</li>
              <li>Never share OTP or UPI PIN with anyone.</li>
              <li>Call <strong className="text-white">1930</strong> for financial cyber fraud.</li>
              <li>
                Report at{" "}
                <strong className="text-sky-300">cybercrime.gov.in</strong>
              </li>
            </ul>
          </div>
          <div className="card p-5">
            <h2 className="font-semibold text-white mb-2">Channels (roadmap)</h2>
            <div className="space-y-2 text-sm text-[var(--muted)]">
              <div className="flex justify-between">
                <span>WhatsApp Business</span>
                <span className="text-emerald-400 text-xs">Planned</span>
              </div>
              <div className="flex justify-between">
                <span>IVR (12 languages)</span>
                <span className="text-emerald-400 text-xs">Planned</span>
              </div>
              <div className="flex justify-between">
                <span>Mobile app</span>
                <span className="text-amber-300 text-xs">Web demo live</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
