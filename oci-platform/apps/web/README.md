# Omnia Stores — Luxury Demi-Fine Jewellery Maison & Digital Platform

Official Next.js production web application for Omnia Stores (omniastores.com), featuring certified 925 sterling silver bridal suites, simulated diamond collections, editorial syndication, AEO/GEO engine attribution, and bilingual localization (English & Arabic).

---

## Quick Start (Local & Hosting)

### 1. Requirements
- Node.js 18.18+ or 20+
- npm, pnpm, or yarn

### 2. Install Dependencies
```bash
npm install
```

### 3. Build for Production
```bash
npm run build
```

### 4. Start Production Server
```bash
npm start
```
By default, the server starts on `http://localhost:3000` (or the port defined by `PORT` environment variable).

---

## Hosting Deployment Options

### Option A: Vercel / Netlify (Recommended for Serverless)
1. Upload this folder to a GitHub repository or drag-and-drop into Netlify / Vercel.
2. Framework preset: **Next.js**.
3. Build command: `npm run build`.
4. Output directory: `.next`.
5. Deploy!

### Option B: cPanel / Plesk (Setup Node.js App)
1. Upload and extract the zip file to your server (e.g. `/home/username/omnia-web`).
2. Open **Setup Node.js App** in cPanel.
3. Set **Node.js version**: 20.x or higher.
4. Set **Application root**: `omnia-web` (folder name).
5. Set **Application startup file**: `node_modules/next/dist/bin/next` or use `server.js` with standalone build.
6. Click **Run NPM Install**.
7. Click **Run NPM Build** or run `npm run build` in Terminal.
8. Start/Restart the application.

### Option C: Linux VPS (Ubuntu / Debian with PM2 & Nginx)
```bash
# In the project directory:
npm install
npm run build

# Start with PM2:
pm2 start npm --name "omnia-web" -- start
pm2 save
pm2 startup
```

---

## Features & Pages
- `/` — Homepage with Hero Slider, 925 Silver Assay comparison, Collections, Editorial feed, Social Proof.
- `/about` — Omnia Fouad Founder Spotlight & Editorial Spread, Official 10-Question FAQ accordion (omniastores.com/pages/faq).
- `/products` — Live mirrored Shopify catalogue with direct checkout links.
- `/editorials` — Press syndication & editorial magazine feed (Vogue Arabia, Harper's Bazaar).
- `/trending` — Trending bridal suites and styling guides.
- `/backend` — Content intelligence and SEO syndication monitoring console.
- Full RTL & Arabic typography support.
