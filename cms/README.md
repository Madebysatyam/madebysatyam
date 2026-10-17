# Madebysatyam CMS (Payload)

Admin panel and content API for the portfolio site.

## Quick start

```bash
cd cms
npm install
npm run dev
```

Open [http://localhost:3000/admin](http://localhost:3000/admin) and create your first admin user.

Seed existing Aural + sample note content:

```bash
npm run seed
```

## What you can edit

| Collection / global | Website |
|---|---|
| Projects | Home work cards + `/projects/:slug` |
| Notes | Home notes strip + `/Notes` + `/notes/:slug` |
| Playground | Home strip + `/playground` |
| Testimonials | Kind words ticker |
| About | Full About page |
| Site settings | Footer contact row |
| Media | Uploaded images |

Case study body: prefer **blocks** (section heading, subheading, body, pull quote, image, insight cards, divider). Markdown is available as a fallback.

Notes body: sections can be **Paragraph**, **Heading**, or **Image** (with optional caption). Project images and note images share the same caption style on the site.

## Env

Copy `.env.example` if needed. Defaults:

- `DATABASE_URL=file:./payload.db` (SQLite, local file)
- `PAYLOAD_SECRET` — random secret
- `PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000`
- `FRONTEND_URL=http://localhost:5173` (CORS for the Vite app)

## Run with the website

Terminal 1: `cd cms && npm run dev`  
Terminal 2: from repo root `npm run dev`

The site reads `VITE_CMS_URL` (default `http://localhost:3000`) and falls back to local hardcoded content if the CMS is offline.
