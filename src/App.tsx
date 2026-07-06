import { useState } from 'react';
import Scene from './components/Scene';
import { Sun, Eye, EyeOff } from 'lucide-react';

/**
 * Root application component.
 *
 * Composes the 3D scene (full-viewport canvas) with a cinematic UI overlay
 * and a floating control panel for adjusting solar parameters.
 *
 * State:
 * - sunAzimuth: horizontal sun angle in radians (-PI to PI)
 * - sunIntensity: directional light strength (0–10)
 * - isControlsOpen: show/hide the solar parameters panel
 * - isRecordingMode: hide UI overlays for clean screen captures
 */
export default function App() {
  const [sunAzimuth, setSunAzimuth] = useState<number>(Math.PI / 4);
  const [sunIntensity, setSunIntensity] = useState<number>(3.5);
  const [isControlsOpen, setIsControlsOpen] = useState<boolean>(true);
  const [isRecordingMode, setIsRecordingMode] = useState<boolean>(false);

  return (
    <div className="relative w-full h-full bg-black text-white font-sans overflow-hidden">

      {/** 3D WebGL canvas — fills entire viewport behind all UI layers */}
      <div className="absolute inset-0 z-0 text-white cursor-grab active:cursor-grabbing">
        <Scene sunAzimuth={sunAzimuth} sunIntensity={sunIntensity} />
      </div>

      {/**
       * Cinematic UI overlay.
       * Hidden during screen recording mode.
       * Uses mix-blend-difference for a clean inverted-text effect.
       */}
      {!isRecordingMode && (
        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-6 md:p-10 mix-blend-difference">
          <header className="max-w-md pointer-events-auto">
            <h1 className="text-3xl md:text-5xl font-light tracking-tight text-white mb-2 select-none">
              3D Globe
            </h1>
            <p className="text-xs md:text-sm text-gray-400 font-mono tracking-wider uppercase select-none">
              Interactive Earth Topography & Real-time Solar Casting
            </p>
          </header>

          <div className="flex justify-between items-end">
            <div className="text-xs font-mono text-gray-400 tracking-widest uppercase select-none">
              Interact to rotate & pan
            </div>
            <div className="w-10 h-10"></div>
          </div>
        </div>
      )}

      {/**
       * Floating control panel (bottom-right).
       * Holds the solar parameter sliders and action buttons.
       * Fades nearly to transparency during recording mode
       * but remains accessible on hover.
       */}
      <div
        className={`fixed bottom-6 right-6 z-20 flex flex-col items-end gap-3 pointer-events-auto transition-all duration-500 ${
          isRecordingMode ? 'opacity-10 hover:opacity-100' : 'opacity-100'
        }`}
      >
        {/** Solar controls panel — collapsible context menu */}
        {!isRecordingMode && isControlsOpen && (
          <div className="flex flex-col gap-4 bg-black/80 backdrop-blur-xl border border-white/10 p-5 rounded-2xl w-72 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center gap-2 border-b border-white/10 pb-2 mb-1">
               <Sun className="w-4 h-4 text-sky-400" />
               <h2 className="text-xs font-semibold tracking-wider text-gray-200 uppercase font-mono">Solar Parameters</h2>
            </div>

            {/** Sun azimuth slider — maps radians to a percentage display */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-mono text-gray-400 select-none">
                <span>Sun Position</span>
                <span>{((sunAzimuth + Math.PI) / (Math.PI * 2) * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min={-Math.PI} max={Math.PI} step={0.01}
                value={sunAzimuth}
                onChange={(e) => setSunAzimuth(parseFloat(e.target.value))}
                className="w-full accent-white h-1 bg-white/20 rounded-full appearance-none outline-none cursor-ew-resize"
              />
            </div>

            {/** Sun intensity slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-mono text-gray-400 select-none">
                <span>Intensity</span>
                <span>{sunIntensity.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min={0} max={10} step={0.1}
                value={sunIntensity}
                onChange={(e) => setSunIntensity(parseFloat(e.target.value))}
                className="w-full accent-white h-1 bg-white/20 rounded-full appearance-none outline-none cursor-ew-resize"
              />
            </div>
          </div>
        )}

        {/** Floating action buttons */}
        <div className="flex items-center gap-2">
          {/** Toggle solar controls panel */}
          {!isRecordingMode && (
            <button
              onClick={() => setIsControlsOpen(!isControlsOpen)}
              title="Toggle Solar Controls"
              className={`p-3 rounded-full border transition-all duration-300 shadow-lg ${
                isControlsOpen
                  ? 'bg-white text-black border-white'
                  : 'bg-black/60 text-white border-white/20 hover:border-white/40 hover:bg-black/80'
              }`}
            >
              <Sun className="w-5 h-5" />
            </button>
          )}

          {/** Toggle screen recording mode (hide/show UI overlays) */}
          <button
            onClick={() => {
              setIsRecordingMode(!isRecordingMode);
              if (!isRecordingMode) {
                setIsControlsOpen(false);
              } else {
                setIsControlsOpen(true);
              }
            }}
            title={isRecordingMode ? 'Show Controls' : 'Screen Recording Mode'}
            className={`p-3 rounded-full border transition-all duration-300 shadow-lg ${
              isRecordingMode
                ? 'bg-red-500/20 text-red-400 border-red-500/40 hover:bg-red-500/40 hover:text-white'
                : 'bg-black/60 text-white border-white/20 hover:border-white/40 hover:bg-black/80'
            }`}
          >
            {isRecordingMode ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
          </button>
        </div>
      </div>

    </div>
  );
}
