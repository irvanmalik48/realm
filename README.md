# Realm

A modern, high-performance personal portfolio and digital garden built with **Next.js 16**, **React 19**, **Tailwind CSS v4**, and native **React View Transitions**.

---

## Features

- **Framework & Engine**: [Next.js 16](https://nextjs.org/) with Turbopack and [React 19](https://react.dev/).
- **Authentication & OIDC (PASETO)**: Complete authentication system supporting **Google OIDC** and **GitHub OAuth2** social login, plus traditional credentials (Email/Username + bcrypt), with tamper-proof **PASETO** tokens managed securely through Next.js BFF proxy routes and `httpOnly` session cookies.
- **Server Actions Data Fetching**: All external API interactions (`LastFM`, `Contact`, and `Health`) run server-side via Next.js Server Actions with zero browser CORS/CSP overhead and secure credential isolation.
- **Live Heartbeat Status Pulse**: Homepage real-time API status indicator polling backend `/health` every 20 seconds with animated radar pulses and latency metrics.
- **Design & Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom typography, fluid theme switching via `@wrksz/themes`, and glassmorphic UI elements.
- **Seamless Transitions**: Native View Transitions API integration with directional page slides and shared element morphs (`DirectionalTransition`).
- **MDX Blog & Digital Garden**:
  - Powered by `next-mdx-remote-client`.
  - Syntax highlighting with [Shiki](https://shiki.style/) and `rehype-pretty-code`.
  - Math formula rendering with [KaTeX](https://katex.org/) (`remark-math`, `rehype-katex`).
  - Automatic Table of Contents (`remark-flexible-toc`) and estimated reading time.
- **Live LastFM Integration**: Real-time now-playing widget and user profile stats with caching and optimistic UI.
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
│   │   ├── login/              # Sign in page with OIDC & credentials
│   │   ├── register/           # Create account page
│   │   ├── settings/           # Profile & site preferences
│   │   ├── globals.css         # Theme tokens, transitions, and root styles
│   │   └── layout.tsx          # Root layout with providers & metadata
│   ├── components/             # Reusable UI components & interactive widgets
│   ├── hooks/                  # Custom React hooks (useAuth, etc.)
│   ├── lib/                    # Utilities, types, auth context, and integrations
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

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Starts local Next.js dev server with Turbopack |
| `pnpm build` | Builds optimized production bundle |
| `pnpm start` | Starts production Next.js server |
| `pnpm lint` | Runs ESLint checks |
| `pnpm doctor` | Runs React diagnostic checks |

---

## License

Licensed under the [RCCL License](https://github.com/irvanmalik48/realm/blob/main/LICENSE).
