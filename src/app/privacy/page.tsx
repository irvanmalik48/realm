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
  title: "Privacy Policy",
  description:
    "Privacy policy and data governance practices for realm (irvanma.eu.org). Zero tracking, zero commercial advertising, and strict data minimization.",
  openGraph: {
    title: "Privacy Policy | realm.",
    description:
      "Zero tracking, zero commercial advertising, and strict data minimization. Learn how your data is handled and protected in realm.",
    url: "https://irvanma.eu.org/privacy",
  },
};

interface PolicyItem {
  title: string;
  description: string;
}

const DATA_COLLECTION_POINTS: PolicyItem[] = [
  {
    title: "Authentication & User Accounts",
    description:
      "When you register directly or authenticate via Google or GitHub OAuth, we store your chosen username, email address, avatar URL, and cryptographic password hash (or provider identity ID). Passwords are salted and hashed using bcrypt/Argon2; plaintext passwords are never logged or stored.",
  },
  {
    title: "Interactive Comments & Reactions",
    description:
      "When you comment on blog posts or react with emojis, your submitted content and associated user handle are stored in our PostgreSQL database to display alongside the discussion.",
  },
  {
    title: "Contact Form Inquiries",
    description:
      "When you submit the contact form, your name, email, subject, and message are transmitted over encrypted webhooks to Irvan's private notification channels (Discord, Telegram, or SMTP). A honeypot field is utilized to drop automated spam bots silently.",
  },
  {
    title: "Media & Avatar Uploads",
    description:
      "Images uploaded for user profiles are converted to modern WebP formats and compressed using Zstandard (zstd) on our private, self-hosted disk storage.",
  },
];

const THIRD_PARTY_INTEGRATIONS: PolicyItem[] = [
  {
    title: "GitHub API",
    description:
      "Used server-side to query public repository contribution matrices. Your client IP is never exposed to GitHub during site visits.",
  },
  {
    title: "Google & GitHub OAuth",
    description:
      "Used strictly for voluntary single sign-on when you choose to link an identity provider. We request only minimal public profile scopes.",
  },
  {
    title: "Last.fm Scrobbler API",
    description:
      "Cached and proxied by our Go backend with stale-while-revalidate and circuit-breaker mechanisms. Visitors do not connect directly to Last.fm.",
  },
];

const USER_RIGHTS: PolicyItem[] = [
  {
    title: "Right to Access",
    description:
      "You can review your profile information directly in your account settings.",
  },
  {
    title: "Right to Rectification",
    description:
      "You may edit your username, avatar, and password whenever you choose.",
  },
  {
    title: "Right to Erasure (Forget Me)",
    description:
      "You can delete your account permanently via the settings panel. Deletion is instantaneous and purges your authentication records and session tokens.",
  },
];

export default function PrivacyPolicyPage() {
  const jsonLd: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy",
    alternateName: "realm. | Privacy Policy",
    mainEntityOfPage: "https://irvanma.eu.org/privacy",
    description:
      "Privacy policy and data protection practices for realm (irvanma.eu.org).",
    url: "https://irvanma.eu.org/privacy",
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
          name: "Privacy Policy",
          item: "https://irvanma.eu.org/privacy",
        },
      ],
    },
  };

  const headings: Heading[] = [
    { id: "philosophy", text: "01. Philosophy & Scope", level: 2 },
    { id: "data-collection", text: "02. Data Collection & Purpose", level: 2 },
    { id: "cookies-storage", text: "03. Cookies & Local Storage", level: 2 },
    { id: "third-party", text: "04. Third-Party Integrations & Proxies", level: 2 },
    { id: "security-sandboxing", text: "05. Security Architecture & Sandboxing", level: 2 },
    { id: "user-rights", text: "06. Your Rights & Data Erasure", level: 2 },
    { id: "contact-inquiries", text: "07. Contact & Data Requests", level: 2 },
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
              Privacy Policy
            </h1>
            <p className="text-muted-foreground mb-4 text-center text-lg">
              Data minimization, cryptographic safeguards, and user sovereignty in realm.
            </p>
            <p className="text-sm text-muted-foreground mb-4 text-center font-mono">
              Effective: September 2026 | Revision 1.2
            </p>
          </header>

          <article
            className={cn(
              "prose max-w-full dark:prose-invert prose-pre:font-mono prose-code:font-mono prose-headings:scroll-mt-24 pt-2",
            )}
          >
            <section id="philosophy">
              <h2>01. Philosophy &amp; Scope</h2>
              <p>
                <strong>realm</strong> (available at{" "}
                <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">
                  irvanma.eu.org
                </code>{" "}
                and associated gRPC microservices) is the personal digital
                sanctuary and engineering platform operated by Irvan Malik
                Azantha. We operate under a straightforward tenet:{" "}
                <em>we collect only what is strictly required to provide service features, and nothing more.</em>
              </p>
              <p>
                We do not sell, rent, monetize, or broker personal information to
                data aggregators or advertisers. There are zero programmatic
                marketing trackers, Google Analytics scripts, or cross-site
                fingerprinting beacons on this platform.
              </p>
            </section>

            <section id="data-collection">
              <h2>02. Data Collection &amp; Purpose</h2>
              <p>We process information exclusively across four touchpoints:</p>
              <ul>
                {DATA_COLLECTION_POINTS.map((item) => (
                  <li key={item.title}>
                    <strong>{item.title}:</strong> {item.description}
                  </li>
                ))}
              </ul>
            </section>

            <section id="cookies-storage">
              <h2>03. Cookies &amp; Local Storage</h2>
              <p>
                We do not use advertising or third-party profiling cookies. Our
                browser storage footprint consists solely of strictly necessary
                session tokens and user preference stores:
              </p>
              <div className="not-prose overflow-x-auto my-4">
                <table className="w-full text-left text-xs md:text-sm border border-border rounded-xl overflow-hidden bg-card/40">
                  <thead className="bg-muted/60 font-mono text-muted-foreground uppercase text-2xs">
                    <tr>
                      <th className="p-3.5 border-b border-border">Name</th>
                      <th className="p-3.5 border-b border-border">Storage</th>
                      <th className="p-3.5 border-b border-border">Lifespan</th>
                      <th className="p-3.5 border-b border-border">Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border font-mono text-xs">
                    <tr>
                      <td className="p-3.5 font-semibold text-primary">realm_token</td>
                      <td className="p-3.5 text-muted-foreground">Cookie / Header</td>
                      <td className="p-3.5 text-muted-foreground">Session / 30d</td>
                      <td className="p-3.5 text-muted-foreground font-sans">
                        Authenticated session token (PASETO v2)
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold text-primary">realm_cookie_consent</td>
                      <td className="p-3.5 text-muted-foreground">Cookie &amp; LocalStorage</td>
                      <td className="p-3.5 text-muted-foreground">1 Year</td>
                      <td className="p-3.5 text-muted-foreground font-sans">
                        Remembers your cookie banner preference
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold text-primary">theme / cursor_style</td>
                      <td className="p-3.5 text-muted-foreground">LocalStorage</td>
                      <td className="p-3.5 text-muted-foreground">Persistent</td>
                      <td className="p-3.5 text-muted-foreground font-sans">
                        Stores UI personalization and performance mode choices
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section id="third-party">
              <h2>04. Third-Party Integrations &amp; Proxies</h2>
              <p>
                To provide specific external features without leaking user
                identities, we utilize strict server-side proxy gateways:
              </p>
              <ul>
                {THIRD_PARTY_INTEGRATIONS.map((item) => (
                  <li key={item.title}>
                    <strong>{item.title}:</strong> {item.description}
                  </li>
                ))}
              </ul>
            </section>

            <section id="security-sandboxing">
              <h2>05. Security Architecture &amp; Sandboxing</h2>
              <p>
                Our technological architecture enforces defense-in-depth principles:
              </p>
              <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-4">
                <div className="p-4 rounded-xl border border-border bg-card/40 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 font-mono text-xs font-semibold text-primary">
                    <CheckCircle2 className="size-4" />
                    <span>LANDLOCK LSM</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Filesystem isolation enforced via Linux kernel security modules.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-border bg-card/40 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 font-mono text-xs font-semibold text-primary">
                    <CheckCircle2 className="size-4" />
                    <span>AUTOMATIC TLS 1.3</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    All transit is encrypted via modern forward-secret ciphers.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-border bg-card/40 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 font-mono text-xs font-semibold text-primary">
                    <CheckCircle2 className="size-4" />
                    <span>SSRF &amp; BOT DEFENSE</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Strict private subnet filtering, honeypots, and token-bucket rate limits.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-border bg-card/40 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 font-mono text-xs font-semibold text-primary">
                    <CheckCircle2 className="size-4" />
                    <span>STRUCTURED AUDITING</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Trace-correlated logs sanitize all PII and tokens before emission.
                  </p>
                </div>
              </div>
            </section>

            <section id="user-rights">
              <h2>06. Your Rights &amp; Data Erasure</h2>
              <p>
                Regardless of your geographic jurisdiction (GDPR, CCPA, or
                otherwise), you possess absolute sovereignty over your data:
              </p>
              <ul>
                {USER_RIGHTS.map((item) => (
                  <li key={item.title}>
                    <strong>{item.title}:</strong> {item.description}
                  </li>
                ))}
              </ul>
            </section>

            <section id="contact-inquiries">
              <h2>07. Contact &amp; Data Requests</h2>
              <p>
                If you have inquiries regarding this privacy policy or wish to
                exercise any data subject rights manually, please contact Irvan
                via the{" "}
                <Link
                  href="/about"
                  prefetch={true}
                  transitionTypes={["nav-forward"]}
                  className="text-primary hover:underline font-medium"
                >
                  Contact Form
                </Link>{" "}
                or via email at{" "}
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
