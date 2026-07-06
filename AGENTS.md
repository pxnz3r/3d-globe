# 3D Earth Topography Globe — Codebase Guide

## Architecture

A single-page React application rendering an interactive 3D Earth using Three.js via React Three Fiber (R3F).

```
index.html          HTML entry point
src/
  main.tsx          React root mount
  index.css         Tailwind CSS v4 + global styles
  App.tsx           Root component: UI overlay + scene + controls
  components/
    Scene.tsx       R3F Canvas: lighting, stars, camera, orbit controls
    Earth.tsx       3D Earth sphere with textures + displacement mapping
    Atmosphere.tsx  Atmospheric glow via custom GLSL shader
```

## Key Conventions

### Styling
- **Tailwind CSS v4** exclusively — no CSS modules, no styled-components
- Global styles in `index.css` only (html/body reset)
- Dark theme with `mix-blend-difference` for UI text overlay

### 3D Scene Architecture
- `<Canvas>` in `Scene.tsx` owns the R3F renderer
- Earth and Atmosphere are children of `<Suspense>` (textures load async)
- All scene objects inside `<Canvas>` — no DOM elements leak into 3D layer
- Props flow down from `App.tsx` → `Scene.tsx` → `Earth.tsx`

### State Management
- React `useState` in `App.tsx` — no external state library
- Sun azimuth (radians, -PI to PI) and intensity (0–10) drive directional light position
- `isRecordingMode` toggle hides UI overlays for clean screen captures

### 3D Pipeline
| File | Responsibility |
|------|---------------|
| `Scene.tsx` | Canvas, ambient + directional light, Stars, OrbitControls |
| `Earth.tsx` | SphereGeometry(2, 1024, 1024), texture loading, displacement mapping |
| `Atmosphere.tsx` | Custom ShaderMaterial (AdditiveBlending, BackSide) |

### Textures (loaded from CDN)
- `earth-blue-marble.jpg` — color/albedo map
- `earth-topology.png` — height map for displacement
- `earth-water.png` — specular/gloss map

## Build & Deploy

```bash
npm run dev      # Dev server on :3000
npm run build    # Production build to dist/
npm run preview  # Preview production build
```

GitHub Pages is configured via `.github/workflows/deploy.yml` — pushes to `main` auto-deploy.

## Adding a New Component

1. Create file in `src/components/`
2. Export as default function with TypeScript interface for props
3. Import in `Scene.tsx` (3D components) or `App.tsx` (UI components)
4. Follow naming: PascalCase for component files, camelCase for instances
