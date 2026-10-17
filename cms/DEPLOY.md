# Deploy the CMS to the public internet (Vercel)

This puts Payload admin online so you can edit from anywhere.  
The portfolio site stays on its own Vercel project and reads from this CMS URL.

## What you will create

1. A **Vercel project** for the `cms/` folder  
2. A **Postgres** database (Neon via Vercel)  
3. **Vercel Blob** for uploaded images  

## Step-by-step (Vercel dashboard)

### 1. New project from this GitHub repo

1. Open [vercel.com](https://vercel.com) → **Add New…** → **Project**
2. Import `madebysatyam` (or your repo name)
3. Before deploy, set:
   - **Root Directory** → `cms` (click Edit)
   - Framework: Next.js (auto)
4. Do **not** finish deploy yet — add env vars and storage first (or redeploy after)

### 2. Add Postgres

In the new project:

1. **Storage** → create / connect **Neon** or **Postgres**
2. Vercel will set `POSTGRES_URL` (and often `POSTGRES_URL_NON_POOLING`)

### 3. Add Blob storage

1. **Storage** → create **Blob** store  
2. Connect it to this project  
3. Vercel sets `BLOB_READ_WRITE_TOKEN`

### 4. Environment variables

In **Settings → Environment Variables**, set:

| Name | Value |
|---|---|
| `PAYLOAD_SECRET` | Long random string (e.g. 32+ characters) |
| `PAYLOAD_PUBLIC_SERVER_URL` | Your CMS URL, e.g. `https://madebysatyam-cms.vercel.app` (update after first deploy if needed) |
| `FRONTEND_URL` | Your live portfolio URL, e.g. `https://madebysatyam.com` (comma-separate previews if needed) |
| `POSTGRES_URL` | From step 2 (usually auto) |
| `BLOB_READ_WRITE_TOKEN` | From step 3 (usually auto) |
| `RESEND_API_KEY` | From [resend.com](https://resend.com) → API Keys (required for forgot-password emails) |
| `EMAIL_FROM_ADDRESS` | Verified sender, e.g. `noreply@yourdomain.com` (or `onboarding@resend.dev` for Resend testing) |
| `EMAIL_FROM_NAME` | `Madebysatyam CMS` |

Also set these for **Production** and **Preview**.

> Without `RESEND_API_KEY`, Payload accepts forgot-password requests but **does not send email** (it only logs to the server).

### 5. Deploy

Trigger a deploy. When it finishes:

1. Open `https://YOUR-CMS-URL/admin`
2. Create your admin user (first visit)
3. Add or seed content

### 6. Point the portfolio site at the CMS

In the **website** Vercel project (root of the repo, not `cms`):

| Name | Value |
|---|---|
| `VITE_CMS_URL` | `https://YOUR-CMS-URL` (no trailing slash) |

Redeploy the website so it picks up the variable.

## Local development (unchanged)

```bash
cd cms
cp .env.example .env   # keep DATABASE_URL=file:./payload.db
npm install
npm run dev            # http://localhost:3000/admin
```

Without `POSTGRES_URL` / postgres `DATABASE_URL`, the CMS still uses SQLite.  
Without `BLOB_READ_WRITE_TOKEN`, uploads still go to local `cms/media/`.

## Custom domain (optional)

In the CMS Vercel project → **Domains** → add e.g. `cms.madebysatyam.com`, then set:

- `PAYLOAD_PUBLIC_SERVER_URL=https://cms.madebysatyam.com`

## After deploy checklist

- [ ] `/admin` loads and you can log in  
- [ ] Upload an image in Media  
- [ ] Edit a project or note and Save  
- [ ] Portfolio site with `VITE_CMS_URL` shows the change  
