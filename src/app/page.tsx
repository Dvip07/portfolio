"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import AnimatedCounter from "@/components/AnimatedCounter";
import SectionReveal from "@/components/SectionReveal";
import NetworkMesh from "@/components/NetworkMesh";
import { siteConfig, stats, featuredIn } from "@/data/resume";
import { publications } from "@/data/publications";
import { experiences } from "@/data/experience";

const industries = [
  { icon: "🏥", name: "Healthcare", desc: "Medical devices & patient monitoring" },
  { icon: "🍶", name: "Food & Beverage", desc: "6B+ bottles, 24 major brands" },
  { icon: "💊", name: "Pharmaceutical", desc: "550 SKU inventory management" },
  { icon: "🚗", name: "Automotive", desc: "Hybrid vehicle architecture (GM)" },
  { icon: "🔬", name: "Semiconductor", desc: "Precision laser manufacturing" },
  { icon: "🌐", name: "IoT & Research", desc: "Smart retail & supply chain visibility" },
];

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Network mesh background */}
        <div className="absolute inset-0" style={{ background: "var(--bg)" }}>
          <NetworkMesh />
          {/* Gradient overlay for readability */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 0%, var(--bg) 70%)",
            }}
          />
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                "radial-gradient(circle at 30% 50%, var(--gold-glow) 0%, transparent 50%), radial-gradient(circle at 70% 50%, var(--gold-subtle) 0%, transparent 50%)",
            }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.35, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative z-10 text-center px-6 max-w-4xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-6 px-4 py-1.5 rounded-full border text-xs uppercase tracking-[0.2em]"
            style={{ borderColor: "var(--border-hover)", color: "var(--gold)" }}
          >
            Forbes Council Member · Six Sigma Black Belt
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05]"
          >
            {siteConfig.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-4 text-xl md:text-2xl font-light"
            style={{ color: "var(--gold)" }}
          >
            {siteConfig.title}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-4 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--fg-muted)" }}
          >
            12+ years engineering resilient, data-driven supply chains across
            healthcare, semiconductor, pharmaceutical, automotive, and food &amp;
            beverage industries.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-10 flex gap-4 justify-center flex-wrap"
          >
            <Link
              href="/about"
              className="px-8 py-3 text-sm font-medium rounded-full transition-colors"
              style={{ background: "var(--gold)", color: "var(--bg)" }}
            >
              Explore My Journey
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 border text-sm font-medium rounded-full transition-colors"
              style={{ borderColor: "var(--fg-faint)", color: "var(--fg-muted)" }}
            >
              Get in Touch
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-5 h-8 border-2 rounded-full flex justify-center pt-1" style={{ borderColor: "var(--fg-faint)" }}>
            <div className="w-1 h-2 rounded-full" style={{ background: "var(--gold)" }} />
          </div>
        </motion.div>
      </section>

      {/* By the Numbers */}
      <section className="py-24 px-6" style={{ borderTop: "1px solid var(--border)" }}>
        <SectionReveal className="max-w-6xl mx-auto">
          <h2 className="text-center text-sm uppercase tracking-[0.3em] mb-16" style={{ color: "var(--gold)" }}>
            By the Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {stats.map((stat) => (
              <AnimatedCounter
                key={stat.label}
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </SectionReveal>
      </section>

      {/* Industries */}
      <section className="py-24 px-6" style={{ borderTop: "1px solid var(--border)" }}>
        <SectionReveal className="max-w-6xl mx-auto">
          <h2 className="text-center text-sm uppercase tracking-[0.3em] mb-4" style={{ color: "var(--gold)" }}>
            Industries
          </h2>
          <p className="text-center mb-16 text-base" style={{ color: "var(--fg-dim)" }}>
            Cross-industry expertise spanning six major sectors
          </p>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 md:grid-cols-3 gap-5"
          >
            {industries.map((ind) => (
              <motion.div
                key={ind.name}
                variants={staggerItem}
                className="group p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.02]"
                style={{ borderColor: "var(--border)", background: "var(--card-bg)" }}
              >
                <div className="text-3xl mb-3">{ind.icon}</div>
                <h3 className="font-semibold mb-1">{ind.name}</h3>
                <p className="text-sm" style={{ color: "var(--fg-dim)" }}>{ind.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </SectionReveal>
      </section>

      {/* Career Highlights (mini timeline) */}
      <section className="py-24 px-6" style={{ borderTop: "1px solid var(--border)" }}>
        <SectionReveal className="max-w-4xl mx-auto">
          <h2 className="text-center text-sm uppercase tracking-[0.3em] mb-4" style={{ color: "var(--gold)" }}>
            Career Snapshot
          </h2>
          <p className="text-center mb-16 text-base" style={{ color: "var(--fg-dim)" }}>
            Key roles across a 12-year journey
          </p>
          <div className="space-y-6">
            {experiences.slice(0, 4).map((exp, i) => (
              <motion.div
                key={exp.role + exp.company}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-4 items-start group"
              >
                <div className="mt-2 w-3 h-3 rounded-full shrink-0 group-hover:scale-125 transition-transform" style={{ background: "var(--gold)" }} />
                <div className="flex-1 pb-6" style={{ borderBottom: "1px solid var(--border)" }}>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h3 className="font-semibold group-hover:text-[var(--gold)] transition-colors">
                      {exp.role}
                    </h3>
                    <span className="text-xs shrink-0" style={{ color: "var(--gold)" }}>{exp.period}</span>
                  </div>
                  <p className="text-sm mt-0.5" style={{ color: "var(--fg-dim)" }}>{exp.company}</p>
                  <p className="text-sm mt-2" style={{ color: "var(--fg-muted)" }}>
                    {exp.highlights[0]}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/experience"
              className="text-sm transition-colors hover:text-[var(--gold)]"
              style={{ color: "var(--fg-dim)" }}
            >
              View Full Timeline →
            </Link>
          </div>
        </SectionReveal>
      </section>

      {/* Featured In */}
      <section className="py-20 px-6" style={{ borderTop: "1px solid var(--border)" }}>
        <SectionReveal className="max-w-4xl mx-auto text-center">
          <h2 className="text-sm uppercase tracking-[0.3em] mb-10" style={{ color: "var(--fg-dim)" }}>
            Recognized By
          </h2>
          <motion.div
            className="flex flex-wrap justify-center gap-8 md:gap-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {featuredIn.map((org) => (
              <motion.span
                key={org}
                variants={staggerItem}
                className="text-lg md:text-xl font-semibold cursor-default transition-colors duration-300 hover:text-[var(--gold)]"
                style={{ color: "var(--fg-faint)" }}
              >
                {org}
              </motion.span>
            ))}
          </motion.div>
        </SectionReveal>
      </section>

      {/* Latest Publications Preview */}
      <section className="py-24 px-6" style={{ borderTop: "1px solid var(--border)" }}>
        <SectionReveal className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-sm uppercase tracking-[0.3em]" style={{ color: "var(--gold)" }}>
              Recent Work
            </h2>
            <Link
              href="/publications"
              className="text-sm transition-colors hover:text-[var(--gold)]"
              style={{ color: "var(--fg-dim)" }}
            >
              View All →
            </Link>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {publications.slice(0, 3).map((pub) => (
              <motion.div
                key={pub.title}
                variants={staggerItem}
                className="group p-6 border rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                style={{ borderColor: "var(--border)", background: "var(--card-bg)" }}
              >
                <span className="text-xs uppercase tracking-wider" style={{ color: "var(--gold)", opacity: 0.6 }}>
                  {pub.type}
                </span>
                <h3 className="mt-3 text-lg font-medium group-hover:text-[var(--gold)] transition-colors">
                  {pub.title}
                </h3>
                <p className="mt-2 text-sm" style={{ color: "var(--fg-dim)" }}>
                  {pub.venue} · {pub.date}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </SectionReveal>
      </section>

      {/* Skills Marquee */}
      <section className="py-16 overflow-hidden" style={{ borderTop: "1px solid var(--border)" }}>
        <SectionReveal>
          <h2 className="text-center text-sm uppercase tracking-[0.3em] mb-10" style={{ color: "var(--gold)" }}>
            Tools & Technologies
          </h2>
          <div className="relative">
            <motion.div
              className="flex gap-6 whitespace-nowrap"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              {[
                "SAP", "Oracle EBS", "D365", "Blue Yonder", "Manhattan", "Logility",
                "Alteryx", "Snowflake", "Tableau", "Power BI", "Python", "SQL",
                "AWS SageMaker", "Google Vertex AI", "Azure", "MATLAB", "AMPL",
                "Salesforce", "Agile",
                "SAP", "Oracle EBS", "D365", "Blue Yonder", "Manhattan", "Logility",
                "Alteryx", "Snowflake", "Tableau", "Power BI", "Python", "SQL",
                "AWS SageMaker", "Google Vertex AI", "Azure", "MATLAB", "AMPL",
                "Salesforce", "Agile",
              ].map((tool, i) => (
                <span
                  key={`${tool}-${i}`}
                  className="px-5 py-2 rounded-full border text-sm shrink-0"
                  style={{ borderColor: "var(--border)", color: "var(--fg-dim)" }}
                >
                  {tool}
                </span>
              ))}
            </motion.div>
          </div>
        </SectionReveal>
      </section>

      {/* CTA */}
      <section className="py-24 px-6" style={{ borderTop: "1px solid var(--border)" }}>
        <SectionReveal className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold">
            Let&apos;s Connect
          </h2>
          <p className="mt-4" style={{ color: "var(--fg-dim)" }}>
            Open to speaking engagements, advisory roles, and collaboration
            opportunities. Or just chat with my AI assistant below.
          </p>
          <div className="mt-8 flex gap-4 justify-center flex-wrap">
            <Link
              href="/contact"
              className="px-10 py-4 font-medium rounded-full transition-colors"
              style={{ background: "var(--gold)", color: "var(--bg)" }}
            >
              Send a Message
            </Link>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 border font-medium rounded-full transition-colors"
              style={{ borderColor: "var(--fg-faint)", color: "var(--fg-muted)" }}
            >
              LinkedIn
            </a>
          </div>
        </SectionReveal>
      </section>
    </>
  );
}
