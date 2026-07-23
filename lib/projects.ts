export interface Project {
  id: string;
  title: string;
  tags: string[];
  description: string;
  longDescription: string;
  features: string[];
  takeaways: string[];
  status: "Live" | "Repository Only";
  githubUrl: string;
  liveUrl?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "richenia-shop",
    title: "Richenia Shop",
    tags: ["E-Commerce", "Full-Stack", "React/Next.js"],
    description:
      "Next.js e-commerce application featuring product catalog management, smooth cart flows, and modern UI.",
    longDescription:
      "Richenia Shop is a full e-commerce application built on Next.js, covering the complete customer journey from browsing the catalog to checkout, alongside an admin-facing management layer.",
    features: [
      "Product catalog with category browsing and search",
      "Persistent cart with smooth add/update/remove flows",
      "Responsive, modern UI built with Tailwind CSS",
      "Deployed and live on Vercel",
    ],
    takeaways: [
      "Structuring a Next.js app router project so catalog, cart, and checkout stay decoupled and easy to extend",
      "Keeping UI state predictable across cart interactions without over-fetching",
    ],
    status: "Live",
    githubUrl: "https://github.com/jirumil/Richenia-Shop",
    liveUrl: "https://richenia-shop.vercel.app",
  },
  {
    id: "guardrail-devops",
    title: "GuardRail DevOps Architecture",
    tags: ["DevOps", "CI/CD", "Docker", "Automation"],
    description:
      "DevOps pipeline architecture focusing on containerized deployments, security guardrails, and deployment workflows.",
    longDescription:
      "GuardRail is a DevOps pipeline architecture built to containerize deployments and enforce security guardrails throughout the delivery workflow, from local development to a reproducible deployment target.",
    features: [
      "Containerized services orchestrated with Docker Compose",
      "Deployment workflow structured around repeatable, guarded steps",
      "Environment-variable-driven configuration for portability",
      "Infrastructure-as-code approach to environment setup",
    ],
    takeaways: [
      "Designing guardrails into a deployment pipeline rather than bolting them on after the fact",
      "Keeping local Docker environments in parity with the deployed target",
    ],
    status: "Repository Only",
    githubUrl: "https://github.com/jirumil/guard-rail-devops",
  },
  {
    id: "richenia-ticketing-system",
    title: "Richenia Ticketing System",
    tags: ["Full-Stack", "Issue Tracking", "Workflow"],
    description:
      "Internal issue tracking and ticket management platform designed for rapid resolution workflows.",
    longDescription:
      "An internal issue tracking and ticket management platform built to support fast, structured resolution workflows for a small team, from ticket intake to close-out.",
    features: [
      "Ticket creation, status tracking, and assignment",
      "Structured workflow states designed for rapid triage",
      "Full-stack implementation covering both UI and data layer",
    ],
    takeaways: [
      "Modeling a ticket lifecycle that stays simple for a small team but doesn't box out future workflow states",
      "Balancing full-stack scope against a focused, internal-tool feature set",
    ],
    status: "Repository Only",
    githubUrl: "https://github.com/jirumil/richenia-ticketing-system",
  },
];
