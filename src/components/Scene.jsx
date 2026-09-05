import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, Stars } from '@react-three/drei';

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

function Runestone() {
  const groupRef = useRef(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <Float speed={1.1} rotationIntensity={0.3} floatIntensity={0.8}>
      <group ref={groupRef} position={[0, 0.4, 2]}>
        <mesh>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#3a4657" roughness={0.75} metalness={0.1} flatShading />
        </mesh>
        <mesh>
          <dodecahedronGeometry args={[1.01, 0]} />
          <meshStandardMaterial
            color="#8fd6ff"
            emissive="#6cc8ff"
            emissiveIntensity={0.9}
            wireframe
            transparent
            opacity={0.5}
          />
        </mesh>
      </group>
    </Float>
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
      <Runestone />
      <Embers />
    </Canvas>
  );
}
