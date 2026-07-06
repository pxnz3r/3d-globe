import { OrbitControls, Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Earth from './Earth';
import Atmosphere from './Atmosphere';

interface SceneProps {
  sunAzimuth: number;
  sunIntensity: number;
}

/**
 * 3D scene root component.
 *
 * Sets up the R3F Canvas with:
 * - Ambient light (low fill)
 * - Directional light (sun, position derived from azimuth/intensity)
 * - Starfield background
 * - Earth sphere with displacement mapping
 * - Atmospheric glow (custom shader)
 * - Orbit controls (rotate/zoom/pan)
 *
 * Loading fallback: a wireframe sphere shown while textures load.
 */
export default function Scene({ sunAzimuth, sunIntensity }: SceneProps) {
  /** Fixed elevation angle (above the equatorial plane). */
  const sunElevation = 0.2;

  /** Subtle ambient fill so shadowed areas aren't pure black. */
  const ambientLight = 0.05;

  /** Height-map displacement multiplier applied to the Earth sphere. */
  const displacementScale = 0.2;

  /** Compute directional light position on a sphere of radius 20. */
  const sunDistance = 20;
  const sunX = Math.cos(sunElevation) * Math.sin(sunAzimuth) * sunDistance;
  const sunY = Math.sin(sunElevation) * sunDistance;
  const sunZ = Math.cos(sunElevation) * Math.cos(sunAzimuth) * sunDistance;

  return (
    <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>

      {/** Near-black background for the starfield */}
      <color attach="background" args={['#020202']} />

      {/** Fill light — prevents pure-black shadows */}
      <ambientLight intensity={ambientLight} />

      {/**
       * Primary sun light.
       * 4096² shadow map for crisp terrain shadows.
       * Shadow camera frustum tightly fitted around the globe.
       */}
      <directionalLight
        castShadow
        position={[sunX, sunY, sunZ]}
        intensity={sunIntensity}
        color="#fffcee"
        shadow-mapSize={[4096, 4096]}
        shadow-camera-near={0.5}
        shadow-camera-far={50}
        shadow-camera-left={-3}
        shadow-camera-right={3}
        shadow-camera-top={3}
        shadow-camera-bottom={-3}
        shadow-bias={-0.0001}
      />

      {/** Background starfield — 5000 white stars with subtle fade animation */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      {/**
       * Suspense wraps the Earth + Atmosphere so a wireframe fallback
       * is shown while textures download from the CDN.
       */}
      <Suspense fallback={
        <mesh>
          <sphereGeometry args={[2, 32, 32]} />
          <meshBasicMaterial color="#333" wireframe />
        </mesh>
      }>
        <Atmosphere />
        <Earth displacementScale={displacementScale} rotationSpeed={0} />
      </Suspense>

      {/** Camera controls: orbit with distance limits (2.5–15) */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        minDistance={2.5}
        maxDistance={15}
        autoRotate={false}
      />
    </Canvas>
  );
}
