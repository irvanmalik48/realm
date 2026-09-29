# Realm

A modern, high-performance personal portfolio and digital garden built with **Next.js 16**, **React 19**, **Tailwind CSS v4**, and native **React View Transitions**.

---

## Features

- **Framework & Engine**: [Next.js 16](https://nextjs.org/) with Turbopack and [React 19](https://react.dev/).
- **Native React View Transitions**: Native browser View Transitions API integration with directional spatial slides (`nav-forward` / `nav-back`) and shared element morphs (`DirectionalTransition`).
- **Post Layout & Table of Contents**: Dedicated article layout featuring a sticky desktop Table of Contents sidebar with dynamic scroll-spy tracking and clean `prose dark:prose-invert` typography.
- **Legal & Governance Pages**:
  - **Privacy Policy (`/privacy`)**: Transparent data minimization disclosure, cookie audit table, PASETO v2 encryption, and Landlock LSM process sandboxing details.
  - **Terms of Use & Services (`/terms`)**: Acceptable use policy, network conduct rules, and open-source licensing under RCCL 1.0.
  - **Contribution Notice (`/contribution`)**: Conventional commits specification, Developer Certificate of Origin (`git commit -s`), cryptographic SSH/GPG signing (`git commit -S`), and quality verification gates.
- **Cookie Consent Banner**: Accessible, non-intrusive cookie consent banner linked directly to `/privacy` with persistent user preference storage.
- **Authentication & OIDC (PASETO)**: Complete authentication system supporting **Google OIDC** and **GitHub OAuth2** social login, plus traditional credentials (Email/Username + bcrypt), with tamper-proof **PASETO v2** tokens managed securely through Next.js BFF proxy routes and `httpOnly` session cookies.
- **Server Actions & gRPC Integration**: High-performance backend integration via gRPC and Server Actions (`LastFM`, `Contact`, and `Health`) with zero browser CORS overhead and isolated API keys.
- **Live Heartbeat Status Pulse**: Homepage real-time API status indicator polling backend `/health` with animated radar pulses, round-trip latency metrics, and edge region routing.
- **Design & Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom typography, fluid theme switching via `@wrksz/themes`, and glassmorphic UI elements.
- **MDX Blog & Digital Garden**:
  - Powered by `next-mdx-remote-client`.
  - Syntax highlighting with [Shiki](https://shiki.style/) and `rehype-pretty-code`.
  - Math formula rendering with [KaTeX](https://katex.org/) (`remark-math`, `rehype-katex`).
  - Automatic Table of Contents (`remark-flexible-toc`) and estimated reading time.
- **Live LastFM Integration**: Real-time now-playing widget and user profile stats with caching, circuit breakers, and optimistic UI.
- **Interactive Experience**:
  - Smooth inertia scrolling powered by [Lenis](https://github.com/darkroomengineering/lenis).
  - Custom responsive pointer with blend modes.
  - Command palette & accessible primitives with [Radix UI](https://www.radix-ui.com/).
- **Security & Type-Safety**:
  - Strict runtime environment validation using `@t3-oss/env-nextjs` and `zod`.
  - Server-only code isolation with `server-only`.
  - Secure HTTP headers and Content Security Policy (CSP).

---

## Project Structure

```
realm/
├── posts/                      # MDX blog content & articles
├── public/                     # Static assets, fonts, icons
├── src/
│   ├── actions/                # Next.js Server Actions (lastfm, contact, health)
│   ├── app/                    # Next.js App Router
│   │   ├── about/              # About page
│   │   ├── api/auth/           # Auth BFF proxy handlers (login, register, oauth, me)
│   │   ├── blog/               # Blog index & dynamic [slug] post pages
│   │   ├── contribution/       # Contribution notice & git guidelines
│   │   ├── login/              # Sign in page with OIDC & credentials
│   │   ├── privacy/            # Privacy policy & data governance
│   │   ├── register/           # Create account page
│   │   ├── settings/           # Profile & site preferences
│   │   ├── terms/              # Terms of use & services
│   │   ├── globals.css         # Theme tokens, transitions, and root styles
│   │   └── layout.tsx          # Root layout with providers & metadata
│   ├── components/             # Reusable UI components & interactive widgets
│   ├── hooks/                  # Custom React hooks (useAuth, etc.)
│   ├── lib/                    # Utilities, types, auth context, and gRPC client
│   └── env.ts                  # Type-safe environment schema
├── .env.example                # Environment variables template
├── next.config.ts              # Next.js configuration
├── package.json                # Project dependencies and scripts
└── tsconfig.json               # TypeScript configuration
```

---

## Getting Started

### Prerequisites
- Node.js `20.x` or later (or Bun / pnpm)
- [pnpm](https://pnpm.io/) recommended

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/irvanmalik48/realm.git
cd realm
pnpm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local` and configure your keys:
```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL of your site (e.g. `https://irvanma.eu.org`) |
| `NEXT_PUBLIC_ENVIRONMENT` | Environment (`development`, `production`, `test`) |
| `API_URL` | *(Optional)* Server-side backend API URL (e.g. `https://api.irvanma.eu.org` or `http://localhost:8080`) |
| `API_TOKEN` | *(Optional)* Cryptographically secure API token (`realm_tok_...`) generated via `cmd/token` |
| `LASTFM_API_KEY` | *(Optional)* LastFM API key for fetching scrobbles |
| `LASTFM_API_SECRET` | *(Optional)* LastFM API secret |

### 3. Start Development Server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Quality Verification & Scripts

```bash
# 1. Type-check TypeScript codebase
pnpm exec tsc --noEmit

# 2. Run ESLint checks
pnpm lint

# 3. Build optimized production bundle
pnpm build

# 4. Start production server
pnpm start
```

---

## Contributing

Please review the [Contribution Notice](https://irvanma.eu.org/contribution) before submitting pull requests. All commits must follow Conventional Commits formatting, include a Developer Certificate of Origin sign-off (`git commit -s`), and be cryptographically verified (`git commit -S`).

---

## License

Licensed under the [Realm Collectives Community License (RCCL) Version 1.0](https://github.com/irvanmalik48/realm/blob/main/LICENSE).
