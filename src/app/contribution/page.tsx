import Container from "@/components/container";
import { DirectionalTransition } from "@/components/directional-transition";
import { TableOfContents, type Heading } from "@/components/table-of-contents";
import { Button } from "@/components/ui/button";
import { TextScroll } from "@/components/ui/text-scroll";
import { cn, safeJsonLd } from "@/lib/utils";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
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

  const headings: Heading[] = [
    { id: "philosophy", text: "01. Philosophy & Open Source Spirit", level: 2 },
    { id: "licensing-rccl", text: "02. Licensing Agreement (RCCL 1.0)", level: 2 },
    { id: "git-commit-standards", text: "03. Git Standards & Commit Requirements", level: 2 },
    { id: "verification-gates", text: "04. Verification Gates & Testing", level: 2 },
    { id: "security-disclosure", text: "05. Responsible Security Disclosure", level: 2 },
    { id: "community-covenant", text: "06. Community Covenant", level: 2 },
  ];

  return (
    <DirectionalTransition>
      <div className="relative flex justify-center max-w-7xl mx-auto px-5 gap-10">
        <div className="hidden xl:block w-64 shrink-0">
          <div className="sticky top-24">
            <TableOfContents headings={headings} />
          </div>
        </div>

        <Container
          noPadding={true}
          className="mx-0 max-w-3xl min-w-0 gap-0 relative z-10 bg-background"
        >
          <Button asChild variant="ghost" className="self-start mb-8">
            <Link
              href="/"
              prefetch={true}
              transitionTypes={["nav-back"]}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="size-4" />
              Back to realm
            </Link>
          </Button>

          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4 text-center">
              Contribution Notice
            </h1>
            <p className="text-muted-foreground mb-4 text-center text-lg">
              Guidelines, cryptographic standards, and RCCL 1.0 licensing covenants
              for realm and realm-api.
            </p>
            <p className="text-sm text-muted-foreground mb-4 text-center font-mono">
              Published on September 2026 | RCCL 1.0 Compliant
            </p>
          </header>

          <article
            className={cn(
              "prose max-w-full dark:prose-invert prose-pre:font-mono prose-code:font-mono prose-headings:scroll-mt-24 pt-2",
            )}
          >
            <section id="philosophy">
              <h2>01. Philosophy &amp; Open Source Spirit</h2>
              <p>
                <strong>realm</strong> is built upon the pillars of craftsmanship,
                overkill engineering, and shared open-source commons. We welcome
                contributions of all forms: bug fixes, performance optimizations,
                architectural enhancements, accessibility audits, and documentation
                refinements.
              </p>
              <p>
                To preserve high software quality and repository integrity, all
                contributions submitted to <strong>realm</strong> and{" "}
                <strong>realm-api</strong> are held to strict engineering,
                conventional commit, and cryptographic verification standards.
              </p>
            </section>

            <section id="licensing-rccl">
              <h2>02. Licensing Agreement (RCCL 1.0)</h2>
              <p>
                By submitting a pull request, patch, or code contribution to any
                realm repository, you agree that your contribution is provided
                under the terms of the{" "}
                <strong>Realm Collectives Community License (RCCL) Version 1.0</strong>.
              </p>
              <div className="not-prose my-4 p-4 rounded-xl border border-border bg-card/40 font-mono text-xs text-muted-foreground space-y-2 leading-relaxed">
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
            </section>

            <section id="git-commit-standards">
              <h2>03. Git Standards &amp; Commit Requirements</h2>
              <p>
                Every commit merged into our repositories must satisfy the
                following three conditions:
              </p>
              <div className="not-prose space-y-3 my-4">
                <div className="p-4 rounded-xl border border-border bg-card/30 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <CheckCircle2 className="size-4 text-primary" />
                    <span>1. Conventional Commits Specification</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Format:{" "}
                    <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-primary">
                      type(scope): succinct description
                    </code>
                    . Permitted types: <code>feat</code>, <code>fix</code>,{" "}
                    <code>perf</code>, <code>chore</code>, <code>docs</code>,{" "}
                    <code>refactor</code>, <code>test</code>.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-border bg-card/30 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <CheckCircle2 className="size-4 text-primary" />
                    <span>2. Developer Certificate of Origin (DCO Sign-Off)</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Every commit must include a Signed-off-by trailer verifying
                    your right to submit the patch. Use{" "}
                    <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-primary">
                      git commit -s
                    </code>
                    .
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-border bg-card/30 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <CheckCircle2 className="size-4 text-primary" />
                    <span>3. Cryptographic Signature Verification</span>
                  </div>
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

            <section id="verification-gates">
              <h2>04. Verification Gates &amp; Testing</h2>
              <p>
                Before proposing changes, ensure all automated verification gates
                pass locally. We enforce zero vulnerabilities and strict schema
                linting:
              </p>

              {/* Exact side-by-side terminal cards as requested */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
                <div className="p-4 rounded-xl border border-border bg-card/60 flex flex-col gap-2.5">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-foreground">
                    <span className="text-primary font-bold">&gt;_</span>
                    <span>GO BACKEND (realm-api)</span>
                  </div>
                  <div className="bg-muted/90 rounded-lg p-3 font-mono text-xs text-foreground overflow-x-auto leading-relaxed border border-border/40">
                    <div className="text-muted-foreground"># 1. Run all unit &amp; integration tests</div>
                    <div className="text-foreground">go test -v ./test/...</div>
                    <div className="mt-2 text-muted-foreground"># 2. Run security &amp; vulnerability audits</div>
                    <div className="text-foreground">make check</div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Requires 0 gosec findings, 0 govulncheck issues, and clean buf lint.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-border bg-card/60 flex flex-col gap-2.5">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-foreground">
                    <span className="text-primary font-bold">&gt;_</span>
                    <span>FRONTEND (realm-reference)</span>
                  </div>
                  <div className="bg-muted/90 rounded-lg p-3 font-mono text-xs text-foreground overflow-x-auto leading-relaxed border border-border/40">
                    <div className="text-muted-foreground"># 1. Type-check TypeScript codebase</div>
                    <div className="text-foreground">pnpm exec tsc --noEmit</div>
                    <div className="mt-2 text-muted-foreground"># 2. Run Next.js linting</div>
                    <div className="text-foreground">pnpm lint</div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Requires zero type errors, clean ESLint, and responsive accessibility.
                  </p>
                </div>
              </div>
            </section>

            <section id="security-disclosure">
              <h2>05. Responsible Security Disclosure</h2>
              <p>
                Security is taken with utmost seriousness. If you discover a
                security vulnerability (such as an authentication bypass,
                Landlock sandbox escape, SSRF, or token forgery),{" "}
                <strong>do NOT open a public GitHub issue.</strong>
              </p>
              <p>
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

            <section id="community-covenant">
              <h2>06. Community Covenant</h2>
              <p>
                We are committed to providing a friendly, safe, and welcoming
                environment for all contributors. We expect all participants to
                communicate with empathy, accept constructive feedback gracefully,
                and focus on what is best for the collective engineering commons.
              </p>
            </section>
          </article>
        </Container>
      </div>

      <TextScroll
        className="text-5xl md:text-7xl text-muted-foreground/50 dark:font-semibold font-bold py-24 md:space-y-2"
        textClassName="py-1 md:py-3 font-doto"
        default_velocity={0.66}
        text="YOU'VE REACHED THE END, CUH.  "
      />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
    </DirectionalTransition>
  );
}
