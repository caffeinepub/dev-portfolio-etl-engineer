import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import {
  useCounter,
  useIntersectionObserver,
} from "./hooks/useIntersectionObserver";

// ─── Animated Section Wrapper ────────────────────────────────────────────────
function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useIntersectionObserver();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Section Label ────────────────────────────────────────────────────────────
function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex justify-center mb-4">
      <span
        className="text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full"
        style={{
          background: "rgba(59,130,246,0.12)",
          color: "var(--blue)",
          border: "1px solid rgba(59,130,246,0.25)",
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── Section Divider ─────────────────────────────────────────────────────────
function Divider() {
  return <div className="section-divider my-4" />;
}

// ─── Navbar ──────────────────────────────────────────────────────────────────
const navLinks = [
  { label: "Overview", href: "#project" },
  { label: "Problems", href: "#problems" },
  { label: "Solution", href: "#solution" },
  { label: "Architecture", href: "#architecture" },
  { label: "Features", href: "#features" },
  { label: "Stack", href: "#stack" },
  { label: "Impact", href: "#impact" },
  { label: "Code", href: "#code" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(10,10,15,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <a
            href="/"
            className="text-sm font-bold tracking-widest uppercase px-3 py-1.5 rounded-full"
            style={{
              color: "var(--blue)",
              border: "1px solid rgba(59,130,246,0.3)",
            }}
            data-ocid="nav.link"
          >
            DEV PORTFOLIO
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-xs font-medium px-3 py-1.5 rounded-full transition-colors duration-150 hover:bg-white/5"
                style={{ color: "var(--text-secondary)" }}
                data-ocid="nav.link"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden sm:inline-flex text-xs font-semibold px-4 py-1.5 rounded-full transition-all duration-150 hover:scale-105"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.623 0.214 258), oklch(0.588 0.26 292))",
                color: "white",
              }}
              data-ocid="nav.primary_button"
            >
              Get in Touch
            </a>
            <button
              type="button"
              className="lg:hidden p-2 rounded-lg"
              style={{ color: "var(--text-secondary)" }}
              onClick={() => setMenuOpen((p) => !p)}
              aria-label="Toggle menu"
              data-ocid="nav.toggle"
            >
              <div className="space-y-1.5">
                <span
                  className="block w-5 h-0.5 transition-all"
                  style={{
                    background: "var(--text-primary)",
                    transform: menuOpen
                      ? "rotate(45deg) translate(4px,4px)"
                      : "",
                  }}
                />
                <span
                  className="block w-5 h-0.5 transition-all"
                  style={{
                    background: "var(--text-primary)",
                    opacity: menuOpen ? 0 : 1,
                  }}
                />
                <span
                  className="block w-5 h-0.5 transition-all"
                  style={{
                    background: "var(--text-primary)",
                    transform: menuOpen
                      ? "rotate(-45deg) translate(4px,-4px)"
                      : "",
                  }}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="lg:hidden px-4 pb-4 pt-2 space-y-1"
          style={{
            background: "rgba(10,10,15,0.95)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="block text-sm font-medium px-3 py-2 rounded-lg hover:bg-white/5"
              style={{ color: "var(--text-secondary)" }}
              onClick={() => setMenuOpen(false)}
              data-ocid="nav.link"
            >
              {l.label}
            </a>
          ))}
          <button
            type="button"
            className="block w-full text-sm font-semibold px-3 py-2 rounded-lg text-center mt-2"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.623 0.214 258), oklch(0.588 0.26 292))",
              color: "white",
            }}
            onClick={() => {
              setMenuOpen(false);
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            data-ocid="nav.primary_button"
          >
            Get in Touch
          </button>
        </div>
      )}
    </header>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Aurora blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="aurora-blob-1 absolute w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            top: "5%",
            left: "-10%",
            background:
              "radial-gradient(circle, oklch(0.623 0.214 258), transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="aurora-blob-2 absolute w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            top: "20%",
            right: "-5%",
            background:
              "radial-gradient(circle, oklch(0.588 0.26 292), transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="aurora-blob-3 absolute w-[400px] h-[400px] rounded-full opacity-10"
          style={{
            bottom: "10%",
            left: "30%",
            background:
              "radial-gradient(circle, oklch(0.696 0.17 162), transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 w-full py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6"
              style={{
                background: "rgba(59,130,246,0.1)",
                color: "var(--blue)",
                border: "1px solid rgba(59,130,246,0.2)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse-slow"
                style={{ background: "var(--green)" }}
              />
              Data Engineer & Backend Engineer
            </div>

            <h1
              className="text-4xl sm:text-5xl xl:text-6xl font-bold leading-tight mb-6"
              style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
            >
              Automating{" "}
              <span className="gradient-text-blue">eCommerce Operations</span>{" "}
              with Scalable Data Pipelines
            </h1>

            <p
              className="text-base sm:text-lg mb-8 leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              I build production-ready ETL systems that sync inventory across
              multiple platforms in real-time, eliminating manual work and
              preventing revenue loss.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="#project"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.623 0.214 258), oklch(0.588 0.26 292))",
                  color: "white",
                  boxShadow: "0 0 24px rgba(59,130,246,0.3)",
                }}
                data-ocid="hero.primary_button"
              >
                View Project
                <svg
                  aria-hidden="true"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105 hover:bg-white/10"
                style={{
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "var(--text-primary)",
                  background: "rgba(255,255,255,0.04)",
                }}
                data-ocid="hero.secondary_button"
              >
                <svg
                  aria-hidden="true"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.92.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                GitHub
              </a>
            </div>
          </div>

          {/* Right: Glass feature card */}
          <div className="hidden lg:block">
            <div
              className="glass rounded-2xl p-6 card-hover"
              style={{ maxWidth: 420 }}
            >
              <p
                className="text-xs font-medium mb-1"
                style={{ color: "var(--blue)" }}
              >
                Featured Project
              </p>
              <h3
                className="text-lg font-bold mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                Real-time Inventory ETL System
              </h3>

              {/* Mini dashboard visual */}
              <div className="space-y-3">
                {[
                  { label: "WooCommerce Sync", pct: 92, color: "var(--blue)" },
                  { label: "Shopify Sync", pct: 99, color: "var(--green)" },
                  { label: "Amazon Sync", pct: 87, color: "var(--purple)" },
                ].map((item) => (
                  <div key={item.label}>
                    <div
                      className="flex justify-between text-xs mb-1"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <span>{item.label}</span>
                      <span style={{ color: item.color }}>{item.pct}%</span>
                    </div>
                    <div
                      className="h-1.5 rounded-full"
                      style={{ background: "rgba(255,255,255,0.06)" }}
                    >
                      <div
                        className="h-1.5 rounded-full"
                        style={{
                          width: `${item.pct}%`,
                          background: item.color,
                          transition: "width 1s ease",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 mt-5">
                {[
                  { val: "7+", label: "Vendors", color: "var(--blue)" },
                  { val: "100%", label: "Automated", color: "var(--green)" },
                  { val: "<24h", label: "Setup", color: "var(--purple)" },
                  { val: "4", label: "Formats", color: "var(--orange)" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl p-3 text-center"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div
                      className="text-xl font-bold"
                      style={{ color: s.color }}
                    >
                      {s.val}
                    </div>
                    <div
                      className="text-xs mt-0.5"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Project Overview ─────────────────────────────────────────────────────────
function ProjectOverview() {
  const { ref, isVisible } = useIntersectionObserver();
  const c1 = useCounter(100, isVisible);
  const c7 = useCounter(7, isVisible);
  const c4 = useCounter(4, isVisible);

  const stats = [
    {
      value: isVisible ? `${c1}%` : "0%",
      label: "Automation Rate",
      color: "var(--blue)",
    },
    {
      value: isVisible ? `${c7}+` : "0+",
      label: "Vendors Integrated",
      color: "var(--purple)",
    },
    { value: "<24hr", label: "Setup Time", color: "var(--green)" },
    {
      value: isVisible ? String(c4) : "0",
      label: "File Formats (CSV/XLSX/XML/API)",
      color: "var(--orange)",
    },
  ];

  return (
    <section id="project" className="py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-16">
          <SectionLabel label="Featured Project" />
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
          >
            Automated Inventory Sync &amp; ETL System
          </h2>
          <p
            className="max-w-2xl mx-auto text-base"
            style={{ color: "var(--text-secondary)" }}
          >
            A fully automated data pipeline designed to ingest, clean,
            normalize, and sync inventory data from multiple vendors into
            eCommerce platforms like WooCommerce, Shopify, and Amazon.
          </p>
        </AnimatedSection>

        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <AnimatedSection key={s.label} delay={i * 80}>
              <div className="glass rounded-2xl p-6 text-center card-hover">
                <div
                  className="text-4xl font-extrabold mb-2"
                  style={{ color: s.color }}
                >
                  {s.value}
                </div>
                <div
                  className="text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {s.label}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Problem Section ──────────────────────────────────────────────────────────
const problems = [
  {
    icon: "⚠️",
    title: "Overselling & Stock Mismatch",
    desc: "Products sell on multiple channels simultaneously, but stock isn't updated fast enough. Result: overselling, angry customers, and costly refunds.",
    accent: "var(--red)",
  },
  {
    icon: "⏱️",
    title: "Hours Lost to Manual Updates",
    desc: "Your team spends hours every day copy-pasting data between spreadsheets and platforms. That's not a workflow — that's a bottleneck.",
    accent: "var(--orange)",
  },
  {
    icon: "📁",
    title: "Inconsistent Vendor File Formats",
    desc: "Every vendor sends data differently — CSV, XLSX, XML, or API. Without normalization, one bad file breaks your entire inventory.",
    accent: "var(--red)",
  },
  {
    icon: "👁️",
    title: "No Centralized Visibility",
    desc: "Stock levels scattered across platforms, vendor portals, and spreadsheets. No single source of truth means decisions are made on stale data.",
    accent: "var(--orange)",
  },
];

function Problems() {
  return (
    <section id="problems" className="py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-16">
          <SectionLabel label="The Problem" />
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
          >
            Why Manual Inventory Management Fails
          </h2>
          <p className="text-base" style={{ color: "var(--text-secondary)" }}>
            Every hour without automation is an hour of potential revenue loss.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 gap-5">
          {problems.map((p, i) => (
            <AnimatedSection key={p.title} delay={i * 80}>
              <div
                className="glass rounded-2xl p-6 card-hover h-full"
                style={{ borderLeft: `2px solid ${p.accent}` }}
              >
                <div className="text-3xl mb-3">{p.icon}</div>
                <h3
                  className="text-base font-semibold mb-2"
                  style={{ color: p.accent }}
                >
                  {p.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {p.desc}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Solution Section ─────────────────────────────────────────────────────────
const solutions = [
  {
    icon: "⚙️",
    title: "Automated ETL Pipelines",
    desc: "Python-powered pipelines that run on schedule, process vendor files automatically, and push clean data to your platforms without human intervention.",
  },
  {
    icon: "🔌",
    title: "API & FTP/SFTP Integrations",
    desc: "Connect to any vendor via REST API, FTP, or SFTP. The system pulls data on schedule regardless of how vendors deliver it.",
  },
  {
    icon: "🗺️",
    title: "Data Normalization & SKU Mapping",
    desc: "Vendor SKUs mapped to your internal SKUs automatically. Inconsistent column names, formats, and encodings handled transparently.",
  },
  {
    icon: "🔁",
    title: "Scheduled Jobs with Retry Logic",
    desc: "Cron-based scheduling with exponential backoff retry mechanisms. If a vendor's server is slow, the system retries — no data loss.",
  },
  {
    icon: "⚡",
    title: "Real-Time Platform Sync",
    desc: "Inventory pushed to WooCommerce, Shopify, and Amazon via their APIs immediately after processing. Stock is always accurate.",
  },
];

function Solution() {
  return (
    <section id="solution" className="py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-16">
          <SectionLabel label="The Solution" />
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
          >
            A Production-Ready ETL System That Just Works
          </h2>
          <p className="text-base" style={{ color: "var(--text-secondary)" }}>
            Automated, reliable, and built to scale with your business.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {solutions.map((s, i) => (
            <AnimatedSection key={s.title} delay={i * 80}>
              <div
                className="glass rounded-2xl p-6 card-hover h-full"
                style={{
                  borderTop: `2px solid ${i % 2 === 0 ? "var(--green)" : "var(--blue)"}`,
                }}
              >
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3
                  className="text-base font-semibold mb-2"
                  style={{
                    color: i % 2 === 0 ? "var(--green)" : "var(--blue)",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {s.desc}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Architecture Section ─────────────────────────────────────────────────────
const archNodes = [
  { icon: "📦", title: "Vendor Files", desc: "CSV, XLSX, XML, API feeds" },
  {
    icon: "⬇️",
    title: "Data Ingestion",
    desc: "FTP/SFTP pull, API fetch, file watcher",
  },
  {
    icon: "🧹",
    title: "Cleaning & Normalization",
    desc: "Pandas transforms, type casting, deduplication",
  },
  {
    icon: "🔗",
    title: "SKU Mapping",
    desc: "Internal SKU lookup, validation, enrichment",
  },
  {
    icon: "🔄",
    title: "API Sync",
    desc: "WooCommerce, Shopify, Amazon REST APIs",
  },
  {
    icon: "⏰",
    title: "Scheduler",
    desc: "Cron jobs, retry logic, failure alerts",
  },
];

function Architecture() {
  return (
    <section id="architecture" className="py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-16">
          <SectionLabel label="System Design" />
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
          >
            How the Pipeline Works
          </h2>
          <p className="text-base" style={{ color: "var(--text-secondary)" }}>
            End-to-end data flow from vendor to eCommerce platform.
          </p>
        </AnimatedSection>

        {/* Desktop: horizontal flow */}
        <AnimatedSection>
          <div className="hidden md:flex items-center justify-center gap-0 overflow-x-auto">
            {archNodes.map((node, i) => (
              <div key={node.title} className="flex items-center">
                <div
                  className="glass rounded-2xl p-4 text-center card-hover"
                  style={{ minWidth: 130, maxWidth: 150, flexShrink: 0 }}
                >
                  <div className="text-2xl mb-2">{node.icon}</div>
                  <div
                    className="text-xs font-semibold mb-1"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {node.title}
                  </div>
                  <div
                    className="text-xs leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {node.desc}
                  </div>
                </div>
                {i < archNodes.length - 1 && (
                  <div className="flex-shrink-0 mx-1">
                    <svg
                      aria-hidden="true"
                      width="32"
                      height="20"
                      viewBox="0 0 32 20"
                      fill="none"
                    >
                      <line
                        x1="0"
                        y1="10"
                        x2="24"
                        y2="10"
                        className="flow-arrow"
                        stroke="oklch(0.623 0.214 258)"
                        strokeWidth="1.5"
                      />
                      <polyline
                        points="18,5 26,10 18,15"
                        fill="none"
                        stroke="oklch(0.623 0.214 258)"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile: vertical */}
          <div className="md:hidden space-y-3">
            {archNodes.map((node, i) => (
              <div key={node.title}>
                <div className="glass rounded-2xl p-4 flex items-start gap-4 card-hover">
                  <div className="text-2xl flex-shrink-0">{node.icon}</div>
                  <div>
                    <div
                      className="text-sm font-semibold mb-1"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {node.title}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {node.desc}
                    </div>
                  </div>
                </div>
                {i < archNodes.length - 1 && (
                  <div className="flex justify-center py-1">
                    <svg
                      aria-hidden="true"
                      width="20"
                      height="24"
                      viewBox="0 0 20 24"
                      fill="none"
                    >
                      <line
                        x1="10"
                        y1="0"
                        x2="10"
                        y2="18"
                        className="flow-arrow"
                        stroke="oklch(0.623 0.214 258)"
                        strokeWidth="1.5"
                      />
                      <polyline
                        points="5,14 10,22 15,14"
                        fill="none"
                        stroke="oklch(0.623 0.214 258)"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── Features Section ─────────────────────────────────────────────────────────
const features = [
  {
    icon: "📥",
    title: "Vendor Data Ingestion",
    desc: "Supports CSV, XLSX, XML files and REST/FTP/SFTP connections. Handles any vendor format automatically.",
  },
  {
    icon: "🧽",
    title: "Data Cleaning & Normalization",
    desc: "Strips bad data, normalizes column names, handles encoding issues, and fills missing values using configurable rules.",
  },
  {
    icon: "🏷️",
    title: "SKU Mapping & Validation",
    desc: "Maps vendor SKUs to internal product IDs. Validates against master catalog. Flags and logs unmapped SKUs.",
  },
  {
    icon: "🛒",
    title: "Multi-Platform Sync",
    desc: "Pushes inventory updates to WooCommerce, Shopify, and Amazon simultaneously via their official APIs.",
  },
  {
    icon: "🤖",
    title: "Automation & Scheduling",
    desc: "Fully automated with cron jobs. Runs silently in the background. Configurable intervals per vendor.",
  },
  {
    icon: "📋",
    title: "Logging & Error Alerts",
    desc: "Every run logged with timestamps. Failed jobs trigger email/Slack alerts with full stack traces for fast debugging.",
  },
];

function Features() {
  return (
    <section id="features" className="py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-16">
          <SectionLabel label="Features" />
          <h2
            className="text-3xl sm:text-4xl font-bold"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
          >
            Everything You Need to Automate Inventory
          </h2>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <AnimatedSection key={f.title} delay={i * 60}>
              <div className="glass rounded-2xl p-6 card-hover h-full">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3
                  className="text-sm font-semibold mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  {f.title}
                </h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {f.desc}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Tech Stack Section ───────────────────────────────────────────────────────
const techStack = [
  {
    emoji: "🐍",
    name: "Python",
    bg: "rgba(59,130,246,0.12)",
    color: "var(--blue)",
  },
  {
    emoji: "🐼",
    name: "Pandas",
    bg: "rgba(139,92,246,0.12)",
    color: "var(--purple)",
  },
  {
    emoji: "🗃️",
    name: "SQL Server",
    bg: "rgba(16,185,129,0.12)",
    color: "var(--green)",
  },
  {
    emoji: "🔌",
    name: "REST APIs",
    bg: "rgba(59,130,246,0.12)",
    color: "var(--blue)",
  },
  {
    emoji: "📡",
    name: "FTP/SFTP",
    bg: "rgba(249,115,22,0.12)",
    color: "var(--orange)",
  },
  {
    emoji: "⏰",
    name: "Cron Jobs",
    bg: "rgba(139,92,246,0.12)",
    color: "var(--purple)",
  },
  {
    emoji: "📊",
    name: "Power BI",
    bg: "rgba(239,68,68,0.12)",
    color: "var(--red)",
  },
];

function TechStack() {
  return (
    <section id="stack" className="py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-16">
          <SectionLabel label="Tech Stack" />
          <h2
            className="text-3xl sm:text-4xl font-bold"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
          >
            Built With Production-Grade Tools
          </h2>
        </AnimatedSection>

        <AnimatedSection>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((t) => (
              <div
                key={t.name}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold cursor-default transition-all duration-200 hover:scale-105"
                style={{
                  background: t.bg,
                  color: t.color,
                  border: `1px solid ${t.color}30`,
                  boxShadow: `0 0 12px ${t.color}15`,
                }}
              >
                <span>{t.emoji}</span>
                <span>{t.name}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── Impact Section ───────────────────────────────────────────────────────────
function ImpactCard({
  target,
  suffix,
  label,
  sub,
  color,
}: {
  target: number;
  suffix: string;
  label: string;
  sub: string;
  color: string;
}) {
  const { ref, isVisible } = useIntersectionObserver();
  const count = useCounter(target, isVisible, 1800);
  return (
    <div ref={ref} className="glass rounded-2xl p-8 text-center card-hover">
      <div className="text-5xl font-extrabold mb-2" style={{ color }}>
        {target === 0 ? "0" : isVisible ? count : 0}
        {suffix}
      </div>
      <div
        className="text-sm font-semibold mb-1"
        style={{ color: "var(--text-primary)" }}
      >
        {label}
      </div>
      <div className="text-xs" style={{ color: "var(--text-muted)" }}>
        {sub}
      </div>
    </div>
  );
}

function Impact() {
  return (
    <section id="impact" className="py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-16">
          <SectionLabel label="Impact" />
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
          >
            Real Results, Measurable Impact
          </h2>
          <p className="text-base" style={{ color: "var(--text-secondary)" }}>
            Numbers that speak louder than slides.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          <AnimatedSection delay={0}>
            <ImpactCard
              target={90}
              suffix="%"
              label="Reduction in Manual Work"
              sub="What took hours now takes seconds."
              color="var(--blue)"
            />
          </AnimatedSection>
          <AnimatedSection delay={80}>
            <ImpactCard
              target={0}
              suffix=""
              label="Overselling Incidents"
              sub="Stock is always accurate across all platforms."
              color="var(--green)"
            />
          </AnimatedSection>
          <AnimatedSection delay={160}>
            <ImpactCard
              target={99}
              suffix="%"
              label="Inventory Accuracy"
              sub="Near-perfect sync between vendors and platforms."
              color="var(--purple)"
            />
          </AnimatedSection>
          <AnimatedSection delay={240}>
            <div className="glass rounded-2xl p-8 text-center card-hover">
              <div className="text-4xl font-extrabold mb-2 gradient-text-green">
                Real-Time
              </div>
              <div
                className="text-sm font-semibold mb-1"
                style={{ color: "var(--text-primary)" }}
              >
                Decision Making
              </div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                Business decisions backed by live inventory data.
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// ─── Code Showcase ────────────────────────────────────────────────────────────
function CodeBlock({ code }: { code: string }) {
  return (
    <pre
      className="text-xs leading-relaxed overflow-x-auto p-5 rounded-xl font-mono"
      style={{
        background: "rgba(0,0,0,0.5)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: syntax highlighting */}
      <code dangerouslySetInnerHTML={{ __html: code }} />
    </pre>
  );
}

const etlCode = `<span class="code-comment"># ETL Pipeline - Vendor Data Processor</span>
<span class="code-keyword">import</span> pandas <span class="code-keyword">as</span> pd
<span class="code-keyword">from</span> pathlib <span class="code-keyword">import</span> Path
<span class="code-keyword">from</span> typing <span class="code-keyword">import</span> Optional
<span class="code-keyword">import</span> logging

<span class="code-keyword">class</span> <span class="code-class">VendorETLPipeline</span>:
    <span class="code-string">"""Production ETL pipeline for vendor inventory sync."""</span>
    
    <span class="code-keyword">def</span> <span class="code-func">__init__</span>(<span class="code-param">self</span>, vendor_config: dict):
        <span class="code-param">self</span>.config = vendor_config
        <span class="code-param">self</span>.logger = logging.<span class="code-func">getLogger</span>(__name__)
        
    <span class="code-keyword">def</span> <span class="code-func">extract</span>(<span class="code-param">self</span>, file_path: Path) -> pd.DataFrame:
        <span class="code-string">"""Extract data from vendor file (CSV/XLSX/XML)."""</span>
        ext = file_path.suffix.<span class="code-func">lower</span>()
        extractors = {
            <span class="code-string">'.csv'</span>: pd.read_csv,
            <span class="code-string">'.xlsx'</span>: pd.read_excel,
            <span class="code-string">'.xml'</span>: <span class="code-param">self</span>._parse_xml
        }
        <span class="code-keyword">if</span> ext <span class="code-keyword">not in</span> extractors:
            <span class="code-keyword">raise</span> <span class="code-class">ValueError</span>(<span class="code-func">f</span><span class="code-string">"Unsupported format: {ext}"</span>)
        <span class="code-keyword">return</span> extractors[ext](file_path)
    
    <span class="code-keyword">def</span> <span class="code-func">transform</span>(<span class="code-param">self</span>, df: pd.DataFrame) -> pd.DataFrame:
        <span class="code-string">"""Clean, normalize, and map vendor data."""</span>
        df = df.<span class="code-func">rename</span>(columns=<span class="code-param">self</span>.config[<span class="code-string">'column_map'</span>])
        df = df.<span class="code-func">dropna</span>(subset=[<span class="code-string">'sku'</span>, <span class="code-string">'quantity'</span>])
        df[<span class="code-string">'quantity'</span>] = df[<span class="code-string">'quantity'</span>].<span class="code-func">astype</span>(int).<span class="code-func">clip</span>(lower=<span class="code-keyword">0</span>)
        df[<span class="code-string">'sku'</span>] = df[<span class="code-string">'sku'</span>].str.<span class="code-func">strip</span>().str.<span class="code-func">upper</span>()
        <span class="code-keyword">return</span> df[[<span class="code-string">'sku'</span>, <span class="code-string">'quantity'</span>, <span class="code-string">'price'</span>]]`;

const apiCode = `<span class="code-comment"># WooCommerce Inventory Sync Client</span>
<span class="code-keyword">import</span> requests
<span class="code-keyword">from</span> requests.adapters <span class="code-keyword">import</span> HTTPAdapter
<span class="code-keyword">from</span> urllib3.util.retry <span class="code-keyword">import</span> Retry

<span class="code-keyword">class</span> <span class="code-class">WooCommerceSync</span>:
    <span class="code-string">"""Handles inventory sync to WooCommerce via REST API."""</span>
    
    <span class="code-keyword">def</span> <span class="code-func">__init__</span>(<span class="code-param">self</span>, store_url: str, key: str, secret: str):
        <span class="code-param">self</span>.base_url = <span class="code-func">f</span><span class="code-string">"{store_url}/wp-json/wc/v3"</span>
        <span class="code-param">self</span>.auth = (key, secret)
        <span class="code-param">self</span>.session = <span class="code-param">self</span>.<span class="code-func">_create_session</span>()
    
    <span class="code-keyword">def</span> <span class="code-func">_create_session</span>(<span class="code-param">self</span>) -> requests.Session:
        <span class="code-string">"""Session with retry and backoff strategy."""</span>
        session = requests.<span class="code-func">Session</span>()
        retry = <span class="code-class">Retry</span>(total=<span class="code-keyword">3</span>, backoff_factor=<span class="code-keyword">1</span>,
                      status_forcelist=[<span class="code-keyword">429</span>, <span class="code-keyword">500</span>, <span class="code-keyword">502</span>, <span class="code-keyword">503</span>])
        adapter = <span class="code-class">HTTPAdapter</span>(max_retries=retry)
        session.<span class="code-func">mount</span>(<span class="code-string">"https://"</span>, adapter)
        <span class="code-keyword">return</span> session
    
    <span class="code-keyword">def</span> <span class="code-func">update_stock</span>(<span class="code-param">self</span>, sku: str, quantity: int) -> bool:
        <span class="code-string">"""Update product stock level by SKU."""</span>
        product_id = <span class="code-param">self</span>.<span class="code-func">_get_product_id</span>(sku)
        <span class="code-keyword">if not</span> product_id:
            <span class="code-keyword">return False</span>
        response = <span class="code-param">self</span>.session.<span class="code-func">put</span>(
            <span class="code-func">f</span><span class="code-string">"{self.base_url}/products/{product_id}"</span>,
            auth=<span class="code-param">self</span>.auth,
            json={<span class="code-string">"stock_quantity"</span>: quantity}
        )
        <span class="code-keyword">return</span> response.status_code == <span class="code-keyword">200</span>`;

const loggingCode = `<span class="code-comment"># Structured Logging & Alerting System</span>
<span class="code-keyword">import</span> logging
<span class="code-keyword">import</span> json
<span class="code-keyword">from</span> datetime <span class="code-keyword">import</span> datetime
<span class="code-keyword">from</span> functools <span class="code-keyword">import</span> wraps

<span class="code-keyword">def</span> <span class="code-func">setup_logger</span>(name: str, log_file: str) -> logging.Logger:
    <span class="code-string">"""Configure structured JSON logging for pipeline runs."""</span>
    logger = logging.<span class="code-func">getLogger</span>(name)
    handler = logging.<span class="code-class">FileHandler</span>(log_file)
    handler.<span class="code-func">setFormatter</span>(<span class="code-class">JsonFormatter</span>())
    logger.<span class="code-func">addHandler</span>(handler)
    logger.<span class="code-func">setLevel</span>(logging.INFO)
    <span class="code-keyword">return</span> logger

<span class="code-keyword">class</span> <span class="code-class">JsonFormatter</span>(logging.Formatter):
    <span class="code-string">"""Emit structured JSON log records for easy parsing."""</span>
    
    <span class="code-keyword">def</span> <span class="code-func">format</span>(<span class="code-param">self</span>, record: logging.LogRecord) -> str:
        <span class="code-keyword">return</span> json.<span class="code-func">dumps</span>({
            <span class="code-string">"timestamp"</span>: datetime.<span class="code-func">utcnow</span>().<span class="code-func">isoformat</span>(),
            <span class="code-string">"level"</span>: record.levelname,
            <span class="code-string">"logger"</span>: record.name,
            <span class="code-string">"message"</span>: record.<span class="code-func">getMessage</span>(),
            <span class="code-string">"module"</span>: record.module,
        })

<span class="code-keyword">def</span> <span class="code-func">pipeline_run</span>(func):
    <span class="code-string">"""Decorator: logs run metadata and catches errors."""</span>
    <span class="code-keyword">@wraps</span>(func)
    <span class="code-keyword">def</span> <span class="code-func">wrapper</span>(*args, **kwargs):
        logger = logging.<span class="code-func">getLogger</span>(<span class="code-string">"pipeline"</span>)
        start = time.<span class="code-func">time</span>()
        <span class="code-keyword">try</span>:
            result = <span class="code-func">func</span>(*args, **kwargs)
            elapsed = time.<span class="code-func">time</span>() - start
            logger.<span class="code-func">info</span>(<span class="code-func">f</span><span class="code-string">"SUCCESS | {func.__name__} | {elapsed:.2f}s"</span>)
            <span class="code-keyword">return</span> result
        <span class="code-keyword">except</span> <span class="code-class">Exception</span> <span class="code-keyword">as</span> e:
            logger.<span class="code-func">error</span>(<span class="code-func">f</span><span class="code-string">"FAILED  | {func.__name__} | {str(e)}"</span>)
            <span class="code-func">send_alert</span>(func.__name__, <span class="code-func">str</span>(e))
            <span class="code-keyword">raise</span>
    <span class="code-keyword">return</span> wrapper`;

function CodeShowcase() {
  return (
    <section id="code" className="py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-16">
          <SectionLabel label="Code Quality" />
          <h2
            className="text-3xl sm:text-4xl font-bold"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
          >
            Clean, Documented, Production-Ready Code
          </h2>
        </AnimatedSection>

        <AnimatedSection>
          <Tabs defaultValue="etl" className="w-full">
            <TabsList
              className="mb-6 rounded-xl p-1"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <TabsTrigger
                value="etl"
                data-ocid="code.tab"
                className="rounded-lg text-sm font-medium"
              >
                ETL Pipeline
              </TabsTrigger>
              <TabsTrigger
                value="api"
                data-ocid="code.tab"
                className="rounded-lg text-sm font-medium"
              >
                API Integration
              </TabsTrigger>
              <TabsTrigger
                value="log"
                data-ocid="code.tab"
                className="rounded-lg text-sm font-medium"
              >
                Logging System
              </TabsTrigger>
            </TabsList>
            <TabsContent value="etl">
              <div className="glass rounded-2xl overflow-hidden">
                <div
                  className="flex items-center gap-2 px-5 py-3"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  <span
                    className="ml-2 text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    vendor_etl.py
                  </span>
                </div>
                <CodeBlock code={etlCode} />
              </div>
            </TabsContent>
            <TabsContent value="api">
              <div className="glass rounded-2xl overflow-hidden">
                <div
                  className="flex items-center gap-2 px-5 py-3"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  <span
                    className="ml-2 text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    woocommerce_sync.py
                  </span>
                </div>
                <CodeBlock code={apiCode} />
              </div>
            </TabsContent>
            <TabsContent value="log">
              <div className="glass rounded-2xl overflow-hidden">
                <div
                  className="flex items-center gap-2 px-5 py-3"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  <span
                    className="ml-2 text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    logger.py
                  </span>
                </div>
                <CodeBlock code={loggingCode} />
              </div>
            </TabsContent>
          </Tabs>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── About Section ────────────────────────────────────────────────────────────
const skills = [
  "Python",
  "SQL",
  "ETL/ELT",
  "Pandas",
  "REST APIs",
  "Data Pipelines",
  "Backend Systems",
  "Automation",
  "SQL Server",
  "Power BI",
  "FTP/SFTP",
  "Cron Jobs",
  "Git",
  "Linux",
];

function About() {
  return (
    <section id="about" className="py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-16">
          <SectionLabel label="About" />
          <h2
            className="text-3xl sm:text-4xl font-bold"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
          >
            Who Built This
          </h2>
        </AnimatedSection>

        <AnimatedSection>
          <div className="glass rounded-2xl p-8 sm:p-12 max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
              <div
                className="flex-shrink-0 w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.623 0.214 258), oklch(0.588 0.26 292))",
                  boxShadow: "0 0 32px rgba(59,130,246,0.3)",
                }}
              >
                DE
              </div>
              <div>
                <h3
                  className="text-xl font-bold mb-1"
                  style={{ color: "var(--text-primary)" }}
                >
                  Data Engineer
                </h3>
                <p className="text-sm" style={{ color: "var(--blue)" }}>
                  Backend & Data Systems
                </p>
              </div>
            </div>

            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: "var(--text-secondary)" }}
            >
              CS student focused on building scalable backend systems and
              real-world automation solutions. Passionate about Data
              Engineering, AI, and solving business problems through code. I
              don't build toy projects — I build systems that run in production
              and solve real business pain.
            </p>

            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <Badge
                  key={s}
                  variant="secondary"
                  className="text-xs px-3 py-1 rounded-full"
                  style={{
                    background: "rgba(59,130,246,0.1)",
                    color: "var(--text-primary)",
                    border: "1px solid rgba(59,130,246,0.2)",
                  }}
                >
                  {s}
                </Badge>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" className="py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-16">
          <SectionLabel label="Contact" />
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
          >
            Let's Build Something That Works
          </h2>
          <p className="text-base" style={{ color: "var(--text-secondary)" }}>
            Have a data problem? Let's talk.
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105"
              style={{
                background: "rgba(255,255,255,0.06)",
                color: "var(--text-primary)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
              data-ocid="contact.primary_button"
            >
              <svg
                aria-hidden="true"
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.92.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.623 0.214 258), oklch(0.588 0.26 292))",
                color: "white",
                boxShadow: "0 0 24px rgba(59,130,246,0.3)",
              }}
              data-ocid="contact.secondary_button"
            >
              <svg
                aria-hidden="true"
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <Divider />
      <div className="glass py-6 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            © {year} · Built with Python, Pandas &amp; care for clean code.
          </p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              style={{ color: "var(--blue)" }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ background: "#0a0a0f", minHeight: "100vh" }}>
      <Navbar />
      <main>
        <Hero />
        <Divider />
        <ProjectOverview />
        <Divider />
        <Problems />
        <Divider />
        <Solution />
        <Divider />
        <Architecture />
        <Divider />
        <Features />
        <Divider />
        <TechStack />
        <Divider />
        <Impact />
        <Divider />
        <CodeShowcase />
        <Divider />
        <About />
        <Divider />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
