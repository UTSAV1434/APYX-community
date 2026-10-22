# APYX — Community Platform & Event Hub

> The official digital headquarters and event portal for the **APYX Community**. Built for builders, researchers, and innovators.

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database%20%26%20Auth-3ECF8E?style=flat&logo=supabase)](https://supabase.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)

---

## Overview

**APYX Community** is a modern, high-performance web platform designed to showcase community events, announcements, team members, photo galleries, and builder momentum. Built with Next.js App Router and Supabase, it features an ultra-refined, high-contrast visual design inspired by Apple Human Interface Guidelines and Luma's minimalist event styling.

---

## Key Features

- **Event Showcase & Registration**: Browse upcoming and past hackathons, workshops, and meetups with rich metadata, registration links, and detailed event itineraries.
- **Dynamic Announcements**: Stay up to date with community releases, opportunities, and milestone broadcasts.
- **Gallery & Memory Vault**: Event albums, photo collections, and moment archives with immersive grid views and full-screen modals.
- **Team & Leadership Directory**: Core contributors, leads, and builder spotlight profiles.
- **Command Menu & Quick Search**: Global keyboard command menu (`Cmd/Ctrl + K`) powered by `cmdk` and `fuse.js` for rapid navigation.
- **Admin Dashboard**: Secure administrative suite (`/admin`) for managing events, team members, announcements, gallery uploads, and contact submissions.
- **Interactive Undo Support**: Built-in undo controls and actions for key community operations and management workflows.
- **Modern Design Language**: Crisp typography, tactile hover states, high-contrast dark theme, fluid Framer Motion animations, and zero-distraction layouts.

---

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack, React Server Components)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/), Radix UI / Base UI primitives
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL, Storage, RLS)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Search**: [Fuse.js](https://www.fusejs.io/) & [cmdk](https://cmdk.paco.me/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)

---

## Project Structure

```text
apyx-community/
├── src/
│   ├── app/                      # Next.js App Router pages and layouts
│   │   ├── (public)/             # Public-facing views (events, announcements, gallery, team)
│   │   ├── admin/                # Admin portal & management forms
│   │   ├── actions/              # Next.js Server Actions for Supabase mutations
│   │   └── api/                  # API endpoints and route handlers
│   ├── components/               # React components
│   │   ├── home/                 # Hero, Momentum, Activity Feed, Event carousels
│   │   ├── layout/               # Header, Footer, Command Menu, Nav
│   │   └── ui/                   # Modular design system cards, badges, dialogs, buttons
│   ├── lib/                      # Utilities, Supabase clients, helpers
│   └── types/                    # TypeScript interfaces and DB schema types
├── supabase/                     # Migrations and database seed scripts
└── public/                       # Static media, logos, and event imagery
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.18 or later recommended)
- [npm](https://www.npmjs.com/), [pnpm](https://pnpm.io/), or [bun](https://bun.sh/)
- A [Supabase](https://supabase.com/) project (or local Supabase CLI instance)

### 1. Clone the repository

```bash
git clone https://github.com/UTSAV1434/APYX-community.git
cd APYX-community
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Next.js development server with Turbopack |
| `npm run build` | Builds the production bundle |
| `npm run start` | Starts the production server |
| `npm run lint` | Runs ESLint checks across the codebase |

---

## Contributing

Contributions, feedback, and issue submissions are always welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is open-source and available under the [MIT License](LICENSE).
