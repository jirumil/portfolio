import type { LucideIcon } from "lucide-react";
import { ShieldCheck, ShoppingCart } from "lucide-react";

export interface Project {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  longDescription: string;
  architecture: string[];
  stats: { label: string; value: string }[];
  stack: string[];
  githubUrl: string;
  liveUrl: string;
  accent: "violet" | "cyan";
  icon: LucideIcon;
}

export const PROJECTS: Project[] = [
  {
    id: "guardrail",
    eyebrow: "Platform / DevOps",
    title: "GuardRail",
    description:
      "Enterprise-grade asynchronous file ingestion and malware/threat-scanning pipeline.",
    longDescription:
      "GuardRail is an asynchronous file ingestion and malware/threat-scanning pipeline built for enterprise workloads. Files are routed through async blob storage, scanned by containerized workers, and the entire environment — from local development to cloud runtime — is defined as code so it can be reproduced or torn down deterministically.",
    architecture: [
      "Async blob routing decouples upload from scanning, so ingestion never blocks on scan latency.",
      "Local development runs the full pipeline via Docker Compose for parity with the deployed environment.",
      "Infrastructure is provisioned with Terraform targeting Azure Container Apps.",
      "CI/CD via GitHub Actions is planned but not yet implemented — the pipeline currently deploys manually.",
    ],
    stats: [
      { label: "Tests", value: "28" },
      { label: "Orchestration", value: "Compose" },
      { label: "IaC", value: "Terraform" },
    ],
    stack: ["Docker Compose", "Terraform", "Azure Container Apps", "Python"],
    githubUrl: "https://github.com/jirumil/guard-rail-devops",
    liveUrl: "https://guardrail.your-domain.dev",
    accent: "violet",
    icon: ShieldCheck,
  },
  {
    id: "richenia-shop",
    eyebrow: "E-commerce",
    title: "Richenia Shop",
    description:
      "Full e-commerce application covering the complete customer and admin flow.",
    longDescription:
      "Richenia Shop is a raw PHP/MySQL/vanilla-JS e-commerce application. An existing 47-file codebase was audited and upgraded for serverless deployment on Vercel via the vercel-php runtime — restructuring routes, adding a database-backed session handler, and wiring environment-variable-driven config with local XAMPP fallbacks.",
    architecture: [
      "All root-level PHP pages were restructured into an api/ directory to fit the vercel-php runtime model.",
      "Sessions are handled with a database-backed PHP session handler instead of the filesystem.",
      "Database config is environment-variable-driven, with XAMPP fallbacks for local development.",
      "Clean-URL rewrite rules are defined in vercel.json; auth/roles, order history, AJAX live search, coupons, and admin analytics were audited and confirmed already correctly implemented.",
    ],
    stats: [
      { label: "Files audited", value: "47" },
      { label: "Runtime", value: "vercel-php" },
      { label: "Sessions", value: "DB-backed" },
    ],
    stack: ["PHP", "MySQL", "Vanilla JS", "Vercel", "AJAX"],
    githubUrl: "https://github.com/jirumil/Richenia-Shop",
    liveUrl: "https://richenia-shop.vercel.app",
    accent: "cyan",
    icon: ShoppingCart,
  },
];