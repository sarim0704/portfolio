# Sarim Azhar Portfolio - Full Stack Codebase

Premium dark cinematic portfolio for **Sarim Azhar** with React Vite frontend, GSAP/Lenis/Framer Motion animations, Express/MongoDB CMS backend, Cloudinary uploads, JWT admin dashboard, and Nodemailer contact form.

## Stack

- Frontend: React + Vite, Tailwind CSS, GSAP, Lenis, Framer Motion, Axios, Lucide React
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, Cloudinary, Multer, Nodemailer
- Deploy: Vercel frontend + Render backend + MongoDB Atlas

## Quick Start

### 1. Backend

```bash
cd server
npm install
cp .env.example .env
npm run seed
npm run dev
```

### 2. Frontend

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

Open frontend: http://localhost:5173
Backend API: http://localhost:5000/api

## Default Admin

Set in `server/.env`:

```env
ADMIN_EMAIL=your_admin_email@example.com
ADMIN_PASSWORD=replace_with_a_strong_admin_password
```

Admin route: `/admin`

## Important Notes

- GSAP SplitText is a paid plugin, so this project uses a custom character splitter that gives the same hero stagger effect.
- Resume PDF can be uploaded later from the admin dashboard.
- Live/GitHub links are prefilled where available; missing links can be edited from dashboard.
- Default portrait is included at `client/public/uploads/portrait.png`.

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for Render, Vercel, and GitHub settings.
