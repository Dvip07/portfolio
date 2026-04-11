"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { experiences } from "@/data/experience";

function TimelineCard({ exp, index }: { exp: (typeof experiences)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative grid md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-10"
    >
      {index % 2 === 0 ? (
        <div className="md:text-right"><CardContent exp={exp} /></div>
      ) : (
        <div className="hidden md:block" />
      )}
      <div className="hidden md:flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="w-4 h-4 rounded-full z-10"
          style={{ background: "var(--gold)", boxShadow: "0 0 0 4px var(--bg)" }}
        />
        <div className="w-px flex-1" style={{ background: "var(--border)" }} />
      </div>
      {index % 2 !== 0 ? (
        <div><CardContent exp={exp} /></div>
      ) : (
        <div className="hidden md:block" />
      )}
      <div className="md:hidden"><CardContent exp={exp} /></div>
    </motion.div>
  );
}

function CardContent({ exp }: { exp: (typeof experiences)[0] }) {
  return (
    <div
      className="group p-6 border rounded-2xl transition-all duration-300 hover:scale-[1.01]"
      style={{ borderColor: "var(--border)", background: "var(--card-bg)" }}
    >
      <span className="text-sm" style={{ color: "var(--gold)" }}>{exp.period}</span>
      <h3 className="mt-2 text-xl font-semibold group-hover:text-[var(--gold)] transition-colors">
        {exp.role}
      </h3>
      <p className="text-sm" style={{ color: "var(--fg-dim)" }}>{exp.company}</p>
      <div className="flex flex-wrap gap-2 mt-3">
        {exp.tags.map((tag) => (
          <span key={tag} className="text-xs px-2 py-1 rounded-full" style={{ background: "var(--gold-subtle)", color: "var(--gold)" }}>
            {tag}
          </span>
        ))}
      </div>
      <ul className="mt-4 space-y-2">
        {exp.highlights.map((h, i) => (
          <li key={i} className="text-sm leading-relaxed" style={{ color: "var(--fg-dim)" }}>• {h}</li>
        ))}
      </ul>
    </div>
  );
}

export default function ExperiencePage() {
  return (
    <>
      <section className="pt-32 pb-10 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-sm uppercase tracking-[0.3em] mb-4" style={{ color: "var(--gold)" }}>
            Career
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-bold tracking-tight">
            Experience
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-4 text-lg" style={{ color: "var(--fg-dim)" }}>
            12+ years across healthcare, semiconductor, pharmaceutical, automotive, and food &amp; beverage industries.
          </motion.p>
        </div>
      </section>
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto space-y-0">
          {experiences.map((exp, i) => (
            <TimelineCard key={exp.role + exp.company} exp={exp} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
