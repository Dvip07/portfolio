"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/resume";
import SectionReveal from "@/components/SectionReveal";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      // Replace YOUR_FORM_ID with your actual Formspree form ID
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <section className="pt-32 pb-10 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm uppercase tracking-[0.3em] mb-4"
            style={{ color: "var(--gold)" }}
          >
            Connect
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg"
            style={{ color: "var(--fg-dim)" }}
          >
            Open to speaking engagements, advisory roles, research
            collaborations, and strategic partnerships. Or use the chat
            assistant in the bottom-right corner to ask anything about me.
          </motion.p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
          {/* Contact Form */}
          <SectionReveal>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm mb-2" style={{ color: "var(--fg-dim)" }}>
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-4 py-3 border rounded-xl bg-transparent focus:outline-none transition-colors"
                  style={{ borderColor: "var(--border)", color: "var(--fg)" }}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm mb-2" style={{ color: "var(--fg-dim)" }}>
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-3 border rounded-xl bg-transparent focus:outline-none transition-colors"
                  style={{ borderColor: "var(--border)", color: "var(--fg)" }}
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm mb-2" style={{ color: "var(--fg-dim)" }}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full px-4 py-3 border rounded-xl bg-transparent focus:outline-none transition-colors resize-none"
                  style={{ borderColor: "var(--border)", color: "var(--fg)" }}
                  placeholder="How can we collaborate?"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-3 font-medium rounded-full transition-colors disabled:opacity-50"
                style={{ background: "var(--gold)", color: "var(--bg)" }}
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>

              {status === "sent" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-center"
                  style={{ color: "var(--gold)" }}
                >
                  Message sent! Jay will get back to you soon.
                </motion.p>
              )}
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-center text-red-400"
                >
                  Something went wrong. Please try again or email directly.
                </motion.p>
              )}
            </form>
          </SectionReveal>

          {/* Contact Info */}
          <SectionReveal delay={0.2}>
            <div className="space-y-10">
              <div>
                <h3 className="text-sm uppercase tracking-[0.3em] mb-4" style={{ color: "var(--gold)" }}>
                  Email
                </h3>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-lg transition-colors hover:text-[var(--gold)]"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {siteConfig.email}
                </a>
              </div>
              <div>
                <h3 className="text-sm uppercase tracking-[0.3em] mb-4" style={{ color: "var(--gold)" }}>
                  Phone
                </h3>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="text-lg transition-colors hover:text-[var(--gold)]"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {siteConfig.phone}
                </a>
              </div>
              <div>
                <h3 className="text-sm uppercase tracking-[0.3em] mb-4" style={{ color: "var(--gold)" }}>
                  LinkedIn
                </h3>
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg transition-colors hover:text-[var(--gold)]"
                  style={{ color: "var(--fg-muted)" }}
                >
                  Connect on LinkedIn →
                </a>
              </div>
              <div
                className="p-6 border rounded-2xl"
                style={{ borderColor: "var(--border-hover)", background: "var(--gold-subtle)" }}
              >
                <div className="text-sm uppercase tracking-wider mb-2" style={{ color: "var(--gold)" }}>
                  Forbes Business Council
                </div>
                <p className="text-sm" style={{ color: "var(--fg-dim)" }}>
                  Member since 2023. Contributing author on supply chain
                  innovation and digital transformation.
                </p>
              </div>
              <div
                className="p-6 border rounded-2xl"
                style={{ borderColor: "var(--border)", background: "var(--card-bg)" }}
              >
                <div className="text-sm uppercase tracking-wider mb-2" style={{ color: "var(--gold)" }}>
                  💬 AI Assistant
                </div>
                <p className="text-sm" style={{ color: "var(--fg-dim)" }}>
                  Click the chat icon in the bottom-right corner to ask my AI
                  assistant anything about my background, skills, or experience.
                </p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
