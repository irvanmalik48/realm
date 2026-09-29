import Container from "@/components/container";
import { DirectionalTransition } from "@/components/directional-transition";
import { Badge } from "@/components/ui/badge";
import { safeJsonLd } from "@/lib/utils";
import {
  ArrowLeft,
  CheckCircle2,
  Code2,
  FileCode2,
  GitCommit,
  GitPullRequest,
  KeyRound,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import type { WebPage, WithContext } from "schema-dts";

export const metadata: Metadata = {
  title: "Contribution Notice",
  description:
    "Contribution guidelines, cryptographic signature standards, and RCCL 1.0 licensing terms for realm and realm-api open-source repositories.",
  openGraph: {
    title: "Contribution Notice | realm.",
    description:
      "Guidelines, cryptographic commit standards, and licensing covenants for contributing to realm and realm-api.",
    url: "https://irvanma.eu.org/contribution",
  },
};

export default function ContributionNoticePage() {
  const jsonLd: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Contribution Notice",
    alternateName: "realm. | Contribution Notice",
    mainEntityOfPage: "https://irvanma.eu.org/contribution",
    description:
      "Contribution guidelines, cryptographic verification protocols, and open-source licensing notice for realm.",
    url: "https://irvanma.eu.org/contribution",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://irvanma.eu.org/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Contribution Notice",
          item: "https://irvanma.eu.org/contribution",
        },
      ],
    },
  };

  const highlights = [
    {
      icon: KeyRound,
      title: "Cryptographic Signatures",
      desc: "All commits must be cryptographically signed using verified SSH or GPG keys (git commit -S). Unsigned commits are rejected.",
    },
    {
      icon: GitCommit,
      title: "DCO & Conventional Commits",
      desc: "Commits must adhere to Conventional Commits formatting and include Developer Certificate of Origin sign-offs (git commit -s).",
    },
    {
      icon: ShieldCheck,
      title: "Zero-Vulnerability Audits",
      desc: "Backend contributions must pass make check (gosec, govulncheck, and buf lint) with zero warnings or security flaws.",
    },
    {
      icon: Code2,
      title: "RCCL 1.0 Licensing",
      desc: "All accepted contributions are licensed under the Realm Collectives Community License, preserving author attribution.",
    },
  ];

  return (
    <DirectionalTransition>
      <Container>
        {/* Navigation Breadcrumb */}
        <nav aria-label="Breadcrumb" className="w-full pt-4">
          <Link
            href="/"
            prefetch={true}
            transitionTypes={["nav-back"]}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            <span>Return to Realm</span>
          </Link>
        </nav>

        {/* Page Header */}
        <header className="w-full flex flex-col gap-3 pb-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="font-mono gap-1.5 py-1">
              <GitPullRequest className="size-3.5 text-primary" />
              <span>COMMUNITY / GUIDELINES</span>
            </Badge>
            <Badge variant="secondary" className="font-mono text-xs">
              RCCL 1.0 Standard
            </Badge>
            <Badge variant="secondary" className="font-mono text-xs">
              Strict Verification
            </Badge>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Contribution Notice
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed">
            realm is built upon the pillars of craftsmanship, overkill engineering,
            and shared open-source commons. This notice details our workflow
            conventions, verification standards, and licensing covenants.
          </p>
        </header>

        {/* Quick Highlights Grid */}
        <section aria-labelledby="contribution-highlights-heading" className="w-full">
          <h2 id="contribution-highlights-heading" className="sr-only">
            Contribution Standards Highlights
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-4.5 rounded-xl border border-border bg-card/40 flex flex-col gap-2.5 transition-colors hover:border-primary/40"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-4.5" />
                    </div>
                    <h3 className="font-semibold text-sm md:text-base text-foreground">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Contribution Article */}
        <article className="w-full bg-background rounded-xl border border-border overflow-hidden shadow-xs">
          <div className="w-full flex items-center justify-between px-5 py-3.5 border-b border-border bg-muted/20">
            <div className="flex items-center gap-2.5 text-muted-foreground">
              <FileCode2 className="size-4 text-primary" />
              <span className="text-sm font-mono tracking-tight text-foreground font-medium">
                CONTRIBUTING.md
              </span>
            </div>
            <span className="text-xs font-mono text-muted-foreground hidden sm:inline">
              Verified Pipeline Enforced
            </span>
          </div>

          <div className="p-5 md:p-8 flex flex-col gap-8 text-sm md:text-base leading-relaxed text-foreground/90">
            {/* Section 1 */}
            <section className="flex flex-col gap-3">
              <h2 className="text-lg md:text-xl font-bold text-foreground flex items-center gap-2">
                <span className="text-primary font-mono text-base">01.</span>
                Philosophy &amp; Open Source Spirit
              </h2>
              <p>
                We welcome contributions of all forms: bug fixes, performance
                optimizations, architectural enhancements, accessibility
                audits, and documentation refinements.
              </p>
              <p>
                To preserve high software quality and repository integrity, all
                contributions submitted to{" "}
                <strong className="text-foreground">realm</strong> and{" "}
                <strong className="text-foreground">realm-api</strong> are held to
                strict engineering and cryptographic verification standards.
              </p>
            </section>

            {/* Section 2 */}
            <section className="flex flex-col gap-3">
              <h2 className="text-lg md:text-xl font-bold text-foreground flex items-center gap-2">
                <span className="text-primary font-mono text-base">02.</span>
                Licensing Agreement (RCCL 1.0)
              </h2>
              <div className="space-y-3">
                <p>
                  By submitting a pull request, patch, or code contribution to any
                  realm repository, you agree that your contribution is provided
                  under the terms of the{" "}
                  <strong>Realm Collectives Community License (RCCL) Version 1.0</strong>.
                </p>
                <div className="p-4 rounded-lg border border-border bg-card/30 font-mono text-xs text-muted-foreground space-y-2 leading-relaxed">
                  <p className="font-bold text-foreground">
                    RCCL SECTION A SUMMARY:
                  </p>
                  <p>
                    1. A copy of the RCCL license must accompany any redistribution of the Work or Derivative Works.
                  </p>
                  <p>
                    2. All copyright, patent, trademark, and attribution notices from the original Source must be preserved.
                  </p>
                  <p>
                    3. The original author&apos;s rights must be respected in any form of distribution.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="flex flex-col gap-3">
              <h2 className="text-lg md:text-xl font-bold text-foreground flex items-center gap-2">
                <span className="text-primary font-mono text-base">03.</span>
                Git Standards &amp; Commit Requirements
              </h2>
              <p>
                Every commit merged into our repositories must satisfy the
                following three conditions:
              </p>
              <div className="space-y-3 my-1">
                <div className="p-4 rounded-lg border border-border bg-card/20 flex flex-col gap-2">
                  <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-primary" />
                    <span>1. Conventional Commits Specification</span>
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Format:{" "}
                    <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-primary">
                      type(scope): succinct description
                    </code>
                    . Permitted types:{" "}
                    <code>feat</code>, <code>fix</code>, <code>perf</code>,{" "}
                    <code>chore</code>, <code>docs</code>, <code>refactor</code>,{" "}
                    <code>test</code>.
                  </p>
                </div>

                <div className="p-4 rounded-lg border border-border bg-card/20 flex flex-col gap-2">
                  <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-primary" />
                    <span>2. Developer Certificate of Origin (DCO Sign-Off)</span>
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Every commit must include a Signed-off-by trailer verifying
                    your right to submit the patch. Use{" "}
                    <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-primary">
                      git commit -s
                    </code>
                    .
                  </p>
                </div>

                <div className="p-4 rounded-lg border border-border bg-card/20 flex flex-col gap-2">
                  <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-primary" />
                    <span>3. Cryptographic Signature Verification</span>
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    All commits must be cryptographically signed with an SSH or
                    GPG key registered on your GitHub account (
                    <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-primary">
                      git commit -S
                    </code>
                    ).
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="flex flex-col gap-3">
              <h2 className="text-lg md:text-xl font-bold text-foreground flex items-center gap-2">
                <span className="text-primary font-mono text-base">04.</span>
                Verification Gates &amp; Testing
              </h2>
              <p>
                Before proposing changes, ensure all automated verification gates pass locally:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-1">
                <div className="p-4 rounded-lg border border-border bg-card/30 flex flex-col gap-2">
                  <div className="flex items-center gap-2 font-mono text-xs font-semibold text-primary">
                    <Terminal className="size-4" />
                    <span>GO BACKEND (realm-api)</span>
                  </div>
                  <pre className="bg-muted/70 p-3 rounded text-xs font-mono overflow-x-auto text-foreground">
{`# 1. Run all unit & integration tests
go test -v ./test/...

# 2. Run security & vulnerability audits
make check`}
                  </pre>
                  <p className="text-xs text-muted-foreground">
                    Requires 0 gosec findings, 0 govulncheck issues, and clean buf lint.
                  </p>
                </div>

                <div className="p-4 rounded-lg border border-border bg-card/30 flex flex-col gap-2">
                  <div className="flex items-center gap-2 font-mono text-xs font-semibold text-primary">
                    <Terminal className="size-4" />
                    <span>FRONTEND (realm-reference)</span>
                  </div>
                  <pre className="bg-muted/70 p-3 rounded text-xs font-mono overflow-x-auto text-foreground">
{`# 1. Type-check TypeScript codebase
pnpm exec tsc --noEmit

# 2. Run Next.js linting
pnpm lint`}
                  </pre>
                  <p className="text-xs text-muted-foreground">
                    Requires zero type errors, clean ESLint, and responsive accessibility.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="flex flex-col gap-3">
              <h2 className="text-lg md:text-xl font-bold text-foreground flex items-center gap-2">
                <span className="text-primary font-mono text-base">05.</span>
                Responsible Security Vulnerability Disclosure
              </h2>
              <p>
                Security is taken with utmost seriousness. If you discover a
                security vulnerability (e.g., authentication bypass, Landlock
                sandbox escape, SSRF, or token forgery),{" "}
                <strong className="text-foreground">
                  do NOT open a public GitHub issue.
                </strong>
              </p>
              <p className="text-muted-foreground">
                Please report vulnerabilities confidentially via the{" "}
                <Link
                  href="/about"
                  prefetch={true}
                  transitionTypes={["nav-forward"]}
                  className="text-primary hover:underline font-medium"
                >
                  Contact Form
                </Link>{" "}
                or email directly to{" "}
                <a
                  href="mailto:irvanma@gnuweeb.org"
                  className="font-mono text-primary hover:underline"
                >
                  irvanma@gnuweeb.org
                </a>
                . We will acknowledge receipt within 48 hours and work with you
                on coordinated disclosure.
              </p>
            </section>

            {/* Section 6 */}
            <section className="flex flex-col gap-3 pt-2 border-t border-border">
              <h2 className="text-lg md:text-xl font-bold text-foreground flex items-center gap-2">
                <span className="text-primary font-mono text-base">06.</span>
                Community Covenant
              </h2>
              <p className="text-muted-foreground">
                We are committed to providing a friendly, safe, and welcoming
                environment for all contributors regardless of experience level,
                gender identity, race, or background. We expect all participants
                to communicate with empathy, accept constructive feedback
                gracefully, and focus on what is best for the collective
                engineering commons.
              </p>
            </section>
          </div>
        </article>

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
        />
      </Container>
    </DirectionalTransition>
  );
}
