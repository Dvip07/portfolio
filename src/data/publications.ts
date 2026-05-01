export type PublicationType = "research" | "article" | "conference";

export interface Publication {
  title: string;
  venue: string;
  date: string;
  type: PublicationType;
  url?: string;
}

export const publications: Publication[] = [
  // ── Research Papers ──────────────────────────────────────────────────────
  {
    title: "The Integration of Artificial Intelligence in Supply Chain Management: A Comprehensive Review",
    venue: "ISJEM",
    date: "2024",
    type: "research",
    url: "https://isjem.com/download/the-integration-of-artificial-intelligence-in-supply-chain-management-a-comprehensive-review/",
  },
  {
    title: "Digital Twin Technology in Supply Chain Management",
    venue: "IJIRMPS",
    date: "2024",
    type: "research",
    url: "https://www.ijirmps.org/research-paper.php?id=232267",
  },
  {
    title: "Data-Driven Sustainability in Global Supply Chains",
    venue: "IJAIDR",
    date: "2024",
    type: "research",
    url: "https://www.ijaidr.com/research-paper.php?id=1244",
  },
  {
    title: "Advanced Research in Supply Chain Optimization",
    venue: "IJAIDR",
    date: "2024",
    type: "research",
    url: "https://www.ijaidr.com/research-paper.php?id=1315",
  },
  {
    title: "Emerging Trends in Supply Chain Analytics",
    venue: "IJAIDR",
    date: "2024",
    type: "research",
    url: "https://www.ijaidr.com/research-paper.php?id=1316",
  },

  // ── Articles ─────────────────────────────────────────────────────────────
  {
    title: "The Algorithmic Canary: Why Intuition Still Matters in the Age of AI",
    venue: "Forbes Business Council",
    date: "2025",
    type: "article",
    url: "https://www.forbes.com/councils/forbesbusinesscouncil/2025/03/14/the-algorithmic-canary-why-intuition-still-matters-in-the-age-of-ai/",
  },
  {
    title: "Building Adaptive Supply Chains Beyond Friend-Shoring",
    venue: "Forbes Business Council",
    date: "2025",
    type: "article",
    url: "https://www.forbes.com/councils/forbesbusinesscouncil/2025/08/07/building-adaptive-supply-chains-beyond-friend-shoring/",
  },
  {
    title: "20 Resources to Hone Your Leadership Skills",
    venue: "Forbes Business Council",
    date: "2025",
    type: "article",
    url: "https://www.forbes.com/councils/forbesbusinesscouncil/2025/03/21/20-resources-to-hone-your-leadership-skills/",
  },
  {
    title: "Unlocking Global Trade Potential: The Power of Supply Chain Resilience",
    venue: "Globy",
    date: "2023",
    type: "article",
    url: "https://globy.com/blog/unlocking-global-trade-potential-the-power-of-supply-chain-resilience-f39b34",
  },

  // ── Conference Talks ──────────────────────────────────────────────────────
  {
    title: "Driving Success with a Digital Supply Chain",
    venue: "Industry Conference",
    date: "2024",
    type: "conference",
  },
  {
    title: "Data-Driven Sustainability in Operations",
    venue: "Major Industry Conference",
    date: "2024",
    type: "conference",
  },
];

export const reviewerRoles = [
  { org: "IEEE", role: "Researcher & Reviewer" },
  { org: "IJAIDR", role: "Researcher & Reviewer" },
  { org: "ICTAIDA", role: "Researcher & Reviewer" },
];
