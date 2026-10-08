# MewLink — Vite prototype

This is a local React + TypeScript + Vite prototype based on the inspected Figma Make design.

## Run locally

Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Open http://localhost:5173/ .

## Production build

```bash
npm run build
npm run preview
```

## Deployment

Vercel: Framework Preset = Vite; Build Command = npm run build; Output Directory = dist.

## Design synchronization

Changes to the original Figma design do **not** automatically update this repository. An additional AI-based design-to-code synchronization workflow is needed. GitHub -> Vercel auto-deploy can be enabled independently.
