# SkillSwap – Community Learning Exchange Platform

React mini project for Full Stack Development V8 · Module 3.

## Features

- **Authentication** – Signup & Sign in with JavaScript form validation; protected routes for registered users only
- **Skill discovery** – Browse community skills fetched via Fetch API from JSON
- **Search & categories** – Real-time keyword search and category filtering
- **Voice search** – Web Speech API (Chrome / Edge)
- **Favorites** – Add/remove favorites with LocalStorage persistence
- **Match requests** – Send skill swap requests/offers and manage status on Profile
- **Profile management** – Update offered/wanted skills and bio
- **Responsive UI** – Mobile-friendly layout with CSS Grid / Flexbox

## Getting started

```bash
cd skillswap-app
npm install
npm run dev
```

Open the local URL shown in the terminal (usually `http://localhost:5173`).

## Demo flow

1. Open the app → you are redirected to **Sign in**
2. Click **Create an account** and complete signup (password needs letters + a number, min 6 chars)
3. Sign in with the same credentials
4. Browse / search skills, try **Voice search**, save favorites, and send a **Match**
5. Visit **Favorites** and **Profile** to manage saved skills and match requests

## Build for production

```bash
npm run build
npm run preview
```

## Project structure

```
skillswap-app/
├── public/data/skills.json
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/api.js
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

## Tech stack

React 19 · React Router · Vite · CSS3 · Web Speech API · LocalStorage
