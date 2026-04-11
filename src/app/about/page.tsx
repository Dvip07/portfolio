"use client";

import { motion } from "framer-motion";
import SectionReveal from "@/components/SectionReveal";

const skills = [
  {
    category: "ERP",
    items: ["SAP (MM, PP, SD)", "Oracle (EBS & WMS)", "D365", "JDA (Blue Yonder)", "Manhattan", "Logility"],
  },
  {
    category: "Analytics & BI",
    items: ["Alteryx", "Snowflake", "Tableau", "Power BI", "Advanced Excel", "MS 365"],
  },
  {
    category: "Automation & ML",
    items: ["Python", "SQL", "AWS SageMaker", "Google Vertex AI", "Azure", "MATLAB", "AMPL"],
  },
  {
    category: "Project Management & CRM",
    items: ["Salesforce", "Visio", "HighGear", "Agile Methodologies"],
  },
];

const expertise = [
  "Project & Risk Management",
  "Production Planning & Control",
  "Logistics Management",
  "Excellent Negotiator",
  "Cross-functional Management",
  "Reporting & Networking",
  "Maths, Stats & Optimization",
  "Communication & Visualization",
  "Finance & Budgeting",
];

const certifications = [
  "CSCMP", "ASCM", "ISM", "INFORMS", "CSSC", "CPIM",
  "Six Sigma Black Belt", "Forbes Business Council Member",
];

const education = [
  { degree: "MS in Industrial Technology & Management", school: "Arizona State University", year: "July 2016" },
  { degree: "BE in Mechanical Engineering", school: "Gujarat Technological University", year: "June 2011" },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-sm uppercase tracking-[0.3em] mb-4" style={{ color: "var(--gold)" }}>
            About
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-bold tracking-tight">
            Jay Patel
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6 text-lg leading-relaxed max-w-3xl" style={{ color: "var(--fg-muted)" }}>
            Forward-thinking executive with 12 years of experience engineering
            resilient, data-driven supply chains across the healthcare,
            semiconductor, pharmaceutical, automotive, and food &amp; beverage
            industries. Recognized industry speaker and author championing
            digital transformation and sustainable operations.
          </motion.p>
        </div>
      </section>

      {/* Photo + Bio */}
      <section className="py-16 px-6" style={{ borderTop: "1px solid var(--border)" }}>
        <SectionReveal className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="aspect-[4/5] rounded-2xl border flex items-center justify-center" style={{ background: "var(--bg-secondary)", borderColor: "var(--border)" }}>
            <span className="text-sm" style={{ color: "var(--fg-faint)" }}>Photo</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6">Leadership Philosophy</h2>
            <p className="leading-relaxed mb-4" style={{ color: "var(--fg-muted)" }}>
              I believe in building supply chains that are not just efficient, but
              resilient and sustainable. My approach combines deep analytical rigor
              with cross-functional collaboration to drive measurable outcomes.
            </p>
            <p className="leading-relaxed mb-4" style={{ color: "var(--fg-muted)" }}>
              With experience spanning from pharmaceutical startups to billion-dollar
              beverage operations, I bring a unique perspective on how to optimize
              complex global networks while maintaining the agility to adapt to
              disruption.
            </p>
            <p className="leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              As a Forbes Business Council member and published researcher, I&apos;m
              committed to advancing the field through thought leadership and
              practical innovation.
            </p>
          </div>
        </SectionReveal>
      </section>

      {/* Skills & Tools */}
      <section className="py-20 px-6" style={{ borderTop: "1px solid var(--border)" }}>
        <SectionReveal className="max-w-6xl mx-auto">
          <h2 className="text-sm uppercase tracking-[0.3em] mb-12" style={{ color: "var(--gold)" }}>
            Tools & Technologies
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            {skills.map((group) => (
              <div key={group.category}>
                <h3 className="text-lg font-semibold mb-4">{group.category}</h3>
                <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <motion.span key={item} variants={fadeUp} className="px-3 py-1.5 text-sm border rounded-full transition-all hover:text-[var(--gold)]" style={{ borderColor: "var(--border)", color: "var(--fg-muted)" }}>
                      {item}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            ))}
          </div>
        </SectionReveal>
      </section>

      {/* Areas of Expertise */}
      <section className="py-20 px-6" style={{ borderTop: "1px solid var(--border)" }}>
        <SectionReveal className="max-w-6xl mx-auto">
          <h2 className="text-sm uppercase tracking-[0.3em] mb-12" style={{ color: "var(--gold)" }}>
            Areas of Expertise
          </h2>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {expertise.map((item) => (
              <motion.div key={item} variants={fadeUp} className="p-4 border rounded-xl text-sm transition-all hover:text-[var(--gold)]" style={{ borderColor: "var(--border)", color: "var(--fg-muted)" }}>
                {item}
              </motion.div>
            ))}
          </motion.div>
        </SectionReveal>
      </section>

      {/* Certifications */}
      <section className="py-20 px-6" style={{ borderTop: "1px solid var(--border)" }}>
        <SectionReveal className="max-w-6xl mx-auto">
          <h2 className="text-sm uppercase tracking-[0.3em] mb-12" style={{ color: "var(--gold)" }}>
            Certifications & Memberships
          </h2>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex flex-wrap gap-3">
            {certifications.map((cert) => (
              <motion.span key={cert} variants={fadeUp} className="px-5 py-2.5 border rounded-full text-sm transition-colors hover:bg-[var(--gold-subtle)]" style={{ borderColor: "var(--border-hover)", color: "var(--gold)" }}>
                {cert}
              </motion.span>
            ))}
          </motion.div>
        </SectionReveal>
      </section>

      {/* Education */}
      <section className="py-20 px-6" style={{ borderTop: "1px solid var(--border)" }}>
        <SectionReveal className="max-w-4xl mx-auto">
          <h2 className="text-sm uppercase tracking-[0.3em] mb-12" style={{ color: "var(--gold)" }}>Education</h2>
          <div className="space-y-8">
            {education.map((edu) => (
              <div key={edu.degree} className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <h3 className="text-xl font-semibold">{edu.degree}</h3>
                  <p style={{ color: "var(--fg-dim)" }}>{edu.school}</p>
                </div>
                <span className="text-sm" style={{ color: "var(--gold)" }}>{edu.year}</span>
              </div>
            ))}
          </div>
        </SectionReveal>
      </section>

      {/* Awards */}
      <section className="py-20 px-6" style={{ borderTop: "1px solid var(--border)" }}>
        <SectionReveal className="max-w-4xl mx-auto text-center">
          <h2 className="text-sm uppercase tracking-[0.3em] mb-8" style={{ color: "var(--gold)" }}>Recognition</h2>
          <div className="flex justify-center gap-16">
            <div>
              <div className="text-5xl font-bold" style={{ color: "var(--gold)" }}>9</div>
              <p className="mt-2 text-sm uppercase tracking-wider" style={{ color: "var(--fg-dim)" }}>Professional Awards</p>
            </div>
            <div>
              <div className="text-5xl font-bold" style={{ color: "var(--gold)" }}>21</div>
              <p className="mt-2 text-sm uppercase tracking-wider" style={{ color: "var(--fg-dim)" }}>Competition Wins</p>
            </div>
          </div>
        </SectionReveal>
      </section>
    </>
  );
}
