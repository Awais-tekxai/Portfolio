# Awais Khalid — Immersive Portfolio

Premium, futuristic developer portfolio built with **React 19**, **TypeScript (strict)**, **Vite**, **Tailwind CSS v4**, **Framer Motion**, **GSAP**, **Three.js / React Three Fiber / Drei**, **Lenis**, **Zustand**, **TanStack Query**, **React Router**, **Radix (shadcn-style UI)**, **Lottie**, and **React Intersection Observer**.

Design direction is inspired by the motion-rich, immersive feel of [redoyanulhaque.me](https://www.redoyanulhaque.me/), personalized for **Awais Khalid** (Frontend Engineer / React Developer, Lahore).

## Features

- **Hero**: Cinematic staggered text, particles, gradient grid, magnetic CTAs, scroll hint, and a **lazy-loaded WebGL scene** with a custom **robot + glowing ball** that follows the pointer using spring-style dynamics, idle motion, and section-driven lighting intensity.
- **Sections**: About (timeline cards), Skills (orb grid with intersection-driven springs), Experience (glowing timeline), Projects (tilt / spotlight cards + modal, data via React Query), Contact (glass form with `mailto` handoff).
- **UX**: Lenis smooth scrolling, scroll progress bar, active section spy for the nav, custom cursor (fine pointer + desktop), GSAP + Lottie loading screen, route transitions (`AnimatePresence`), scroll snapping on `main`, and manual Rollup chunking for `three`, `motion`, and `gsap`.

## Prerequisites

- **Node.js** 20+ (recommended)
- **npm** 10+

## Setup

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Scripts

| Command       | Description                    |
| ------------- | ------------------------------ |
| `npm run dev` | Start Vite dev server          |
| `npm run build` | Typecheck + production build |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint                         |

## Configuration

- **Path alias**: `@/*` → `src/*` (see `vite.config.ts` and `tsconfig.app.json`).
- **Strict TypeScript**: `strict` is enabled in `tsconfig.app.json`.
- **No environment variables are required** for the static marketing site. Add a `.env` later if you wire forms to an API.

## Customization

- **Profile & copy**: `src/data/profile.ts`
- **Experience**: `src/data/experience.ts`
- **Projects & links**: `src/data/projects.ts` (update `links.live` / `links.github` when you have URLs)
- **Skills**: `src/data/skills.ts`
- **3D scene tuning**: `src/components/robot/RobotFollower.tsx` and `RobotScene.tsx`

Social icons use generic Lucide shapes (`Code2`, `UserRound`, `Mail`) because the pinned `lucide-react@1.x` typings on npm omit brand icons; swap to your preferred icon pack if needed.

## Deployment

### GitHub Pages

The workflow builds production `dist` and pushes it to the **`gh-pages` branch** (not your source `index.html` on `main`).

1. Push to `main` and wait for the **Deploy to GitHub Pages** action to finish (green check on the Actions tab).
2. **Settings → Pages → Build and deployment**
   - **Source:** Deploy from a branch
   - **Branch:** `gh-pages` → `/ (root)`  
   - **Do not** use `main` / `(root)` — that publishes dev files and causes `GET …/src/main.tsx` 404 errors.
3. Open **https://awais-tekxai.github.io/Portfolio/** (hard refresh: Ctrl+Shift+R).

If you rename the repository, update `VITE_BASE_PATH` in `.github/workflows/deploy-pages.yml` to `/<new-repo-name>/`.

Local preview of the Pages build (PowerShell):

```powershell
$env:VITE_BASE_PATH="/Portfolio/"; npm run build; npx vite preview --base /Portfolio/
```

### Vercel

1. Push the repository to GitHub/GitLab/Bitbucket.
2. In [Vercel](https://vercel.com), **Import** the repo.
3. Framework preset: **Vite**. Build command: `npm run build`, output directory: `dist`.
4. `vercel.json` includes a SPA rewrite so client-side routes resolve correctly. Do **not** set `VITE_BASE_PATH` on Vercel (site runs at domain root).

## Performance notes

- The **Three.js** scene is **lazy-loaded** and uses adaptive **DPR** on coarse pointers.
- **Manual chunks** split heavy libraries (`three`, `framer-motion`, `gsap`) in `vite.config.ts`.
- Prefer **reduced motion**: `prefers-reduced-motion` short-circuits the loader timeline and custom cursor.

## License

Private portfolio — adjust as you see fit.
