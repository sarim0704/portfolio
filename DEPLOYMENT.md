# Deployment Guide

## GitHub

- Push repo to GitHub
- Main branch: main

## Render backend

- New Web Service
- Root Directory: server
- Build Command: npm install
- Start Command: npm start
- Environment variables needed:

```env
PORT=5000
MONGO_URI=
JWT_SECRET=
ADMIN_EMAIL=
ADMIN_PASSWORD=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
CONTACT_RECEIVER_EMAIL=
CLIENT_URL=https://YOUR_VERCEL_URL.vercel.app
```

## Vercel frontend

- Import GitHub repo
- Framework Preset: Vite
- Root Directory: client
- Build Command: npm run build
- Output Directory: dist
- Environment variables:

```env
VITE_API_URL=https://YOUR_RENDER_BACKEND_URL.onrender.com/api
VITE_SITE_URL=https://YOUR_VERCEL_URL.vercel.app
```

## After Vercel deployment

- Update Render CLIENT_URL to final Vercel URL
- Redeploy backend
