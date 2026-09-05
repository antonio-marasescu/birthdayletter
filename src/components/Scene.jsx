import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles, Stars } from '@react-three/drei';
import { AdditiveBlending, DoubleSide } from 'three';

function Mountains() {
  const peaks = useMemo(
    () => [
      { x: -9, z: -14, h: 6, s: 5, c: '#1b2430' },
      { x: -4, z: -18, h: 8, s: 6.5, c: '#141b26' },
      { x: 2, z: -16, h: 7, s: 6, c: '#182233' },
      { x: 7, z: -20, h: 9, s: 7, c: '#101620' },
      { x: 12, z: -15, h: 6.5, s: 5.5, c: '#1b2430' }
    ],
    []
  );

  return (
    <group position={[0, -2, 0]}>
      {peaks.map((peak, i) => (
        <mesh key={i} position={[peak.x, peak.h / 2, peak.z]}>
          <coneGeometry args={[peak.s, peak.h, 4]} />
          <meshStandardMaterial color={peak.c} roughness={1} flatShading />
        </mesh>
      ))}
      <mesh position={[0, -1.2, -2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#0b0f14" roughness={1} />
      </mesh>
    </group>
  );
}

function Fire() {
  const flamesRef = useRef(null);

  const vertexShader = `
    varying vec2 vUv;
    uniform float uTime;

    void main() {
      vUv = uv;
      vec3 p = position;
      float sway = sin(uTime * 2.7 + uv.y * 7.0) * 0.075 * uv.y;
      sway += sin(uTime * 4.1 + uv.y * 11.0) * 0.025 * uv.y;
      p.x += sway;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    uniform float uTime;
    uniform float uSeed;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
                 mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
    }

    float fbm(vec2 p) {
      float value = 0.0;
      value += noise(p) * 0.55;
      p = p * 2.03 + 17.1;
      value += noise(p) * 0.28;
      p = p * 2.01 + 9.7;
      value += noise(p) * 0.14;
      return value;
    }

    void main() {
      vec2 uv = vUv;
      float risingNoise = fbm(vec2(uv.x * 3.2 + uSeed, uv.y * 4.2 - uTime * 1.45));
      float fineNoise = noise(vec2(uv.x * 9.0 - uSeed, uv.y * 8.0 - uTime * 2.2));
      float center = 0.5 + (risingNoise - 0.5) * 0.28 * uv.y;
      float width = mix(0.46, 0.025, pow(uv.y, 0.72));
      width *= 0.82 + risingNoise * 0.34;
      float flame = 1.0 - smoothstep(width * 0.48, width, abs(uv.x - center));
      float raggedTop = 1.04 - uv.y + (risingNoise - 0.5) * 0.23 + (fineNoise - 0.5) * 0.06;
      flame *= smoothstep(-0.03, 0.12, raggedTop);
      flame *= smoothstep(0.0, 0.1, uv.y);

      float heat = clamp(1.0 - uv.y, 0.0, 1.0);
      vec3 ember = vec3(0.9, 0.075, 0.01);
      vec3 orange = vec3(1.0, 0.34, 0.025);
      vec3 gold = vec3(1.0, 0.78, 0.18);
      vec3 core = vec3(1.0, 0.96, 0.68);
      vec3 color = mix(ember, orange, smoothstep(0.05, 0.55, heat));
      color = mix(color, gold, smoothstep(0.38, 0.82, heat) * flame);
      color = mix(color, core, smoothstep(0.72, 1.0, heat) * pow(flame, 2.0));
      float alpha = flame * mix(0.42, 0.94, heat) * (0.82 + fineNoise * 0.18);

      if (alpha < 0.025) discard;
      gl_FragColor = vec4(color, alpha);
    }
  `;

  const flameLayers = useMemo(
    () => [
      { position: [0, -0.08, 0.43], scale: [2.05, 1.5, 1], rotation: [0, 0, 0], seed: 0.0 },
      {
        position: [-0.43, -0.18, 0.51],
        scale: [1.3, 1.05, 1],
        rotation: [0, 0.65, -0.08],
        seed: 4.7
      },
      { position: [0.43, -0.2, 0.5], scale: [1.22, 0.98, 1], rotation: [0, -0.7, 0.1], seed: 9.2 }
    ],
    []
  );

  useFrame(({ clock }) => {
    if (!flamesRef.current) return;
    for (const flame of flamesRef.current.children) {
      flame.material.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <group ref={flamesRef}>
      {flameLayers.map(({ position, scale, rotation, seed }) => (
        <mesh key={seed} position={position} scale={scale} rotation={rotation}>
          <planeGeometry args={[1, 1, 18, 24]} />
          <shaderMaterial
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            uniforms={{ uTime: { value: 0 }, uSeed: { value: seed } }}
            transparent
            depthWrite={false}
            side={DoubleSide}
            blending={AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

function Fireplace() {
  const stones = useMemo(
    () => [
      [-1.45, -0.65, 0.1, 0.72, 0.48, 0.62],
      [-1.48, -0.08, 0.05, 0.68, 0.58, 0.62],
      [-1.42, 0.56, 0, 0.74, 0.6, 0.65],
      [1.45, -0.65, 0.1, 0.72, 0.48, 0.62],
      [1.48, -0.08, 0.05, 0.68, 0.58, 0.62],
      [1.42, 0.56, 0, 0.74, 0.6, 0.65],
      [-1.05, 1.12, 0, 0.78, 0.52, 0.68],
      [-0.34, 1.22, 0, 0.7, 0.5, 0.7],
      [0.36, 1.22, 0, 0.7, 0.5, 0.7],
      [1.07, 1.12, 0, 0.78, 0.52, 0.68]
    ],
    []
  );

  return (
    <group position={[0, 1.35, -3.4]} scale={1.05}>
      <mesh position={[0, 0.1, -0.24]}>
        <boxGeometry args={[3.4, 2.8, 0.5]} />
        <meshStandardMaterial color="#171616" roughness={1} />
      </mesh>
      {stones.map(([x, y, z, width, height, depth], index) => (
        <mesh
          key={index}
          position={[x, y, z]}
          rotation={[0, 0, ((index % 3) - 1) * 0.045]}
          scale={[width, height, depth]}
        >
          <dodecahedronGeometry args={[0.62, 0]} />
          <meshStandardMaterial
            color={index % 2 ? '#4a4641' : '#57514a'}
            roughness={1}
            flatShading
          />
        </mesh>
      ))}
      <mesh position={[0, -0.98, 0.2]}>
        <boxGeometry args={[3.7, 0.32, 1.35]} />
        <meshStandardMaterial color="#4b453e" roughness={1} />
      </mesh>
      <mesh position={[0, -0.48, 0.38]} rotation={[Math.PI / 2, 0.25, Math.PI / 2]}>
        <cylinderGeometry args={[0.18, 0.22, 1.75, 8]} />
        <meshStandardMaterial color="#3a1d10" roughness={1} flatShading />
      </mesh>
      <mesh position={[0, -0.5, 0.4]} rotation={[Math.PI / 2, -0.25, Math.PI / 2]}>
        <cylinderGeometry args={[0.18, 0.22, 1.75, 8]} />
        <meshStandardMaterial color="#4a2412" roughness={1} flatShading />
      </mesh>
      <Fire />
      <pointLight
        position={[0, 0.15, 1.2]}
        color="#ff7a28"
        intensity={4.5}
        distance={9}
        decay={2}
      />
    </group>
  );
}

function Embers() {
  return (
    <Sparkles
      count={70}
      scale={[16, 8, 16]}
      size={2.4}
      speed={0.35}
      opacity={0.7}
      color="#ffb04d"
      position={[0, 1, 1]}
    />
  );
}

function FlickeringTorchlight() {
  const lightRef = useRef(null);
  useFrame(({ clock }) => {
    if (lightRef.current) {
      const t = clock.getElapsedTime();
      lightRef.current.intensity = 1.4 + Math.sin(t * 8) * 0.15 + Math.sin(t * 3.1) * 0.1;
    }
  });
  return <pointLight ref={lightRef} position={[0, 2, 4]} color="#ff9d47" intensity={1.4} />;
}

export default function Scene() {
  return (
    <Canvas
      className="valheim-canvas"
      camera={{ position: [0, 1.4, 8], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true }}
    >
      <color attach="background" args={['#05070a']} />
      <fog attach="fog" args={['#05070a', 6, 26]} />
      <ambientLight intensity={0.25} color="#5a6b8c" />
      <FlickeringTorchlight />
      <Stars radius={40} depth={30} count={2500} factor={2.2} saturation={0} fade speed={0.4} />
      <Mountains />
      <Fireplace />
      <Embers />
    </Canvas>
  );
}
