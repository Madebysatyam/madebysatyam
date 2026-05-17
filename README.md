# Madebysatyam

Portfolio site — React, Vite, Tailwind CSS, Framer Motion.

## Commands

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

## Structure

```
src/                 React app
  main.jsx           Entry, theme bootstrap, LazyMotion
  App.jsx            Homepage shell
  components/        Navbar, NavLink, ThemeToggle, Reveal
  sections/          Homepage sections
  context/           Theme state + switch sound
  motion/            Shared animation presets
  hooks/             useIsMobile

styles/              Design tokens + layout
  global.css         CSS entry (imported from main.jsx)
  components/        Navbar + theme toggle styles
  homepage.css       Page layout

global_styling_system.md   Locked design spec
assets/                    Logos, fonts
```
