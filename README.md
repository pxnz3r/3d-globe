# 3D Earth Topography Globe 🌍

**Interactive 3D WebGL Earth** featuring high-resolution topographic displacement mapping, a real-time atmospheric glow shader, and dynamic solar shadow casting.

> **Live demo:** [https://pxnz3r.github.io/3d-globe](https://pxnz3r.github.io/3d-globe)

---

## ✨ Features

- **Topographic detail** — 1024×1024 sphere mesh with real elevation data via displacement mapping
- **Dynamic sunlight** — Adjustable sun azimuth and intensity with 4096² real-time shadow maps
- **Atmospheric glow** — Custom GLSL rim-light shader for a realistic atmospheric halo
- **Orbit controls** — Click-drag to rotate, scroll to zoom (2.5×–15× distance)
- **Screen-recording mode** — One-click toggle hides all UI overlays for clean captures
- **Starfield backdrop** — 5,000 randomly distributed stars with subtle twinkle animation
- **Responsive** — Adapts fluidly to any screen size

## 🖥️ Tech Stack

| Layer | Library | Role |
|-------|---------|------|
| UI Framework | [React 19](https://react.dev/) | Component tree & state |
| 3D Engine | [Three.js](https://threejs.org/) | WebGL rendering |
| React ↔ Three | [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) | Declarative JSX bindings |
| R3F Utilities | [Drei](https://github.com/pmndrs/drei) | OrbitControls, texture loader, Stars |
| Styles | [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first CSS |
| Icons | [Lucide React](https://lucide.dev/) | Sun, Eye icons |
| Build | [Vite](https://vitejs.dev/) | Dev server & production bundler |

## 🚀 Getting Started

```bash
npm install
npm run dev        # → http://localhost:3000
npm run build      # → dist/
npm run preview    # Preview production build
```

Requires **Node.js >= 18**.

## 🎮 Usage

- **Rotate** — Click & drag the globe
- **Zoom** — Scroll wheel
- **Sun controls** — Bottom-right sun icon → sliders for azimuth & intensity
- **Recording mode** — Bottom-right eye icon → hides UI overlays

## 📁 Project Structure

```
src/
├── main.tsx               App entry point / React root
├── index.css              Global styles, Tailwind import, reset
├── App.tsx                Root component: UI overlay + solar controls
└── components/
    ├── Scene.tsx          R3F Canvas: camera, lights, stars, orbit controls
    ├── Earth.tsx          Earth sphere: geometry, textures, displacement
    └── Atmosphere.tsx     Custom GLSL shader for atmospheric rim glow
```

## 🌐 Deployment

The site is hosted on **GitHub Pages** via a GitHub Actions workflow (`.github/workflows/deploy.yml`). Every push to `main` triggers a build and deploy.

To deploy your own fork:

1. Push to your repo's `main` branch
2. Go to **Settings → Pages** and set the source to **GitHub Actions**
3. The workflow at `.github/workflows/deploy.yml` handles the rest

## 📜 Data Attribution

Earth texture maps courtesy of [three-globe](https://unpkg.com/three-globe/example/img/) (public-domain NASA Blue Marble & SRTM topography data).

## 📄 License

MIT — feel free to use, modify, and share.
