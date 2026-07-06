import * as THREE from 'three';

/**
 * Vertex shader: passes the transformed normal to the fragment stage.
 *
 * `normalMatrix` is the inverse-transpose of the model-view matrix,
 * ensuring normals remain correctly oriented after non-uniform scaling.
 */
const vertexShader = `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

/**
 * Fragment shader: renders a rim-light glow around the sphere.
 *
 * Uses the dot-product of the view-space normal with the camera
 * direction (0, 0, 1) to detect edges — normals perpendicular to
 * the view produce the brightest glow.
 * The `pow(..., 4.0)` creates a tight, bright rim.
 */
const fragmentShader = `
  varying vec3 vNormal;
  void main() {
    float intensity = pow(0.65 - dot(vNormal, vec3(0, 0, 1.0)), 4.0);
    gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
  }
`;

/**
 * Atmospheric glow effect.
 *
 * Renders a slightly larger sphere (radius 2.2 vs Earth's 2.0)
 * behind the Earth with additive blending so it appears as a
 * glowing atmospheric rim.
 *
 * Key properties:
 * - BackSide rendering (visible from inside, behind the Earth)
 * - AdditiveBlending (brightens rather than overwrites)
 * - No depth-write (avoids z-fighting with the Earth mesh)
 */
export default function Atmosphere() {
  return (
    <mesh>
      <sphereGeometry args={[2.2, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        blending={THREE.AdditiveBlending}
        side={THREE.BackSide}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  );
}
