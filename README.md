# Kanak Agrawal: Retro Desktop Portfolio

A portfolio styled as a late-90s desktop. Built with Next.js (App Router), Tailwind CSS v4 and [98.css](https://jdan.github.io/98.css/).

- Double-click desktop icons (or select + Enter) to open draggable windows with minimize, maximize and close
- Taskbar with Start menu (GitHub, LinkedIn, Email, Resume) and a live clock
- Below 768px wide it switches to a simple stacked list view

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Edit content

All resume content lives in `lib/data.ts`. The PDF is `public/Kanak_Agrawal_Resume.pdf`; replace that file to update it.

## Deploy to Vercel

Push to GitHub, then import the repo at vercel.com/new. No configuration is needed (framework: Next.js).
Or, from this folder: `npx vercel --prod`.
