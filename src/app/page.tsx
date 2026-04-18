"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import AnimatedCounter from "@/components/AnimatedCounter";
import SectionReveal from "@/components/SectionReveal";
import NetworkMesh from "@/components/NetworkMesh";
import { siteConfig, stats, featuredIn } from "@/data/resume";
import { publications, reviewerRoles, type PublicationType } from "@/data/publications";
import { experiences } from "@/data/experience";

// ─── Data ────────────────────────────────────────────────────────────────────

const industries = [
  { icon: "🤖", name: "AI & IoT", desc: "Smart retail, Digital Twin & ML-driven supply chains" },
  { icon: "🏥", name: "Healthcare", desc: "Medical devices & patient monitoring" },
  { icon: "🍶", name: "Food & Beverage", desc: "24 major brands, 34 production lines" },
  { icon: "💊", name: "Pharmaceutical", desc: "550 SKU inventory management" },
  { icon: "🚗", name: "Automotive", desc: "Hybrid vehicle architecture (GM)" },
  { icon: "🔬", name: "Semiconductor", desc: "Precision laser manufacturing" },
];

const skills = [
  { category: "ERP", items: ["SAP (MM, PP, SD)", "Oracle (EBS & WMS)", "D365", "JDA (Blue Yonder)", "Manhattan", "Logility"] },
  { category: "Analytics & BI", items: ["Alteryx", "Snowflake", "Tableau", "Power BI", "Advanced Excel", "MS 365"] },
  { category: "Automation & ML", items: ["Python", "SQL", "AWS SageMaker", "Google Vertex AI", "Azure", "MATLAB", "AMPL"] },
  { category: "Project Management", items: ["Salesforce", "Visio", "HighGear", "Agile Methodologies"] },
];

const certifications = ["CSCMP", "ASCM", "ISM", "INFORMS", "CSSC", "CPIM", "Six Sigma Black Belt", "Forbes Business Council"];

const education = [
  { degree: "MS in Industrial Technology & Management", school: "Arizona State University", year: "2016" },
  { degree: "BE in Mechanical Engineering", school: "Gujarat Technological University", year: "2011" },
];

const pubTabs: { label: string; value: PublicationType | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Research Papers", value: "research" },
  { label: "Articles", value: "article" },
  { label: "Conference Talks", value: "conference" },
];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

// ─── Component ───────────────────────────────────────────────────────────────

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const [activeTab, setActiveTab] = useState<PublicationType | "all">("all");
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const filtered = activeTab === "all" ? publications : publications.filter((p) => p.type === activeTab);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("sending");
    const form = e.currentTarget;
    try {
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) { setFormStatus("sent"); form.reset(); }
      else setFormStatus("error");
    } catch { setFormStatus("error"); }
  };

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section ref={heroRef} id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0" style={{ background: "var(--bg)" }}>
          <NetworkMesh />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 0%, var(--bg) 72%)" }} />
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{ background: "radial-gradient(circle at 30% 50%, var(--gold-glow) 0%, transparent 50%), radial-gradient(circle at 70% 50%, var(--gold-subtle) 0%, transparent 50%)" }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.35, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            className="inline-block mb-6 px-4 py-1.5 rounded-full border text-xs uppercase tracking-[0.2em]"
            style={{ borderColor: "var(--border-hover)", color: "var(--gold)" }}>
            Forbes Council Member · Six Sigma Black Belt
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05]">
            {siteConfig.name}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-4 text-xl md:text-2xl font-light" style={{ color: "var(--gold)" }}>
            {siteConfig.title}
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-4 text-base md:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "var(--fg-muted)" }}>
            12+ years engineering resilient, data-driven supply chains across healthcare, semiconductor, pharmaceutical, automotive, and food &amp; beverage industries.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-10 flex gap-4 justify-center flex-wrap">
            <button onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3 text-sm font-medium rounded-full transition-colors"
              style={{ background: "var(--gold)", color: "var(--bg)" }}>
              Explore My Journey
            </button>
            <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3 border text-sm font-medium rounded-full transition-colors"
              style={{ borderColor: "var(--fg-faint)", color: "var(--fg-muted)" }}>
              Get in Touch
            </button>
          </motion.div>
        </motion.div>

        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <div className="w-5 h-8 border-2 rounded-full flex justify-center pt-1" style={{ borderColor: "var(--fg-faint)" }}>
            <div className="w-1 h-2 rounded-full" style={{ background: "var(--gold)" }} />
          </div>
        </motion.div>
      </section>

      {/* ── BY THE NUMBERS ───────────────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ borderTop: "1px solid var(--border)" }}>
        <SectionReveal className="max-w-6xl mx-auto">
          <h2 className="text-center text-sm uppercase tracking-[0.3em] mb-16" style={{ color: "var(--gold)" }}>By the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
            {stats.map((stat) => (
              <AnimatedCounter key={stat.label} value={stat.value} prefix={stat.prefix} suffix={stat.suffix} label={stat.label} />
            ))}
          </div>
        </SectionReveal>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section id="about" className="py-24 px-6" style={{ borderTop: "1px solid var(--border)" }}>
        <SectionReveal className="max-w-6xl mx-auto">
          <p className="text-sm uppercase tracking-[0.3em] mb-4" style={{ color: "var(--gold)" }}>About</p>
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">The Story So Far</h2>
              <p className="leading-relaxed mb-4" style={{ color: "var(--fg-muted)" }}>
                Forward-thinking executive with 12 years of experience engineering resilient, data-driven supply chains across healthcare, semiconductor, pharmaceutical, automotive, and food &amp; beverage industries.
              </p>
              <p className="leading-relaxed mb-4" style={{ color: "var(--fg-muted)" }}>
                My approach combines deep analytical rigor with cross-functional collaboration — from managing a $480M P&L at a leading medical device manufacturer to driving $21M in cost savings across 6 billion bottles of annual production.
              </p>
              <p className="leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                As a Forbes Business Council member and published researcher, I&apos;m committed to advancing the field through thought leadership and practical innovation in Digital Twin technology and AI-driven operations.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {certifications.map((cert) => (
                  <span key={cert} className="px-4 py-2 border rounded-full text-sm transition-colors hover:bg-[var(--gold-subtle)]"
                    style={{ borderColor: "var(--border-hover)", color: "var(--gold)" }}>
                    {cert}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="text-sm uppercase tracking-[0.3em] mb-6" style={{ color: "var(--gold)" }}>Education</h3>
                {education.map((edu) => (
                  <div key={edu.degree} className="flex justify-between items-start gap-4 mb-5 pb-5" style={{ borderBottom: "1px solid var(--border)" }}>
                    <div>
                      <p className="font-semibold">{edu.degree}</p>
                      <p className="text-sm mt-0.5" style={{ color: "var(--fg-dim)" }}>{edu.school}</p>
                    </div>
                    <span className="text-sm shrink-0" style={{ color: "var(--gold)" }}>{edu.year}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-12">
                <div className="text-center">
                  <div className="text-4xl font-bold" style={{ color: "var(--gold)" }}>9</div>
                  <p className="mt-1 text-xs uppercase tracking-wider" style={{ color: "var(--fg-dim)" }}>Awards</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold" style={{ color: "var(--gold)" }}>21</div>
                  <p className="mt-1 text-xs uppercase tracking-wider" style={{ color: "var(--fg-dim)" }}>Competition Wins</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold" style={{ color: "var(--gold)" }}>16</div>
                  <p className="mt-1 text-xs uppercase tracking-wider" style={{ color: "var(--fg-dim)" }}>Research Papers</p>
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* ── INDUSTRIES ───────────────────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ borderTop: "1px solid var(--border)" }}>
        <SectionReveal className="max-w-6xl mx-auto">
          <p className="text-sm uppercase tracking-[0.3em] mb-4" style={{ color: "var(--gold)" }}>Industries</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-16">Cross-Industry Expertise</h2>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {industries.map((ind) => (
              <motion.div key={ind.name} variants={fadeUp}
                className="group p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.02]"
                style={{ borderColor: "var(--border)", background: "var(--card-bg)" }}>
                <div className="text-3xl mb-3">{ind.icon}</div>
                <h3 className="font-semibold mb-1">{ind.name}</h3>
                <p className="text-sm" style={{ color: "var(--fg-dim)" }}>{ind.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </SectionReveal>
      </section>

      {/* ── EXPERIENCE ───────────────────────────────────────────────────── */}
      <section id="experience" className="py-24 px-6" style={{ borderTop: "1px solid var(--border)" }}>
        <SectionReveal className="max-w-5xl mx-auto">
          <p className="text-sm uppercase tracking-[0.3em] mb-4" style={{ color: "var(--gold)" }}>Career</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-16">12 Years, One Thread</h2>
          <div className="space-y-0">
            {experiences.map((exp, i) => (
              <motion.div key={exp.role + exp.company}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, delay: i * 0.05 }}
                className="group flex gap-6 pb-10" style={{ borderBottom: i < experiences.length - 1 ? "1px solid var(--border)" : "none", marginBottom: i < experiences.length - 1 ? "2.5rem" : 0 }}>
                <div className="flex flex-col items-center pt-1.5">
                  <div className="w-3 h-3 rounded-full shrink-0 group-hover:scale-125 transition-transform" style={{ background: "var(--gold)" }} />
                  {i < experiences.length - 1 && <div className="w-px flex-1 mt-2" style={{ background: "var(--border)" }} />}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                    <h3 className="text-lg font-semibold group-hover:text-[var(--gold)] transition-colors">{exp.role}</h3>
                    <span className="text-xs shrink-0" style={{ color: "var(--gold)" }}>{exp.period}</span>
                  </div>
                  <p className="text-sm mb-3" style={{ color: "var(--fg-dim)" }}>{exp.company}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {exp.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 rounded-full" style={{ background: "var(--gold-subtle)", color: "var(--gold)" }}>{tag}</span>
                    ))}
                  </div>
                  <ul className="space-y-1.5">
                    {exp.highlights.map((h, j) => (
                      <li key={j} className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>• {h}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </SectionReveal>
      </section>

      {/* ── SKILLS ───────────────────────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ borderTop: "1px solid var(--border)" }}>
        <SectionReveal className="max-w-6xl mx-auto">
          <p className="text-sm uppercase tracking-[0.3em] mb-4" style={{ color: "var(--gold)" }}>Toolkit</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-16">Tools & Technologies</h2>
          <div className="grid md:grid-cols-2 gap-10">
            {skills.map((group) => (
              <div key={group.category}>
                <h3 className="text-base font-semibold mb-4">{group.category}</h3>
                <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <motion.span key={item} variants={fadeUp}
                      className="px-3 py-1.5 text-sm border rounded-full transition-all hover:text-[var(--gold)]"
                      style={{ borderColor: "var(--border)", color: "var(--fg-muted)" }}>
                      {item}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            ))}
          </div>
        </SectionReveal>
      </section>

      {/* ── SKILLS MARQUEE ───────────────────────────────────────────────── */}
      <section className="py-10 overflow-hidden" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="relative">
          <motion.div className="flex gap-6 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}>
            {[
              "SAP", "Oracle EBS", "D365", "Blue Yonder", "Manhattan", "Logility",
              "Alteryx", "Snowflake", "Tableau", "Power BI", "Python", "SQL",
              "AWS SageMaker", "Google Vertex AI", "Azure", "MATLAB", "AMPL", "Salesforce",
              "SAP", "Oracle EBS", "D365", "Blue Yonder", "Manhattan", "Logility",
              "Alteryx", "Snowflake", "Tableau", "Power BI", "Python", "SQL",
              "AWS SageMaker", "Google Vertex AI", "Azure", "MATLAB", "AMPL", "Salesforce",
            ].map((tool, i) => (
              <span key={`${tool}-${i}`} className="px-5 py-2 rounded-full border text-sm shrink-0"
                style={{ borderColor: "var(--border)", color: "var(--fg-dim)" }}>
                {tool}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PUBLICATIONS ─────────────────────────────────────────────────── */}
      <section id="publications" className="py-24 px-6" style={{ borderTop: "1px solid var(--border)" }}>
        <SectionReveal className="max-w-6xl mx-auto">
          <p className="text-sm uppercase tracking-[0.3em] mb-4" style={{ color: "var(--gold)" }}>Thought Leadership</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Publications & Speaking</h2>
          <p className="mb-10" style={{ color: "var(--fg-dim)" }}>
            16 research papers, 11 media articles, and conference presentations on digital supply chain transformation.
          </p>
          <div className="flex gap-2 flex-wrap mb-10">
            {pubTabs.map((tab) => (
              <button key={tab.value} onClick={() => setActiveTab(tab.value)}
                className="px-5 py-2 text-sm rounded-full border transition-all duration-200"
                style={{
                  background: activeTab === tab.value ? "var(--gold)" : "transparent",
                  color: activeTab === tab.value ? "var(--bg)" : "var(--fg-dim)",
                  borderColor: activeTab === tab.value ? "var(--gold)" : "var(--border)",
                }}>
                {tab.label}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((pub) => (
                <div key={pub.title} className="group p-6 border rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                  style={{ borderColor: "var(--border)", background: "var(--card-bg)" }}>
                  <span className="text-xs uppercase tracking-wider" style={{ color: "var(--gold)", opacity: 0.6 }}>
                    {pub.type === "research" ? "Research Paper" : pub.type === "article" ? "Article" : "Conference Talk"}
                  </span>
                  <h3 className="mt-3 text-base font-medium group-hover:text-[var(--gold)] transition-colors leading-snug">{pub.title}</h3>
                  <p className="mt-2 text-sm" style={{ color: "var(--fg-dim)" }}>{pub.venue} · {pub.date}</p>
                  {pub.url && (
                    <a href={pub.url} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-sm hover:underline" style={{ color: "var(--gold)" }}>Read →</a>
                  )}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {reviewerRoles.map((r) => (
              <div key={r.org} className="p-5 border rounded-xl text-center" style={{ borderColor: "var(--border)" }}>
                <div className="text-xl font-semibold" style={{ color: "var(--gold)" }}>{r.org}</div>
                <p className="mt-1 text-sm" style={{ color: "var(--fg-dim)" }}>{r.role}</p>
              </div>
            ))}
          </div>
        </SectionReveal>
      </section>

      {/* ── AFFILIATIONS ─────────────────────────────────────────────────── */}
      <section className="py-20 px-6" style={{ borderTop: "1px solid var(--border)" }}>
        <SectionReveal className="max-w-4xl mx-auto text-center">
          <h2 className="text-sm uppercase tracking-[0.3em] mb-10" style={{ color: "var(--fg-dim)" }}>Affiliations</h2>
          <motion.div className="flex flex-wrap justify-center gap-8 md:gap-12"
            variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {featuredIn.map((org) => (
              <motion.span key={org} variants={fadeUp}
                className="text-lg md:text-xl font-semibold cursor-default transition-colors duration-300 hover:text-[var(--gold)]"
                style={{ color: "var(--fg-faint)" }}>
                {org}
              </motion.span>
            ))}
          </motion.div>
        </SectionReveal>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────────── */}
      <section id="contact" className="py-24 px-6" style={{ borderTop: "1px solid var(--border)" }}>
        <SectionReveal className="max-w-5xl mx-auto">
          <p className="text-sm uppercase tracking-[0.3em] mb-4" style={{ color: "var(--gold)" }}>Connect</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Let&apos;s Work Together</h2>
          <p className="mb-16" style={{ color: "var(--fg-dim)" }}>
            Open to speaking engagements, advisory roles, research collaborations, and strategic partnerships.
          </p>
          <div className="grid md:grid-cols-2 gap-16">
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm mb-2" style={{ color: "var(--fg-dim)" }}>Name</label>
                <input id="name" name="name" type="text" required placeholder="Your name"
                  className="w-full px-4 py-3 border rounded-xl bg-transparent focus:outline-none transition-colors"
                  style={{ borderColor: "var(--border)", color: "var(--fg)" }} />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm mb-2" style={{ color: "var(--fg-dim)" }}>Email</label>
                <input id="email" name="email" type="email" required placeholder="your@email.com"
                  className="w-full px-4 py-3 border rounded-xl bg-transparent focus:outline-none transition-colors"
                  style={{ borderColor: "var(--border)", color: "var(--fg)" }} />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm mb-2" style={{ color: "var(--fg-dim)" }}>Message</label>
                <textarea id="message" name="message" rows={5} required placeholder="How can we collaborate?"
                  className="w-full px-4 py-3 border rounded-xl bg-transparent focus:outline-none transition-colors resize-none"
                  style={{ borderColor: "var(--border)", color: "var(--fg)" }} />
              </div>
              <button type="submit" disabled={formStatus === "sending"}
                className="w-full py-3 font-medium rounded-full transition-colors disabled:opacity-50"
                style={{ background: "var(--gold)", color: "var(--bg)" }}>
                {formStatus === "sending" ? "Sending..." : "Send Message"}
              </button>
              {formStatus === "sent" && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-center" style={{ color: "var(--gold)" }}>
                  Message sent! Jay will get back to you soon.
                </motion.p>
              )}
              {formStatus === "error" && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-center text-red-400">
                  Something went wrong. Please email directly.
                </motion.p>
              )}
            </form>

            {/* Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-sm uppercase tracking-[0.3em] mb-3" style={{ color: "var(--gold)" }}>Email</h3>
                <a href={`mailto:${siteConfig.email}`} className="text-lg transition-colors hover:text-[var(--gold)]" style={{ color: "var(--fg-muted)" }}>
                  {siteConfig.email}
                </a>
              </div>
              <div>
                <h3 className="text-sm uppercase tracking-[0.3em] mb-3" style={{ color: "var(--gold)" }}>Phone</h3>
                <a href={`tel:${siteConfig.phone}`} className="text-lg transition-colors hover:text-[var(--gold)]" style={{ color: "var(--fg-muted)" }}>
                  {siteConfig.phone}
                </a>
              </div>
              <div>
                <h3 className="text-sm uppercase tracking-[0.3em] mb-3" style={{ color: "var(--gold)" }}>LinkedIn</h3>
                <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer"
                  className="text-lg transition-colors hover:text-[var(--gold)]" style={{ color: "var(--fg-muted)" }}>
                  Connect on LinkedIn →
                </a>
              </div>
              <div className="p-6 border rounded-2xl" style={{ borderColor: "var(--border-hover)", background: "var(--gold-subtle)" }}>
                <div className="text-sm uppercase tracking-wider mb-2" style={{ color: "var(--gold)" }}>Forbes Business Council</div>
                <p className="text-sm" style={{ color: "var(--fg-dim)" }}>
                  Member since 2023. Contributing author on supply chain innovation and digital transformation.
                </p>
              </div>
              <div className="p-6 border rounded-2xl" style={{ borderColor: "var(--border)", background: "var(--card-bg)" }}>
                <div className="text-sm uppercase tracking-wider mb-2" style={{ color: "var(--gold)" }}>💬 AI Assistant</div>
                <p className="text-sm" style={{ color: "var(--fg-dim)" }}>
                  Use the chat icon in the bottom-right to ask Jay&apos;s AI assistant anything about his background, skills, or experience.
                </p>
              </div>
            </div>
          </div>
        </SectionReveal>
      </section>
    </>
  );
}
