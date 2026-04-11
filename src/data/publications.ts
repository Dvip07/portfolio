export type PublicationType = "research" | "article" | "conference";

export interface Publication {
  title: string;
  venue: string;
  date: string;
  type: PublicationType;
  url?: string;
}

// Placeholder data — Jay should replace with actual publications
export const publications: Publication[] = [
  {
    title: "Digital Twin Technology in Supply Chain Management",
    venue: "IEEE Journal",
    date: "2024",
    type: "research",
  },
  {
    title: "Data-Driven Sustainability in Global Supply Chains",
    venue: "IJAIDR",
    date: "2024",
    type: "research",
  },
  {
    title: "Driving Success with a Digital Supply Chain",
    venue: "Industry Conference",
    date: "2024",
    type: "conference",
  },
  {
    title: "Data-Driven Sustainability — Conference Presentation",
    venue: "Major Industry Conference",
    date: "2024",
    type: "conference",
  },
  {
    title: "The Future of Resilient Supply Chains",
    venue: "Forbes Business Council",
    date: "2023",
    type: "article",
  },
  {
    title: "How AI is Transforming Procurement",
    venue: "Forbes Business Council",
    date: "2023",
    type: "article",
  },
];

export const reviewerRoles = [
  { org: "IEEE", role: "Researcher & Reviewer" },
  { org: "IJAIDR", role: "Researcher & Reviewer" },
  { org: "ICTAIDA", role: "Researcher & Reviewer" },
];
