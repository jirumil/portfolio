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
    tags: ["E-Commerce", "Full-Stack", "PHP / MySQL"],
    description:
      "E-commerce application featuring product catalog management, smooth cart flows, and modern UI — audited and hardened for serverless deployment.",
    longDescription:
      "Richenia Shop is a raw PHP/MySQL/vanilla-JS e-commerce application covering the complete customer journey from browsing the catalog to checkout, alongside an admin-facing management layer. An existing 47-file codebase was audited and upgraded for serverless deployment on Vercel via the vercel-php runtime.",
    features: [
      "Product catalog with category browsing and search",
      "Persistent cart with smooth add/update/remove flows",
      "Database-backed PHP session handler for serverless compatibility",
      "Deployed and live on Vercel via the vercel-php runtime",
    ],
    takeaways: [
      "Restructuring a raw PHP codebase to fit a serverless runtime model without a framework's routing conventions to lean on",
      "Keeping session and config handling portable between local XAMPP and the deployed environment",
    ],
    status: "Live",
    githubUrl: "https://github.com/jirumil/Richenia-Shop",
    liveUrl: "https://richenia-shop.vercel.app",
  },
  {
    id: "guardrail-devops",
    title: "GuardRail DevOps Architecture",
    tags: ["DevOps", "Docker", "Terraform", "Automation"],
    description:
      "DevOps pipeline architecture focusing on containerized deployments, security guardrails, and deployment workflows.",
    longDescription:
      "GuardRail is a DevOps pipeline architecture built to containerize deployments and enforce security guardrails throughout the delivery workflow, from local development to a reproducible deployment target.",
    features: [
      "Containerized services orchestrated with Docker Compose",
      "Deployment workflow structured around repeatable, guarded steps",
      "Environment-variable-driven configuration for portability",
      "Infrastructure-as-code approach to environment setup via Terraform",
    ],
    takeaways: [
      "Designing guardrails into a deployment pipeline rather than bolting them on after the fact",
      "Keeping local Docker environments in parity with the deployed target",
      "CI/CD via GitHub Actions is planned but not yet implemented — the pipeline currently deploys manually",
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