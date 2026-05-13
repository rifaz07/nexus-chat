<div align="center">

# Nexus Chat

**An AI-powered chat application built for developers and creators.**  
Stream conversations with state-of-the-art language models, manage chat history, and switch between AI providers — all in a clean, minimal interface.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-nexus--chat--nine--phi.vercel.app-black?style=for-the-badge&logo=vercel)](https://nexus-chat-nine-phi.vercel.app)

</div>

---

## Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=flat-square&logo=prisma&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-black?style=flat-square&logo=vercel)

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| UI Library | React 19 |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Authentication | Better Auth (GitHub OAuth) |
| Database | PostgreSQL via Docker |
| ORM | Prisma 7 + `@prisma/adapter-pg` |
| State Management | Zustand + TanStack Query v5 |
| AI Provider | OpenRouter (multi-model) |
| AI SDK | Vercel AI SDK v6 |
| Deployment | Vercel |

---

## Features

- **GitHub OAuth** — one-click sign-in via Better Auth
- **Multi-model AI** — browse and switch between free OpenRouter models mid-session
- **Streaming responses** — real-time token streaming with the Vercel AI SDK
- **Chat history** — persistent conversations grouped by Today / Yesterday / This Week / Older
- **Model per chat** — each conversation remembers the model it was started with
- **Reasoning display** — surfaces chain-of-thought output when the model supports it
- **Rich message rendering** — code blocks with syntax highlighting, math, Mermaid diagrams, and more
- **Delete with redirect** — deleting the active chat redirects gracefully to home
- **Dark / light mode** — system-aware theme with manual toggle
- **Responsive layout** — collapsible sidebar works across all screen sizes

---

## Screenshots

> Screenshots coming soon. A live demo is available at [nexus-chat-nine-phi.vercel.app](https://nexus-chat-nine-phi.vercel.app).

---

## Getting Started

### Prerequisites

| Tool | Version |
|---|---|
| Node.js | ≥ 20 |
| npm | ≥ 10 |
| Docker | any recent version |

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/rifaz07/nexus-chat.git
cd nexus-chat

# 2. Install dependencies (this also generates the Prisma client via postinstall)
npm install

# 3. Copy the example env file and fill in your values
cp .env.example .env
```

### Environment Setup

Edit `.env` with your credentials (see the [Environment Variables](#environment-variables) table below), then:

```bash
# 4. Start the PostgreSQL database via Docker
docker compose up -d

# 5. Push the Prisma schema to your database
npx prisma db push

# 6. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

Create a `.env` file in the project root. All variables are required.

| Variable | Description | Example |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/nexuschat` |
| `BETTER_AUTH_SECRET` | Secret used to sign auth tokens — generate with `openssl rand -base64 32` | `abc123...` |
| `GITHUB_CLIENT_ID` | GitHub OAuth App client ID | `Iv1.abc123` |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth App client secret | `abc123...` |
| `OPENROUTER_API_KEY` | OpenRouter API key for AI model access | `sk-or-...` |
| `NEXT_PUBLIC_APP_URL` | Public base URL of the app | `http://localhost:3000` |

**GitHub OAuth setup:** Go to [GitHub Developer Settings](https://github.com/settings/developers) → New OAuth App. Set the callback URL to `{NEXT_PUBLIC_APP_URL}/api/auth/callback/github`.

**OpenRouter API key:** Sign up at [openrouter.ai](https://openrouter.ai) — a free tier is available and the app filters for free models by default.

---

## Project Structure

```
nexus-chat/
├── prisma/
│   └── schema.prisma          # Database models (User, Chat, Message, Session, Account)
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   └── sign-in/       # Sign-in page (GitHub OAuth)
│   │   ├── (root)/
│   │   │   ├── page.jsx       # Home / chat landing
│   │   │   └── chat/[chatId]/ # Individual chat page
│   │   └── api/
│   │       ├── auth/[...all]/ # Better Auth handler
│   │       ├── chat/          # Streaming chat endpoint
│   │       └── ai/get-models/ # Fetch available OpenRouter models
│   ├── components/
│   │   ├── ai-elements/       # AI output renderers (code, math, diagrams, media…)
│   │   ├── ui/                # shadcn/ui base components
│   │   └── providers/         # React context providers (theme, query)
│   ├── lib/
│   │   ├── auth.js            # Better Auth server config
│   │   ├── auth-client.js     # Better Auth browser client
│   │   ├── db.js              # Prisma client singleton
│   │   └── prompt.js          # NexusAI system prompt
│   └── modules/               # Feature-sliced business logic
│       ├── authentication/    # currentUser action, UserButton component
│       ├── chat/              # Chat CRUD actions, hooks, Zustand store, UI components
│       └── messages/          # Message rendering and active-chat loader
└── docker-compose.yml         # Local PostgreSQL service
```

---

## Git Branching Strategy

This project follows a **GitHub Flow**-inspired model with a stable integration branch:

```
main          ← production (auto-deployed to Vercel)
 └── dev      ← integration branch; all features merge here first
      ├── feature/<name>   ← new functionality
      └── fix/<name>       ← bug fixes
```

**Workflow:**

1. Branch off `dev` using `feature/` or `fix/` prefix
2. Make changes and commit using [Conventional Commits](https://www.conventionalcommits.org/)
3. Merge into `dev`
4. When `dev` is stable, merge `dev` → `main` to trigger a production deploy on Vercel

**Branch naming examples:**

| Type | Example Branch |
|---|---|
| New feature | `feature/model-selection` |
| Bug fix | `fix/sidebar-perf` |
| Hotfix | `fix/cors-trusted-origins` |

---

## Contributing

Contributions are welcome. Please follow the workflow below.

```bash
# 1. Fork the repository and clone your fork
git clone https://github.com/<your-username>/nexus-chat.git

# 2. Create a branch off dev
git checkout dev
git checkout -b feature/your-feature-name

# 3. Make your changes and commit with a conventional commit message
git commit -m "feat(chat): add message search"

# 4. Push and open a pull request targeting the dev branch
git push origin feature/your-feature-name
```

**Commit message format:**

```
<type>(<scope>): <short description>

Types: feat | fix | perf | refactor | docs | style | chore
```

**Before submitting a PR:**

- Run `npm run lint` and resolve any issues
- Ensure the app builds with `npm run build`
- Keep PRs focused — one concern per PR
- Target the `dev` branch, not `main`

---

## License

This project is licensed under the **MIT License**.  
See the [LICENSE](./LICENSE) file for details.

---

<div align="center">

Built by [rifaz07](https://github.com/rifaz07)

</div>
