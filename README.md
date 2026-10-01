# NoteHub

NoteHub is a multi-page notes app built with Next.js App Router, TypeScript,
Axios, and TanStack Query. Notes are prefetched on the server and hydrated into
the client cache.

## Getting started

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_NOTEHUB_TOKEN` to
	your NoteHub API token.
3. Start the development server with `npm run dev`.

Open [http://localhost:3000](http://localhost:3000). The notes routes require a
valid API token. Production builds can be created with `npm run build` and
served with `npm start`.

## Routes

- `/` — application overview.
- `/notes` — searchable, paginated notes with create and delete actions.
- `/notes/[id]` — server-prefetched note details.