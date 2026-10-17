# Madebysatyam

Portfolio site — React, Vite, Tailwind CSS, Framer Motion.

## Commands

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

## CMS (Payload)

Content is editable via Payload in `cms/`.

```bash
npm run cms:install
npm run cms:dev      # http://localhost:3000/admin
npm run cms:seed     # load Aural + sample note
```

Set `VITE_CMS_URL=http://localhost:3000` in `.env` (see `.env.example`). The site falls back to local content if the CMS is offline. See `cms/README.md`.

## Structure

```
src/                 React app
  main.jsx           Entry, LazyMotion
  App.jsx            Homepage shell
  components/        NavLink, Reveal
    Navbar/          Site-wide header + nav (desktop notch, mobile drawer)
    CuttingMat/      Animated hero cutting mat (SVG + geometry)
  sections/          Homepage sections
  motion/            Shared animation presets
  hooks/             useIsMobile

styles/              Design tokens + layout
  global.css         CSS entry (imported from main.jsx)
  components/        Navbar, cutting-mat styles
  homepage.css       Page layout

global_styling_system.md   Locked design spec
assets/                    Logos, fonts
```
