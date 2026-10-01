import Container from "@/components/container";
import { DirectionalTransition } from "@/components/directional-transition";
import { TableOfContents, type Heading } from "@/components/table-of-contents";
import { Button } from "@/components/ui/button";
import { TextScroll } from "@/components/ui/text-scroll";
import { cn, safeJsonLd } from "@/lib/utils";
import { ArrowLeft, Terminal } from "lucide-react";
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

  const headings: Heading[] = [
    { id: "acceptance-of-agreement", text: "01. Acceptance of Agreement", level: 2 },
    { id: "acceptable-use", text: "02. Acceptable Use & Conduct", level: 2 },
    { id: "accounts-security", text: "03. User Accounts & Security", level: 2 },
    { id: "intellectual-property", text: "04. Intellectual Property & RCCL 1.0", level: 2 },
    { id: "user-content", text: "05. User-Generated Comments", level: 2 },
    { id: "disclaimer-warranty", text: "06. Disclaimer of Warranty", level: 2 },
    { id: "limitation-liability", text: "07. Limitation of Liability", level: 2 },
    { id: "modifications-inquiries", text: "08. Modifications & Inquiries", level: 2 },
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
          <Button
            variant="ghost"
            className="self-start mb-8"
            render={
              <Link
                href="/"
                prefetch={true}
                transitionTypes={["nav-back"]}
                className="flex items-center gap-2"
              />
            }
          >
            <ArrowLeft className="size-4" />
            Back to realm
          </Button>

          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4 text-center">
              Terms of Use &amp; Services
            </h1>
            <p className="text-muted-foreground mb-4 text-center text-lg">
              Rights, responsibilities, and open-source licensing governing realm.
            </p>
            <p className="text-sm text-muted-foreground mb-4 text-center font-mono">
              Effective: September 2026 | Version 1.0 (RCCL Aligned)
            </p>
          </header>

          <article
            className={cn(
              "prose max-w-full dark:prose-invert prose-pre:font-mono prose-code:font-mono prose-headings:scroll-mt-24 pt-2",
            )}
          >
            <section id="acceptance-of-agreement">
              <h2>01. Acceptance of Agreement</h2>
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

            <section id="acceptable-use">
              <h2>02. Acceptable Use &amp; Conduct</h2>
              <p>
                You are encouraged to explore, read articles, inspect public APIs,
                and leave constructive commentary. However, you explicitly agree
                not to participate in prohibited activities, including:
              </p>
              <ul>
                <li>
                  <strong>Infrastructure Attacks:</strong> Attempting denial-of-service
                  (DoS/DDoS) attacks, brute-forcing passwords or API endpoints, or
                  fuzzing infrastructure outside safe disclosure channels.
                </li>
                <li>
                  <strong>Exploit Payloads:</strong> Submitting malicious payloads
                  (SQL injection, XSS vectors, path traversal, or SSRF probes) against
                  forms, query parameters, or storage endpoints.
                </li>
                <li>
                  <strong>Spam &amp; Automated Flooding:</strong> Bypassing contact
                  form honeypots, automating bulk comment submissions, or scraping
                  personal email addresses.
                </li>
                <li>
                  <strong>Harassment &amp; Abuse:</strong> Submitting offensive,
                  threatening, defamatory, or unlawful content in comments or
                  communications.
                </li>
              </ul>
            </section>

            <section id="accounts-security">
              <h2>03. User Accounts &amp; Security</h2>
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

            <section id="intellectual-property">
              <h2>04. Intellectual Property &amp; RCCL 1.0</h2>
              <p>
                <strong>Articles &amp; Literary Content:</strong> Blog posts,
                essays, personal thoughts, and creative writings published on
                realm are copyright &copy; 2024–2026 Irvan Malik Azantha unless
                explicitly attributed otherwise. Quotations and fair use are
                encouraged with proper attribution and canonical links.
              </p>
              <div className="not-prose my-4 p-4 rounded-xl border border-border bg-card/40 flex flex-col gap-2">
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
            </section>

            <section id="user-content">
              <h2>05. User-Generated Comments</h2>
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

            <section id="disclaimer-warranty">
              <h2>06. Disclaimer of Warranty</h2>
              <div className="not-prose my-4 p-4.5 rounded-xl border border-destructive/30 bg-destructive/5 text-xs md:text-sm font-mono leading-relaxed text-muted-foreground space-y-2">
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

            <section id="limitation-liability">
              <h2>07. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by applicable law, in no event
                shall Irvan Malik Azantha, realm contributors, or affiliated
                parties be liable for any direct, indirect, incidental, special,
                consequential, or punitive damages (including loss of data,
                revenue, or operational downtime) arising out of your access to or
                inability to access this service.
              </p>
            </section>

            <section id="modifications-inquiries">
              <h2>08. Modifications &amp; Inquiries</h2>
              <p>
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
