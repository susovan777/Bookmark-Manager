# 🔖 Linkmark | Modern Bookmark Manager

**Linkmark** is a full-stack, high-performance bookmark management application. It features a sleek, glassmorphism-inspired UI and robust organization tools to help users save, categorize, and access their favorite web links seamlessly.

## 🚀 Key Features

- **Secure Authentication**: Custom registration and login flow powered by **Auth.js (NextAuth v5)** with PostgreSQL integration.
- **Dynamic Dashboard**: A dedicated dashboard for managing links, featuring real-time updates and loading states.
- **Organization**: Categorize bookmarks into collections with custom icons and colors for better visual grouping.
- **Modern UI/UX**: Built with a "Bento-grid" and glassmorphism aesthetic using **Tailwind CSS** and **Shadcn/UI** components.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop viewing.
- **API Layer**: RESTful API routes for bookmark CRUD operations and user management.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16+](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (Hosted on **Neon**)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Auth**: [Auth.js v5](https://authjs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn/UI](https://ui.shadcn.com/)
- **Validation**: [Zod](https://zod.dev/)
- **Package Manager**: [pnpm](https://pnpm.io/)

## 📂 Project Structure

```text
Linkmark
├── app/                  # Next.js App Router (Auth, Dashboard, API)
├── components/           # React components (Home sections, UI, Shared)
├── lib/                  # Shared utilities (Auth config, DB client, Zod schemas)
├── prisma/               # Database schema and migrations
├── public/               # Static assets (images, icons)
├── types/                # TypeScript type definitions & Module augmentation
└── auth.config.ts        # Edge-compatible Auth.js configuration
```

## Getting Started

1.  Clone the repository

    ```
    git clone https://github.com/susovan777/linkmark.git
    cd linkmark
    ```

2.  Install dependencies

    ```
    pnpm install
    ```

3.  Environment Setup

    Create a .env file in the root directory and add your credentials:

    ```
    DATABASE_URL="your-neon-postgres-url"
    AUTH_SECRET="your-nextauth-secret"
    ```

4.  Database Setup

    ```
    npx prisma generate
    npx prisma migrate dev
    ```

5.  Run the development server

    ```
    pnpm dev
    ```

    Open http://localhost:3000 with your browser to see the result.

## 📝 Roadmap & Future Features

[ ] Browser Extension for quick saving.

[ ] Auto-fetching metadata (title, image, description) from URLs.

[ ] Public/Private collection sharing.

[ ] Tagging system for advanced filtering.

## Author

Made with love by Susovan Sahoo
