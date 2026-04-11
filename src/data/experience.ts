export interface Experience {
  role: string;
  company: string;
  period: string;
  tags: string[];
  highlights: string[];
}

export const experiences: Experience[] = [
  {
    role: "Global Supply Chain Lead",
    company: "Spacelabs Healthcare, OSI Systems",
    period: "Jan 2024 – Present",
    tags: ["Healthcare", "Medical Devices"],
    highlights: [
      "Lead direct and indirect global procurement, demand planning, and logistics with a team of 23, managing a $480M P&L.",
      "Spearhead strategic sourcing across 554 suppliers, realizing $6.74M in immediate savings and an $18M+ cost-improvement pipeline.",
      "Reduced FY26 procurement budget by 2.4% against a 3.8% PPI increase; mitigated $8.4M in tariff costs through agile sourcing.",
      "Launched Power BI dashboard with 10 core KPIs and established RACI-based team operating mechanisms.",
      "Maintained 97% product availability and 94% OTD through QBRs and supplier scorecards.",
    ],
  },
  {
    role: "Supply Chain Manager",
    company: "Niagara Bottling",
    period: "Jul 2021 – Dec 2023",
    tags: ["Food & Beverage"],
    highlights: [
      "Directed a 17-member cross-functional team overseeing a $1.1B contract manufacturing portfolio.",
      "Managed operations across 5 beverage categories and 24 major brands (Coca-Cola, PepsiCo, Starbucks), ~450 SKUs and 34 production lines.",
      "Achieved 97.73% product availability in 2022, driving $21M in operational cost savings through 6B bottles annual output.",
      "Delivered 35+ vital weekly performance reports to cross-functional executive leadership.",
    ],
  },
  {
    role: "Sr. Supply Chain Analyst",
    company: "Niagara Bottling",
    period: "Jan 2020 – Jun 2021",
    tags: ["Food & Beverage"],
    highlights: [
      "Led supply chain planning for $300M in annual operations across 7 major contract manufacturing customers.",
      "Managed tactical and strategic planning for 9 production lines, 2.4B bottle annual capacity, and 380 SKUs.",
    ],
  },
  {
    role: "Supply Chain Analyst",
    company: "Niagara Bottling",
    period: "Sep 2018 – Dec 2019",
    tags: ["Food & Beverage"],
    highlights: [
      "Managed end-to-end Direct-to-Store value-added program via WMS, Oracle EBS, and JDA (Blue Yonder).",
      "Optimized 9,000 monthly truck routes, implementing a unified platform for the DTS segment (16% of total network).",
      "Automated network processes using Python, AMPL, and BOTI — reducing processing time from 5 hours to 45 minutes.",
      "Reduced inventory footprint from 1,450 to 750 pallets while maintaining peak efficiency.",
    ],
  },
  {
    role: "Supply Chain Co-ordinator",
    company: "Samarika Pharmaceuticals, India",
    period: "Jun 2015 – Jul 2016",
    tags: ["Pharmaceutical"],
    highlights: [
      "Maintained strict inventory control for 550 SKUs utilizing ERP systems.",
      "Applied statistical analysis, predictive modeling, and simulations via SAP and Advanced Excel.",
    ],
  },
  {
    role: "Supply Chain Management Intern",
    company: "SLTL, Gandhinagar, India",
    period: "Jun 2014 – Sep 2014",
    tags: ["Semiconductor", "Manufacturing"],
    highlights: [
      "Designed high-precision inventory control systems for diamond-cutting laser machine assembly.",
      "Utilized MATLAB and Excel for assembly line balancing and procurement scheduling.",
    ],
  },
  {
    role: "Research Assistant",
    company: "Intel & GM (ASU)",
    period: "Nov 2016 – May 2018",
    tags: ["Automotive", "IoT", "Research"],
    highlights: [
      'Engineered an IoT-integrated "Smart Shopping Cart" prototype with Intel for automated retail checkout.',
      'Collaborated on the U.S. DOE & GM "EcoCAR 3" project for hybrid vehicle architecture.',
    ],
  },
  {
    role: "Vice President, Student Government",
    company: "Arizona State University",
    period: "May 2017 – May 2018",
    tags: ["Leadership"],
    highlights: [
      "Represented 21,000+ graduate students across five ASU campuses.",
      "Directed a $1.4M annual budget for research grants, travel, and awards.",
    ],
  },
];
