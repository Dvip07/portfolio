"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionReveal from "@/components/SectionReveal";
import { publications, reviewerRoles, type PublicationType } from "@/data/publications";

const tabs: { label: string; value: PublicationType | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Research Papers", value: "research" },
  { label: "Media Articles", value: "article" },
  { label: "Conference Talks", value: "conference" },
];

export default function PublicationsPage() {
  const [activeTab, setActiveTab] = useState<PublicationType | "all">("all");
  const filtered = activeTab === "all" ? publications : publications.filter((p) => p.type === activeTab);

  return (
    <>
      <section className="pt-32 pb-10 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-sm uppercase tracking-[0.3em] mb-4" style={{ color: "var(--gold)" }}>
            Thought Leadership
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-bold tracking-tight">
            Publications & Speaking
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-4 text-lg" style={{ color: "var(--fg-dim)" }}>
            16 research papers, 11 media articles, and conference presentations on digital supply chain transformation.
          </motion.p>
        </div>
      </section>

      <section className="px-6">
        <div className="max-w-6xl mx-auto flex gap-2 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className="px-5 py-2 text-sm rounded-full border transition-all duration-200"
              style={{
                background: activeTab === tab.value ? "var(--gold)" : "transparent",
                color: activeTab === tab.value ? "var(--bg)" : "var(--fg-dim)",
                borderColor: activeTab === tab.value ? "var(--gold)" : "var(--border)",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((pub) => (
                <div
                  key={pub.title}
                  className="group p-6 border rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                  style={{ borderColor: "var(--border)", background: "var(--card-bg)" }}
                >
                  <span className="text-xs uppercase tracking-wider" style={{ color: "var(--gold)", opacity: 0.6 }}>
                    {pub.type === "research" ? "Research Paper" : pub.type === "article" ? "Media Article" : "Conference Talk"}
                  </span>
                  <h3 className="mt-3 text-lg font-medium group-hover:text-[var(--gold)] transition-colors leading-snug">
                    {pub.title}
                  </h3>
                  <p className="mt-2 text-sm" style={{ color: "var(--fg-dim)" }}>
                    {pub.venue} · {pub.date}
                  </p>
                  {pub.url && (
                    <a href={pub.url} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-sm hover:underline" style={{ color: "var(--gold)" }}>
                      Read →
                    </a>
                  )}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="py-20 px-6" style={{ borderTop: "1px solid var(--border)" }}>
        <SectionReveal className="max-w-4xl mx-auto">
          <h2 className="text-sm uppercase tracking-[0.3em] mb-10" style={{ color: "var(--gold)" }}>
            Reviewer & Research Roles
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {reviewerRoles.map((r) => (
              <div key={r.org} className="p-5 border rounded-xl text-center" style={{ borderColor: "var(--border)" }}>
                <div className="text-xl font-semibold" style={{ color: "var(--gold)" }}>{r.org}</div>
                <p className="mt-1 text-sm" style={{ color: "var(--fg-dim)" }}>{r.role}</p>
              </div>
            ))}
          </div>
        </SectionReveal>
      </section>
    </>
  );
}
