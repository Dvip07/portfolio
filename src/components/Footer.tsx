import Link from "next/link";
import { siteConfig } from "@/data/resume";

export default function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: "var(--border)", background: "var(--bg)" }}>
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-sm" style={{ color: "var(--fg-dim)" }}>
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </div>
        <div className="flex gap-6">
          <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm transition-colors hover:text-[var(--gold)]" style={{ color: "var(--fg-muted)" }}>
            LinkedIn
          </a>
          <a href={`mailto:${siteConfig.email}`} className="text-sm transition-colors hover:text-[var(--gold)]" style={{ color: "var(--fg-muted)" }}>
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
