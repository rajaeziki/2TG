"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { useLang } from "@/i18n/LangProvider";

const GOLD = "#D9B56B";
const EMERALD = "#14A583";
const DUST = 220;

// Deterministic pseudo-random so the layout is stable between renders.
function rand(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

const goldMetal = <meshStandardMaterial color={GOLD} metalness={1} roughness={0.22} envMapIntensity={1.6} />;

// A faceted emerald held inside three counter-rotating gold gimbal rings:
// protection and reliability around the one person you trust.
function Sculpture({ still }: { still: React.MutableRefObject<boolean> }) {
  const core = useRef<THREE.Mesh>(null);
  const g1 = useRef<THREE.Group>(null);
  const g2 = useRef<THREE.Group>(null);
  const g3 = useRef<THREE.Group>(null);
  const beads = useRef<THREE.Group>(null);

  useFrame((_, dt) => {
    const s = still.current ? 0 : 1;
    if (core.current) core.current.rotation.y += dt * 0.35 * s;
    if (g1.current) g1.current.rotation.y += dt * 0.32 * s;
    if (g2.current) g2.current.rotation.x += dt * 0.26 * s;
    if (g3.current) g3.current.rotation.y -= dt * 0.4 * s;
    if (beads.current) beads.current.rotation.z += dt * 0.12 * s;
  });

  const beadPositions = useMemo(
    () => Array.from({ length: 28 }, (_, i) => [Math.cos((i / 28) * Math.PI * 2) * 2.55, Math.sin((i / 28) * Math.PI * 2) * 2.55, 0] as const),
    []
  );

  return (
    <>
      <mesh ref={core}>
        <icosahedronGeometry args={[0.95, 1]} />
        <meshPhysicalMaterial color={EMERALD} metalness={0.25} roughness={0.12} clearcoat={1} clearcoatRoughness={0.05} flatShading envMapIntensity={1.8} />
      </mesh>
      <group ref={g1} rotation={[0, 0, 0.5]}>
        <mesh>
          <torusGeometry args={[1.55, 0.05, 32, 180]} />
          {goldMetal}
        </mesh>
      </group>
      <group ref={g2} rotation={[0, 0, -0.35]}>
        <mesh>
          <torusGeometry args={[1.95, 0.04, 32, 200]} />
          {goldMetal}
        </mesh>
      </group>
      <group ref={g3} rotation={[0.6, 0, 0.9]}>
        <mesh>
          <torusGeometry args={[2.3, 0.025, 24, 220]} />
          {goldMetal}
        </mesh>
      </group>
      <group ref={beads} rotation={[1.1, 0.3, 0]}>
        {beadPositions.map((p, i) => (
          <mesh key={i} position={[p[0], p[1], p[2]]}>
            <sphereGeometry args={[0.03, 10, 10]} />
            <meshBasicMaterial color="#F3DDA6" />
          </mesh>
        ))}
      </group>
    </>
  );
}

function Rig({ rtl }: { rtl: boolean }) {
  const { size } = useThree();
  const hero = useRef<THREE.Group>(null);
  const dust = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const scrollPx = useRef(0);
  const still = useRef(false);

  useEffect(() => {
    still.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const move = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const scroll = () => (scrollPx.current = window.scrollY);
    scroll();
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", scroll);
    };
  }, []);

  const dustPositions = useMemo(() => {
    const a = new Float32Array(DUST * 3);
    for (let i = 0; i < DUST; i++) {
      a[i * 3] = (rand(i + 1) - 0.5) * 18;
      a[i * 3 + 1] = (rand(i + 500) - 0.5) * 14;
      a[i * 3 + 2] = -rand(i + 900) * 8;
    }
    return a;
  }, []);

  useFrame((_, dt) => {
    const wide = size.width >= 1024;
    const vh = size.height || 1;
    const k = Math.min(scrollPx.current / (vh * 0.9), 1);
    const side = rtl ? -1 : 1;
    const { lerp, damp } = THREE.MathUtils;

    // Sculpture sits beside the hero text, then glides into the top corner while scrolling.
    const heroX = wide ? side * 2.2 : 0;
    const heroY = wide ? 0 : 1.6;
    const heroS = wide ? 0.82 : 0.5;
    const cornerX = side * (wide ? 4.4 : 1);
    const cornerY = wide ? 2.2 : 2.35;
    const cornerS = wide ? 0.26 : 0.22;
    const g = hero.current;
    if (g) {
      g.position.x = damp(g.position.x, lerp(heroX, cornerX, k), 4, dt);
      g.position.y = damp(g.position.y, lerp(heroY, cornerY, k), 4, dt);
      g.scale.setScalar(damp(g.scale.x, lerp(heroS, cornerS, k), 4, dt));
      g.rotation.x = damp(g.rotation.x, mouse.current.y * 0.35, 3, dt);
      g.rotation.y = damp(g.rotation.y, mouse.current.x * 0.5, 3, dt);
    }
    if (dust.current) {
      dust.current.position.y = scrollPx.current * 0.0018;
      dust.current.rotation.y += still.current ? 0 : dt * 0.012;
    }
  });

  return (
    <>
      <Environment frames={1} resolution={256}>
        <Lightformer form="rect" intensity={4} position={[0, 5, 3]} scale={[12, 3, 1]} />
        <Lightformer form="rect" intensity={2.5} color="#F3DDA6" position={[-6, 1, 2]} scale={[3, 7, 1]} />
        <Lightformer form="rect" intensity={2} color="#6FE3C4" position={[6, -1, 2]} scale={[3, 6, 1]} />
        <Lightformer form="ring" intensity={3} position={[0, -3, -4]} scale={6} />
      </Environment>

      <group ref={hero}>
        <Sculpture still={still} />
      </group>

      <points ref={dust}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={dustPositions} count={DUST} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#F3DDA6" size={0.028} transparent opacity={0.45} sizeAttenuation />
      </points>
    </>
  );
}

export default function Scene() {
  const { rtl } = useLang();
  return (
    <div className="pointer-events-none fixed inset-0" aria-hidden>
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true, powerPreference: "low-power" }}>
        <Rig rtl={rtl} />
      </Canvas>
    </div>
  );
}
