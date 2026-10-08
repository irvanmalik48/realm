# Realm

The personal website, portfolio, and blog for Realm. Built with Next.js, React, and Tailwind CSS.

---

## Features

- Portfolio and Profile: Highlights personal background, projects, and work experience.
- Blog Articles: Markdown articles with code syntax highlighting, math formulas, and estimated reading times.
- User Accounts: Supports sign-in with email and password or social login through Google and GitHub.
- Contact Form: Allows visitors to send messages directly from the site.
- Music Activity: Displays currently playing songs or recent tracks from Last.fm.
- Live Service Status: Real-time status indicator showing whether the backend service is running.
- Clean Styling: Dark and light theme support with responsive layout for mobile and desktop screens.

---

## Requirements

- Node.js 20 or later
- pnpm 10 or later
- An optional running instance of `realm-api` for authentication, contact forms, and backend features

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

- `NEXT_PUBLIC_SITE_URL`: Address of this website (for example, `http://localhost:3000`).
- `API_URL`: Address of the backend API server (for example, `http://localhost:8080`).
- `API_TOKEN`: Optional API token to authorize backend requests.

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
| `API_TOKEN` | API token used to authenticate backend requests |
| `LASTFM_API_KEY` | Optional Last.fm API key to fetch recent music tracks |
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

# Run linter
pnpm lint

# Check TypeScript types
pnpm exec tsc --noEmit
```

---

## License

Licensed under the [Realm Collectives Community License (RCCL) Version 1.0](https://github.com/irvanmalik48/realm/blob/main/LICENSE).
