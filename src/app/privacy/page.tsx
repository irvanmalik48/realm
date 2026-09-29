import Container from "@/components/container";
import { DirectionalTransition } from "@/components/directional-transition";
import { Badge } from "@/components/ui/badge";
import { safeJsonLd } from "@/lib/utils";
import {
  ArrowLeft,
  CheckCircle2,
  EyeOff,
  Lock,
  Server,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
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

  const highlights = [
    {
      icon: EyeOff,
      title: "Zero Third-Party Trackers",
      desc: "No Google Analytics, Meta Pixels, or commercial surveillance SDKs. Your browsing activity belongs solely to you.",
    },
    {
      icon: Lock,
      title: "PASETO v2 Cryptography",
      desc: "Session tokens are encrypted using modern symmetric PASETO keys, completely immune to legacy JWT algorithm confusion.",
    },
    {
      icon: Server,
      title: "Hardened Sandboxing",
      desc: "Backend microservices run under Linux kernel Landlock LSM sandboxing, strictly constraining access to verified storage paths.",
    },
    {
      icon: UserCheck,
      title: "Unconditional Erasure",
      desc: "You can modify your profile or delete your entire account and associated comments at any time with zero friction.",
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
              <ShieldCheck className="size-3.5 text-primary" />
              <span>LEGAL / PRIVACY</span>
            </Badge>
            <Badge variant="secondary" className="font-mono text-xs">
              Effective: September 2026
            </Badge>
            <Badge variant="secondary" className="font-mono text-xs">
              Revision 1.2
            </Badge>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed">
            Privacy is a fundamental human right. This document details our
            strict data minimization policies, cryptographic safeguards, and
            your sovereign rights when interacting with{" "}
            <span className="font-semibold text-foreground">realm</span>.
          </p>
        </header>

        {/* Quick Highlights Grid */}
        <section aria-labelledby="highlights-heading" className="w-full">
          <h2 id="highlights-heading" className="sr-only">
            Privacy Commitments
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

        {/* Comprehensive Policy Card */}
        <article className="w-full bg-background rounded-xl border border-border overflow-hidden shadow-xs">
          <div className="w-full flex items-center justify-between px-5 py-3.5 border-b border-border bg-muted/20">
            <div className="flex items-center gap-2.5 text-muted-foreground">
              <Lock className="size-4 text-primary" />
              <span className="text-sm font-mono tracking-tight text-foreground font-medium">
                PRIVACY_POLICY.md
              </span>
            </div>
            <span className="text-xs font-mono text-muted-foreground hidden sm:inline">
              ISO/IEC 27001 &amp; GDPR Inspired
            </span>
          </div>

          <div className="p-5 md:p-8 flex flex-col gap-8 text-sm md:text-base leading-relaxed text-foreground/90">
            {/* Section 1 */}
            <section className="flex flex-col gap-3">
              <h2 className="text-lg md:text-xl font-bold text-foreground flex items-center gap-2">
                <span className="text-primary font-mono text-base">01.</span>
                Philosophy &amp; Scope
              </h2>
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
                marketing trackers or cross-site fingerprinting scripts on this
                platform.
              </p>
            </section>

            {/* Section 2 */}
            <section className="flex flex-col gap-3">
              <h2 className="text-lg md:text-xl font-bold text-foreground flex items-center gap-2">
                <span className="text-primary font-mono text-base">02.</span>
                Data Collection &amp; Purpose
              </h2>
              <p>We process information exclusively across four touchpoints:</p>
              <ul className="list-disc list-inside space-y-2.5 pl-2 text-muted-foreground">
                <li>
                  <strong className="text-foreground">Authentication &amp; User Accounts:</strong>{" "}
                  When you register directly or authenticate via Google or GitHub
                  OAuth, we store your chosen username, email address, avatar
                  URL, and cryptographic password hash (or provider identity ID).
                  Passwords are salted and hashed using bcrypt/Argon2; plaintext
                  passwords are never logged or stored.
                </li>
                <li>
                  <strong className="text-foreground">Interactive Comments &amp; Reactions:</strong>{" "}
                  When you comment on blog posts or react with emojis, your
                  submitted content and associated user handle are stored in our
                  PostgreSQL database to display alongside the discussion.
                </li>
                <li>
                  <strong className="text-foreground">Contact Form Inquiries:</strong>{" "}
                  When you submit the contact form, your name, email, subject,
                  and message are transmitted over encrypted webhooks to Irvan&apos;s
                  private notification channels (Discord, Telegram, or SMTP). A
                  honeypot field is utilized to drop automated spam bots silently
                  without processing.
                </li>
                <li>
                  <strong className="text-foreground">Media &amp; Avatar Uploads:</strong>{" "}
                  Images uploaded for user profiles are converted to modern WebP
                  formats and compressed using Zstandard (zstd) on our private,
                  self-hosted disk storage.
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="flex flex-col gap-3">
              <h2 className="text-lg md:text-xl font-bold text-foreground flex items-center gap-2">
                <span className="text-primary font-mono text-base">03.</span>
                Cookies &amp; Local Storage
              </h2>
              <p>
                We do not use advertising, retargeting, or third-party profiling
                cookies. Our browser storage footprint consists solely of:
              </p>
              <div className="overflow-x-auto my-2">
                <table className="w-full text-left text-xs md:text-sm border border-border rounded-lg overflow-hidden">
                  <thead className="bg-muted/40 font-mono text-muted-foreground uppercase text-[11px]">
                    <tr>
                      <th className="p-3 border-b border-border">Name</th>
                      <th className="p-3 border-b border-border">Storage</th>
                      <th className="p-3 border-b border-border">Lifespan</th>
                      <th className="p-3 border-b border-border">Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border font-mono">
                    <tr>
                      <td className="p-3 font-semibold text-primary">realm_token</td>
                      <td className="p-3 text-muted-foreground">Cookie / Header</td>
                      <td className="p-3 text-muted-foreground">Session / 30d</td>
                      <td className="p-3 text-muted-foreground font-sans">
                        Authenticated session token (PASETO v2)
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-primary">realm_cookie_consent</td>
                      <td className="p-3 text-muted-foreground">Cookie &amp; LocalStorage</td>
                      <td className="p-3 text-muted-foreground">1 Year</td>
                      <td className="p-3 text-muted-foreground font-sans">
                        Remembers your cookie banner preference
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-primary">theme / cursor_style</td>
                      <td className="p-3 text-muted-foreground">LocalStorage</td>
                      <td className="p-3 text-muted-foreground">Persistent</td>
                      <td className="p-3 text-muted-foreground font-sans">
                        Stores UI personalization and performance mode choices
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 4 */}
            <section className="flex flex-col gap-3">
              <h2 className="text-lg md:text-xl font-bold text-foreground flex items-center gap-2">
                <span className="text-primary font-mono text-base">04.</span>
                Third-Party Integrations &amp; Proxies
              </h2>
              <p>
                To provide specific external features without leaking user identities,
                we utilize strict proxy gateways:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2 text-muted-foreground">
                <li>
                  <strong className="text-foreground">GitHub API:</strong> Used
                  server-side to query public repository contribution matrices.
                  Your client IP is never exposed to GitHub during site visits.
                </li>
                <li>
                  <strong className="text-foreground">Google &amp; GitHub OAuth:</strong>{" "}
                  Used strictly for voluntary single sign-on when you choose to
                  link an identity provider. We request only minimal public profile scopes.
                </li>
                <li>
                  <strong className="text-foreground">Last.fm Scrobbler API:</strong>{" "}
                  Cached and proxied by our Go backend with stale-while-revalidate
                  and circuit-breaker mechanisms. Visitors do not connect directly to Last.fm.
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="flex flex-col gap-3">
              <h2 className="text-lg md:text-xl font-bold text-foreground flex items-center gap-2">
                <span className="text-primary font-mono text-base">05.</span>
                Security Architecture &amp; Defense in Depth
              </h2>
              <p>
                Our technological architecture enforces defense-in-depth principles:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-1">
                <div className="p-3.5 rounded-lg border border-border bg-card/20 flex flex-col gap-1">
                  <div className="flex items-center gap-2 font-mono text-xs font-semibold text-primary">
                    <CheckCircle2 className="size-3.5" />
                    <span>LANDLOCK LSM</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    File system isolation enforced via Linux kernel security modules.
                  </p>
                </div>
                <div className="p-3.5 rounded-lg border border-border bg-card/20 flex flex-col gap-1">
                  <div className="flex items-center gap-2 font-mono text-xs font-semibold text-primary">
                    <CheckCircle2 className="size-3.5" />
                    <span>AUTOMATIC TLS 1.3</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    All transit is encrypted via modern forward-secret ciphers.
                  </p>
                </div>
                <div className="p-3.5 rounded-lg border border-border bg-card/20 flex flex-col gap-1">
                  <div className="flex items-center gap-2 font-mono text-xs font-semibold text-primary">
                    <CheckCircle2 className="size-3.5" />
                    <span>SSRF &amp; BOT DEFENSE</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Strict private subnet filtering, honeypots, and token-bucket rate limits.
                  </p>
                </div>
                <div className="p-3.5 rounded-lg border border-border bg-card/20 flex flex-col gap-1">
                  <div className="flex items-center gap-2 font-mono text-xs font-semibold text-primary">
                    <CheckCircle2 className="size-3.5" />
                    <span>STRUCTURED AUDITING</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Trace-correlated logs sanitize all PII and tokens before emission.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section className="flex flex-col gap-3">
              <h2 className="text-lg md:text-xl font-bold text-foreground flex items-center gap-2">
                <span className="text-primary font-mono text-base">06.</span>
                Your Rights &amp; Data Erasure
              </h2>
              <p>
                Regardless of your geographic jurisdiction (GDPR, CCPA, or
                otherwise), you possess absolute sovereignty over your data:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-muted-foreground">
                <li>
                  <strong>Right to Access:</strong> You can review your profile
                  information directly in your account settings.
                </li>
                <li>
                  <strong>Right to Rectification:</strong> You may edit your
                  username, avatar, and password whenever you choose.
                </li>
                <li>
                  <strong>Right to Erasure (Forget Me):</strong> You can delete
                  your account permanently via the settings panel. Deletion is
                  instantaneous and purges your authentication records and session tokens.
                </li>
              </ul>
            </section>

            {/* Section 7 */}
            <section className="flex flex-col gap-3 pt-2 border-t border-border">
              <h2 className="text-lg md:text-xl font-bold text-foreground flex items-center gap-2">
                <span className="text-primary font-mono text-base">07.</span>
                Contact &amp; Data Requests
              </h2>
              <p className="text-muted-foreground">
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
