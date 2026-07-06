import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

interface EarthProps {
  /** Height-map displacement strength. 0 = smooth sphere. */
  displacementScale: number;
  /** Optional auto-rotation speed (radians/frame). 0 = static. */
  rotationSpeed?: number;
}

/**
 * 3D Earth sphere with high-resolution texture mapping.
 *
 * Geometry:   SphereGeometry(radius=2, widthSegments=1024, heightSegments=1024)
 * Materials:  MeshPhongMaterial with color, displacement, and specular maps
 *
 * Textures (loaded from three-globe CDN):
 * - earth-blue-marble.jpg  → color/albedo
 * - earth-topology.png     → displacement height map
 * - earth-water.png        → specular/gloss mask (water = shiny, land = matte)
 */
export default function Earth({ displacementScale, rotationSpeed = 0 }: EarthProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  /** Load three texture maps concurrently via Drei's useTexture hook. */
  const [colorMap, bumpHeightMap, specularMap] = useTexture([
    'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
    'https://unpkg.com/three-globe/example/img/earth-topology.png',
    'https://unpkg.com/three-globe/example/img/earth-water.png',
  ]);

  /** Per-frame rotation update when rotationSpeed > 0. */
  useFrame(() => {
    if (meshRef.current && rotationSpeed > 0) {
      meshRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      {/** High-poly sphere for detailed displacement */}
      <sphereGeometry args={[2, 1024, 1024]} />
      <meshPhongMaterial
        map={colorMap}
        displacementMap={bumpHeightMap}
        displacementScale={displacementScale}
        specularMap={specularMap}
        specular={new THREE.Color('grey')}
        shininess={50}
      />
    </mesh>
  );
}
