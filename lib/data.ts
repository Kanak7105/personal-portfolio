export const profile = {
  name: "Kanak Agrawal",
  role: "Software Engineering Intern @ Bajaj Finserv Health",
  location: "Indore, Madhya Pradesh",
  email: "kanakagrawal7105@gmail.com",
  github: "https://github.com/Kanak7105",
  githubHandle: "Kanak7105",
  linkedin: "https://www.linkedin.com/in/kanak-agrawal-023856295/",
  resume: "/Kanak_Agrawal_Resume.pdf",
  summary:
    "Full-stack developer working across Next.js, React, NestJS and MongoDB. I like building systems that are reliable under load and pleasant to use, from access-control frameworks to dashboards and design-system components.",
};

export const education = {
  school: "Acropolis Institute of Technology and Research",
  place: "Indore, India",
  degree: "B.Tech, Computer Science and Engineering",
  period: "Aug 2023 – June 2027",
  cgpa: "7.4",
  courses: [
    "Data Structures",
    "Algorithms",
    "DBMS",
    "Operating Systems",
    "Computer Networks",
    "OOP",
  ],
};

export const experience = [
  {
    company: "Bajaj Finserv Health Ltd.",
    title: "Software Engineering Intern",
    period: "July 2026 – Present",
    stack: ["Next.js", "React", "TypeScript", "NestJS", "MongoDB", "Azure DevOps"],
    points: [
      {
        head: "Feature-Access Framework (PharmaEdge)",
        text: "Designed and implemented a hierarchical feature-access framework using NestJS guards and CMS-driven rules, enabling modules per client and per user without redeployment.",
      },
      {
        head: "OPD Analytics Module (PharmaEdge)",
        text: "Developed the module end to end, including REST API design, interactive dashboards, advanced filters and automated bulk report generation.",
      },
      {
        head: "Exceptional Reimbursement",
        text: "Built a reimbursement journey for users with no nearby doctors or slots, covering eligibility logic (slot availability, distance radius, plan rules), API integration and claim UI.",
      },
      {
        head: "Hospitals Platform Redesign",
        text: "Redesigned 15+ pages for web and mobile on the company Design Language System, building reusable components that removed legacy styles and duplicate code.",
      },
      {
        head: "Reliability",
        text: "Resolved 50+ production and UAT issues across doctor search, slot booking and appointment flows, and built partner-specific features for insurance partners.",
      },
      {
        head: "Shared Libraries & CI/CD",
        text: "Contributed to shared UI libraries (HRX Layout, HRX Common) used across all micro-frontends; shipped 200+ commits across 9 repositories via Azure DevOps CI/CD.",
      },
    ],
  },
];

export const projects = [
  {
    name: "SpendSense",
    tagline: "AI-Powered Expense Tracker",
    stack: ["Next.js", "Supabase", "Gemini API"],
    live: "https://spend-sense-kanak071005.vercel.app/",
    github: "https://github.com/Kanak7105/spend-sense",
    points: [
      {
        head: "Full-Stack Expense Tracking",
        text: "Expense tracker with authentication, transaction management and category-wise spending reports using Next.js and Supabase (PostgreSQL).",
      },
      {
        head: "AI Spending Insights",
        text: "Gemini API assistant that generates spending insights from preset prompts, with a per-user daily usage limit to control API cost.",
      },
      {
        head: "Custom UI & PWA",
        text: "A “bahi-khata” (traditional Indian ledger) inspired interface, packaged as an installable PWA, avoiding a separate native build.",
      },
    ],
  },
  {
    name: "QuickPaste",
    tagline: "Secure Code & Text Sharing Platform",
    stack: ["Next.js", "Express.js", "MongoDB"],
    live: "https://quick-paste-omega.vercel.app/",
    github: "https://github.com/Kanak7105/QuickPaste",
    points: [
      {
        head: "Expiring Links",
        text: "Paste-sharing service with short shareable links and auto-expiry using MongoDB TTL indexes, removing the need for cleanup jobs.",
      },
      {
        head: "Secure Sharing",
        text: "Burn-after-read with atomic find-and-delete, verified race-safe under 50 concurrent requests (exactly one read succeeds); bcrypt-hashed password protection.",
      },
      {
        head: "API Protection",
        text: "Per-IP rate limiting, input validation and payload size limits on the Express API.",
      },
    ],
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["C", "C++", "JavaScript", "TypeScript", "SQL"] },
  {
    group: "Technical Skills",
    items: [
      "Data Structures and Algorithms",
      "OOP",
      "REST API Design",
      "Full-Stack Development",
      "Micro-frontends",
    ],
  },
  {
    group: "Frameworks & Libraries",
    items: [
      "Next.js",
      "React.js",
      "NestJS",
      "Node.js",
      "Express.js",
      "Tailwind CSS",
      "Emotion (CSS-in-JS)",
    ],
  },
  { group: "Databases", items: ["MongoDB", "PostgreSQL (Supabase)"] },
  {
    group: "Tools & Platforms",
    items: ["Git", "GitHub", "Azure DevOps (CI/CD)", "Postman", "VS Code"],
  },
];

export const achievements = [
  {
    head: "Smart India Hackathon",
    text: "Semi-finalist at Smart India Hackathon (SIH) 2025, a national-level hackathon.",
  },
  {
    head: "Leadership",
    text: "Vice Chairperson, IEEE Computer Society Student Chapter, Acropolis Institute of Technology and Research.",
  },
];

export const certifications = [
  { head: "Oracle", text: "Oracle Cloud Infrastructure Foundations Associate, Nov 2026" },
  { head: "NPTEL", text: "Database Management System" },
];
