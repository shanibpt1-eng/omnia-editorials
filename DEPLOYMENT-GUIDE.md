# 🚀 OMNIA STORES — PRODUCTION HOSTING & DEPLOYMENT GUIDE
### دليل استضافة وتشغيل منصة أمنية ستورز الفاخرة

This document explains how to deploy the **Omnia Stores** luxury web platform to any hosting provider.

---

## 📦 Prepared ZIP Packages

You have two ready-to-use ZIP files in this folder:

| File Name | Description | Recommended For |
| :--- | :--- | :--- |
| **`omnia-stores-web.zip`** (54 MB) | **Recommended!** Clean Next.js web application with all luxury assets, pages, components, and SEO schema. Cleaned of `node_modules` and cache. | **Vercel, Netlify, cPanel (Node.js), VPS (Ubuntu), Render, Railway, AWS Amplify** |
| **`omnia-stores-platform-full.zip`** (54 MB) | The full monorepo platform (`oci-platform`) with Next.js web app, Fastify API, BullMQ worker, PostgreSQL Prisma schema, Caddyfile, and Docker Compose. | **Docker VPS, Enterprise Cloud, Self-Hosted Infrastructure** |

---

## 🌐 1. Deploying on Vercel (Recommended — Fastest & Free/Low Cost)

Vercel is the creator of Next.js and the easiest platform for hosting this project.

1. **Option A: Drag & Drop via CLI**
   ```bash
   npm i -g vercel
   # Unzip omnia-stores-web.zip and enter the folder:
   cd omnia-stores-web
   vercel --prod
   ```
2. **Option B: Via GitHub**
   - Create a new repository on GitHub (e.g. `omnia-stores-web`).
   - Extract `omnia-stores-web.zip`, commit and push the files to GitHub.
   - Go to [vercel.com](https://vercel.com) → **Add New Project** → Import the repository.
   - Framework preset: **Next.js** (auto-detected).
   - Click **Deploy**. Your site will be live on an SSL HTTPS URL in 60 seconds!

---

## 🖥️ 2. Deploying on cPanel / Shared Hosting (Setup Node.js App)

If your hosting provider offers cPanel with Node.js support (Hostinger, Namecheap, GoDaddy, A2Hosting, etc.):

1. **Upload the ZIP File**:
   - Go to cPanel → **File Manager**.
   - Navigate to your home directory or `public_html/`.
   - Upload **`omnia-stores-web.zip`** and click **Extract**.
   - It will extract into a directory (e.g., `omnia-web`).

2. **Configure Node.js in cPanel**:
   - Go to cPanel → **Setup Node.js App**.
   - Click **Create Application**.
   - **Node.js version**: Select `20.x` or `18.x`.
   - **Application mode**: `Production`.
   - **Application root**: `omnia-web` (the folder where you extracted the files).
   - **Application URL**: Your domain (e.g. `yourdomain.com`).
   - **Application startup file**: `node_modules/next/dist/bin/next` or leave blank.
   - Click **Create**.

3. **Install Dependencies & Build**:
   - In the Node.js application page, click **Run NPM Install**.
   - Or open the cPanel Terminal and run:
     ```bash
     cd omnia-web
     npm install
     npm run build
     ```

4. **Start the Application**:
   - In cPanel, click **Restart** on the application card.
   - Your website is now live!

---

## 🐧 3. Deploying on Linux VPS (Ubuntu / Debian with PM2 & Nginx)

1. **Connect to your VPS**:
   ```bash
   ssh root@your-server-ip
   ```

2. **Install Node.js 20 & PM2**:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs nginx unzip
   sudo npm install -g pm2
   ```

3. **Upload and Extract**:
   ```bash
   mkdir -p /var/www/omnia-web
   cd /var/www/omnia-web
   # Upload omnia-stores-web.zip here using SCP or FileZilla, then:
   unzip omnia-stores-web.zip
   ```

4. **Install & Build**:
   ```bash
   npm install
   npm run build
   ```

5. **Start with PM2**:
   ```bash
   pm2 start npm --name "omnia-web" -- start
   pm2 save
   pm2 startup
   ```

6. **Configure Nginx Reverse Proxy**:
   Create `/etc/nginx/sites-available/omnia`:
   ```nginx
   server {
       listen 80;
       server_name omniastores.com www.omniastores.com;

       location / {
           proxy_pass http://127.0.0.1:3001;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
   Enable and restart Nginx:
   ```bash
   sudo ln -s /etc/nginx/sites-available/omnia /etc/nginx/sites-enabled/
   sudo nginx -t && sudo systemctl reload nginx
   ```
   *(Optional: run `sudo certbot --nginx` for free Let's Encrypt SSL!)*

---

## 🐳 4. Deploying with Docker Compose (Full Stack Monorepo)

If using **`omnia-stores-platform-full.zip`**:

1. Extract the zip:
   ```bash
   unzip omnia-stores-platform-full.zip
   cd oci-platform
   ```

2. Configure environment variables in `.env`:
   ```bash
   cp .env.example .env
   ```

3. Launch all containers (Web, API, Worker, PostgreSQL, Redis, Caddy):
   ```bash
   docker compose up -d --build
   ```

---

## ⚙️ Environment Variables (Optional)

You can customize these in `.env.local` or in your hosting control panel:

| Variable | Default Value | Purpose |
| :--- | :--- | :--- |
| `PORT` | `3001` (or `3000`) | Port for the web server |
| `NODE_ENV` | `production` | Production optimizations |
| `NEXT_PUBLIC_SITE_URL` | `https://omniastores.com` | Canonical domain for SEO/Schema |
| `NEXT_PUBLIC_SUPABASE_URL` | Built-in fallback | Supabase database connection |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Built-in fallback | Public client key |
