import Container from "@/components/container";
import { DirectionalTransition } from "@/components/directional-transition";
import { Badge } from "@/components/ui/badge";
import { safeJsonLd } from "@/lib/utils";
import {
  ArrowLeft,
  Code2,
  FileText,
  HeartHandshake,
  Scale,
  ShieldAlert,
  Terminal,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import type { WebPage, WithContext } from "schema-dts";

export const metadata: Metadata = {
  title: "Terms of Use & Services",
  description:
    "Terms of use and service conditions for realm (irvanma.eu.org). Community guidelines, acceptable use, and open-source licensing under RCCL 1.0.",
  openGraph: {
    title: "Terms of Use & Services | realm.",
    description:
      "Community guidelines, acceptable use policies, and open-source software licensing governing realm (irvanma.eu.org).",
    url: "https://irvanma.eu.org/terms",
  },
};

export default function TermsOfServicePage() {
  const jsonLd: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms of Use and Services",
    alternateName: "realm. | Terms of Service",
    mainEntityOfPage: "https://irvanma.eu.org/terms",
    description:
      "Terms of use, service guidelines, and licensing conditions for realm (irvanma.eu.org).",
    url: "https://irvanma.eu.org/terms",
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
          name: "Terms of Service",
          item: "https://irvanma.eu.org/terms",
        },
      ],
    },
  };

  const highlights = [
    {
      icon: Code2,
      title: "RCCL 1.0 Open Source",
      desc: "Software and architectural codebases are freely distributable and modifiable under the Realm Collectives Community License.",
    },
    {
      icon: HeartHandshake,
      title: "Civil & Constructive Community",
      desc: "Discussions, blog comments, and community interactions must remain constructive, respectful, and free of abuse.",
    },
    {
      icon: ShieldAlert,
      title: "No Malicious Exploitation",
      desc: "Automated volumetric DDoS, SSRF exploits, scraping without respectful rate limits, and spam bots are strictly prohibited.",
    },
    {
      icon: Scale,
      title: "AS-IS Platform Availability",
      desc: "Provided as a non-commercial engineering endeavor without commercial warranties or uptime SLAs.",
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
              <Scale className="size-3.5 text-primary" />
              <span>LEGAL / TERMS OF SERVICE</span>
            </Badge>
            <Badge variant="secondary" className="font-mono text-xs">
              Effective: September 2026
            </Badge>
            <Badge variant="secondary" className="font-mono text-xs">
              Version 1.0 (RCCL Aligned)
            </Badge>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Terms of Use &amp; Services
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed">
            Welcome to <span className="font-semibold text-foreground">realm</span>.
            These terms set forth the rights, responsibilities, and guidelines
            governing your access to this platform, its content, and its APIs.
          </p>
        </header>

        {/* Quick Highlights Grid */}
        <section aria-labelledby="terms-highlights-heading" className="w-full">
          <h2 id="terms-highlights-heading" className="sr-only">
            Terms Highlights
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

        {/* Terms Article */}
        <article className="w-full bg-background rounded-xl border border-border overflow-hidden shadow-xs">
          <div className="w-full flex items-center justify-between px-5 py-3.5 border-b border-border bg-muted/20">
            <div className="flex items-center gap-2.5 text-muted-foreground">
              <FileText className="size-4 text-primary" />
              <span className="text-sm font-mono tracking-tight text-foreground font-medium">
                TERMS_OF_SERVICE.md
              </span>
            </div>
            <span className="text-xs font-mono text-muted-foreground hidden sm:inline">
              RCCL 1.0 Core Standard
            </span>
          </div>

          <div className="p-5 md:p-8 flex flex-col gap-8 text-sm md:text-base leading-relaxed text-foreground/90">
            {/* Section 1 */}
            <section className="flex flex-col gap-3">
              <h2 className="text-lg md:text-xl font-bold text-foreground flex items-center gap-2">
                <span className="text-primary font-mono text-base">01.</span>
                Acceptance of Agreement
              </h2>
              <p>
                By visiting, accessing, or interacting with <strong>realm</strong>{" "}
                (hosted at{" "}
                <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">
                  irvanma.eu.org
                </code>{" "}
                and associated HTTP/gRPC gateways), you agree to be bound by these
                Terms of Use and our companion{" "}
                <Link
                  href="/privacy"
                  prefetch={true}
                  transitionTypes={["nav-forward"]}
                  className="text-primary hover:underline font-medium"
                >
                  Privacy Policy
                </Link>
                . If you do not agree to these terms, you should cease usage of
                the service.
              </p>
            </section>

            {/* Section 2 */}
            <section className="flex flex-col gap-3">
              <h2 className="text-lg md:text-xl font-bold text-foreground flex items-center gap-2">
                <span className="text-primary font-mono text-base">02.</span>
                Acceptable Use &amp; Network Conduct
              </h2>
              <p>
                You are encouraged to explore, read articles, inspect public APIs,
                and leave constructive commentary. However, you explicitly agree
                not to participate in prohibited activities, including:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2 text-muted-foreground">
                <li>
                  <strong className="text-foreground">Infrastructure Attacks:</strong>{" "}
                  Attempting denial-of-service (DoS/DDoS) attacks, brute-forcing
                  passwords or API endpoints, or fuzzing infrastructure outside
                  safe disclosure channels.
                </li>
                <li>
                  <strong className="text-foreground">Exploit Payloads:</strong>{" "}
                  Submitting malicious payloads (SQL injection, XSS vectors,
                  path traversal, or SSRF probes) against forms, query parameters,
                  or storage endpoints.
                </li>
                <li>
                  <strong className="text-foreground">Spam &amp; Automated Flooding:</strong>{" "}
                  Bypassing contact form honeypots, automating bulk comment
                  submissions, or scraping personal email addresses.
                </li>
                <li>
                  <strong className="text-foreground">Harassment &amp; Hate Speech:</strong>{" "}
                  Submitting offensive, threatening, defamatory, or unlawful
                  content in comments or communications.
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="flex flex-col gap-3">
              <h2 className="text-lg md:text-xl font-bold text-foreground flex items-center gap-2">
                <span className="text-primary font-mono text-base">03.</span>
                User Accounts &amp; Security
              </h2>
              <p>
                If you create an account via username/password or third-party
                OAuth (Google/GitHub), you are responsible for maintaining the
                confidentiality of your credentials and all activities occurring
                under your account.
              </p>
              <p>
                We reserve the right to suspend, terminate, or ban accounts that
                violate these terms, engage in malicious activity, or disrupt
                platform functionality without prior notice.
              </p>
            </section>

            {/* Section 4 */}
            <section className="flex flex-col gap-3">
              <h2 className="text-lg md:text-xl font-bold text-foreground flex items-center gap-2">
                <span className="text-primary font-mono text-base">04.</span>
                Intellectual Property &amp; Open Source Licensing
              </h2>
              <div className="space-y-3">
                <p>
                  <strong>Articles &amp; Literary Content:</strong> Blog posts,
                  essays, personal thoughts, and creative writings published on
                  realm are copyright &copy; 2024–2026 Irvan Malik Azantha unless
                  explicitly attributed otherwise. Quotations and fair use are
                  encouraged with proper attribution and canonical links.
                </p>
                <div className="p-4 rounded-lg border border-border bg-card/30 flex flex-col gap-2">
                  <div className="flex items-center gap-2 font-mono text-xs font-semibold text-primary">
                    <Terminal className="size-4" />
                    <span>SOFTWARE LICENSE: RCCL 1.0</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Source code for realm and realm-api is licensed under the{" "}
                    <strong>Realm Collectives Community License (RCCL) Version 1.0</strong>{" "}
                    (derived from RPL 1.b). You are free to inspect, copy, modify,
                    and distribute derivative works provided that all original
                    copyright, attribution, and license notices remain intact in
                    source form.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="flex flex-col gap-3">
              <h2 className="text-lg md:text-xl font-bold text-foreground flex items-center gap-2">
                <span className="text-primary font-mono text-base">05.</span>
                User-Generated Comments &amp; Content
              </h2>
              <p>
                You retain ownership of comments and messages you author. By
                submitting content to realm, you grant us a perpetual,
                royalty-free license to display, index, format, and moderate that
                content in connection with the blog post or platform.
              </p>
              <p>
                We reserve the right to remove any comment deemed spam, abusive,
                or irrelevant at our sole discretion.
              </p>
            </section>

            {/* Section 6 */}
            <section className="flex flex-col gap-3">
              <h2 className="text-lg md:text-xl font-bold text-foreground flex items-center gap-2">
                <span className="text-primary font-mono text-base">06.</span>
                Disclaimer of Warranty
              </h2>
              <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5 text-xs md:text-sm font-mono leading-relaxed text-muted-foreground space-y-2">
                <p className="font-bold text-foreground">
                  RCCL SECTION B DISCLAIMER:
                </p>
                <p>
                  THIS SOFTWARE AND PLATFORM ARE PROVIDED BY THE OWNERS AND
                  CONTRIBUTORS &quot;AS IS&quot; WITHOUT ANY WARRANTIES, WHETHER
                  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED
                  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
                  PURPOSE.
                </p>
                <p>
                  WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED,
                  TIMELY, SECURE, OR ERROR-FREE. SERVICE DOWNTIME OR CODE CHANGES
                  MAY OCCUR AT ANY TIME.
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section className="flex flex-col gap-3">
              <h2 className="text-lg md:text-xl font-bold text-foreground flex items-center gap-2">
                <span className="text-primary font-mono text-base">07.</span>
                Limitation of Liability
              </h2>
              <p>
                To the fullest extent permitted by applicable law, in no event
                shall Irvan Malik Azantha, realm contributors, or affiliated
                parties be liable for any direct, indirect, incidental, special,
                consequential, or punitive damages (including loss of data,
                revenue, or operational downtime) arising out of your access to or
                inability to access this service.
              </p>
            </section>

            {/* Section 8 */}
            <section className="flex flex-col gap-3 pt-2 border-t border-border">
              <h2 className="text-lg md:text-xl font-bold text-foreground flex items-center gap-2">
                <span className="text-primary font-mono text-base">08.</span>
                Modifications &amp; Inquiries
              </h2>
              <p className="text-muted-foreground">
                We reserve the right to revise these Terms of Service at any time.
                Continued use of realm following revisions indicates acceptance
                of updated terms. For questions regarding these terms, please open
                the{" "}
                <Link
                  href="/about"
                  prefetch={true}
                  transitionTypes={["nav-forward"]}
                  className="text-primary hover:underline font-medium"
                >
                  Contact Form
                </Link>{" "}
                or email{" "}
                <a
                  href="mailto:irvanma@gnuweeb.org"
                  className="font-mono text-primary hover:underline"
                >
                  irvanma@gnuweeb.org
                </a>
                .
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
