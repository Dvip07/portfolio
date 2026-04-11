"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const thinkingPhrases = [
  "Checking Jay's experience...",
  "Looking through his publications...",
  "Pulling up the details...",
  "Reviewing Jay's career highlights...",
  "Searching his credentials...",
  "Going through the data...",
];

const quickQuestions = [
  "What's Jay's current role?",
  "What industries has he worked in?",
  "Tell me about his publications",
  "What tools does he use?",
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hey there! I'm Jay's AI assistant. I know all about his 12+ years in supply chain leadership, his publications, skills, and more. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [thinkingText, setThinkingText] = useState(thinkingPhrases[0]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const thinkingInterval = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    if (loading) {
      let idx = 0;
      thinkingInterval.current = setInterval(() => {
        idx = (idx + 1) % thinkingPhrases.length;
        setThinkingText(thinkingPhrases[idx]);
      }, 2000);
    } else {
      if (thinkingInterval.current) clearInterval(thinkingInterval.current);
    }
    return () => {
      if (thinkingInterval.current) clearInterval(thinkingInterval.current);
    };
  }, [loading]);

  const send = useCallback(async (text?: string) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;

    const userMsg: Message = { role: "user", content: msg };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updated.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "Hmm, I couldn't find that. Try asking differently!" },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Oops, connection issue. Please try again in a moment!" },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages]);

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
        style={{ background: "var(--gold)", color: "var(--bg)" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={open ? "Close chat" : "Chat with Jay's assistant"}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.svg key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }} width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M6 18L18 6" />
            </motion.svg>
          ) : (
            <motion.svg key="chat" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.2 }} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Notification dot when closed */}
      {!open && (
        <motion.div
          className="fixed bottom-[4.2rem] right-6 z-50 pointer-events-none"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2, type: "spring" }}
        >
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 animate-pulse" />
        </motion.div>
      )}

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[70vh] rounded-2xl border shadow-2xl flex flex-col overflow-hidden"
            style={{ borderColor: "var(--border)", background: "var(--bg)" }}
          >
            {/* Header */}
            <div className="px-5 py-4 border-b flex items-center gap-3" style={{ borderColor: "var(--border)" }}>
              <div className="relative">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: "var(--gold)", color: "var(--bg)" }}
                >
                  JP
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2" style={{ borderColor: "var(--bg)" }} />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold" style={{ color: "var(--fg)" }}>
                  Jay&apos;s Assistant
                </div>
                <div className="text-xs" style={{ color: "var(--fg-dim)" }}>
                  {loading ? "Typing..." : "Online · Ask me anything"}
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                style={{ color: "var(--fg-dim)" }}
                aria-label="Close chat"
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4l8 8M4 12l8-8" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold mr-2 mt-1 shrink-0"
                      style={{ background: "var(--gold)", color: "var(--bg)" }}
                    >
                      JP
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "rounded-2xl rounded-br-md"
                        : "rounded-2xl rounded-bl-md"
                    }`}
                    style={
                      msg.role === "user"
                        ? { background: "var(--gold)", color: "var(--bg)" }
                        : { background: "var(--card-bg)", color: "var(--fg-muted)", border: "1px solid var(--border)" }
                    }
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {/* Thinking indicator */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold mr-2 mt-1 shrink-0"
                    style={{ background: "var(--gold)", color: "var(--bg)" }}
                  >
                    JP
                  </div>
                  <div
                    className="px-4 py-3 rounded-2xl rounded-bl-md border"
                    style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
                  >
                    <div className="flex items-center gap-2">
                      {/* Bouncing dots */}
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: "var(--gold)" }}
                            animate={{ y: [0, -4, 0] }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              delay: i * 0.15,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <motion.p
                      key={thinkingText}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs mt-1.5"
                      style={{ color: "var(--fg-dim)" }}
                    >
                      {thinkingText}
                    </motion.p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Quick questions (show when few messages) */}
            {messages.length <= 2 && !loading && (
              <div className="px-4 pb-2">
                <div className="flex gap-2 flex-wrap">
                  {quickQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="text-xs px-3 py-1.5 rounded-full border transition-colors hover:text-[var(--gold)] hover:border-[var(--gold)]"
                      style={{ borderColor: "var(--border)", color: "var(--fg-dim)" }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="px-4 py-3 border-t" style={{ borderColor: "var(--border)" }}>
              <form
                onSubmit={(e) => { e.preventDefault(); send(); }}
                className="flex gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Jay..."
                  className="flex-1 px-4 py-2.5 text-sm rounded-full border bg-transparent focus:outline-none transition-colors"
                  style={{ borderColor: "var(--border)", color: "var(--fg)" }}
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-30 transition-opacity"
                  style={{ background: "var(--gold)", color: "var(--bg)" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
