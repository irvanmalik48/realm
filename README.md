# Realm

The personal website, digital garden, and publishing platform for Realm. Built with Next.js, React, TypeScript, and Tailwind CSS, connecting to `realm-api` over high-speed gRPC and REST.

---

## Features

- Portfolio & Work Experience: Highlights personal background, featured projects, open-source repositories, and self-hosted infrastructure.
- Markdown & MDX Articles: Long-form technical articles with Shiki syntax highlighting, KaTeX mathematical formulas, estimated reading times, tag taxonomy, and on-demand cache revalidation.
- User Accounts & Profile Management: Account registration and sign-in with email/password or Google and GitHub OAuth2, profile customization, and direct client-to-backend avatar uploads.
- Privacy-Preserving Analytics: Client-side telemetry tracker that forwards site domains and geo headers to `realm-api` without third-party tracking scripts.
- Contact Form: Clean contact interface with honeypot spam protection.
- Live Music Activity: Real-time synchronization with Last.fm displaying current playback and recent scrobbles.
- Live Infrastructure Status: Real-time status badge monitoring `realm-api` health and database connectivity.
- Dynamic Experience Controls: User-configurable smooth scrolling, custom cursor effects, performance mode toggle, and marquee ribbons.
- Responsive Design & Dark Mode: Sleek dark and light themes optimized across mobile, tablet, and desktop screens.

---

## Requirements

- Node.js 20 or later
- pnpm 10 or later
- An instance of `realm-api` for authentication, comments, contact messaging, and file storage

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/irvanmalik48/realm.git
cd realm
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

Copy the example configuration file and fill in your settings:

```bash
cp .env.example .env.local
```

Key settings to review:

- `NEXT_PUBLIC_SITE_URL`: Address of this website (for example, `https://irvanma.eu.org`).
- `API_URL`: Address of the backend API server (for example, `http://localhost:8080`).
- `NEXT_PUBLIC_API_URL`: Public HTTPS address of `realm-api` for client uploads and browser queries.
- `GRPC_API_URL`: Internal gRPC address of `realm-api` (for example, `127.0.0.1:50051`).

### 4. Start the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public web address of the site (for example, `https://irvanma.eu.org`) |
| `NEXT_PUBLIC_ENVIRONMENT` | Environment mode (`development`, `production`, `test`) |
| `API_URL` | Base URL of the backend API service (for example, `http://localhost:8080`) |
| `NEXT_PUBLIC_API_URL` | Public HTTP URL of `realm-api` for browser requests and direct uploads |
| `GRPC_API_URL` | Internal gRPC address of `realm-api` (for example, `127.0.0.1:50051`) |
| `API_TOKEN` | Administrative or service token used to authenticate backend requests |
| `REVALIDATION_SECRET` | Secret token used to authenticate on-demand ISR cache purges |
| `LASTFM_API_KEY` | Optional Last.fm API key to fetch recent music scrobbles |
| `LASTFM_API_SECRET` | Optional Last.fm API secret |

---

## Available Scripts

```bash
# Start local development server
pnpm dev

# Build production bundle
pnpm build

# Run production server
pnpm start

# Run ESLint checks
pnpm lint

# Run Oxlint static analysis
pnpm lint:oxlint

# Detect unused files and dependencies with Knip
pnpm run knip

# Run React Doctor health and performance audit
pnpm doctor

# Check TypeScript types
pnpm exec tsc --noEmit
```

---

## License

Licensed under the [Realm Collectives Community License (RCCL) Version 1.0](https://github.com/irvanmalik48/realm/blob/main/LICENSE).
