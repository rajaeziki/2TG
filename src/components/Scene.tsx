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

const goldMetal = <meshStandardMaterial color="#F0CB84" metalness={1} roughness={0.14} envMapIntensity={2.6} emissive={GOLD} emissiveIntensity={0.18} />;

// Soft radial halo drawn once on a canvas; rendered additively so it reads as light, not a disc.
function useGlowTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const g = c.getContext("2d")!;
    const grad = g.createRadialGradient(128, 128, 0, 128, 128, 128);
    grad.addColorStop(0, "rgba(255,236,190,0.95)");
    grad.addColorStop(0.25, "rgba(217,181,107,0.45)");
    grad.addColorStop(0.55, "rgba(20,165,131,0.18)");
    grad.addColorStop(1, "rgba(20,165,131,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 256, 256);
    return new THREE.CanvasTexture(c);
  }, []);
}

function Halo() {
  const map = useGlowTexture();
  return (
    <sprite scale={[8.5, 8.5, 1]} position={[0, 0, -1.2]}>
      <spriteMaterial map={map} blending={THREE.AdditiveBlending} transparent opacity={0.6} depthWrite={false} />
    </sprite>
  );
}

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
        <meshPhysicalMaterial
          color="#10A37F"
          emissive="#0A7A60"
          emissiveIntensity={0.35}
          metalness={0.2}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.04}
          flatShading
          envMapIntensity={1.6}
        />
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
            <meshBasicMaterial color="#FFF1C9" />
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
        <Lightformer form="rect" intensity={8} position={[0, 5, 3]} scale={[14, 4, 1]} />
        <Lightformer form="rect" intensity={5} color="#FFE7B0" position={[-6, 1, 2]} scale={[3, 8, 1]} />
        <Lightformer form="rect" intensity={4} color="#6FE3C4" position={[6, -1, 2]} scale={[3, 7, 1]} />
        <Lightformer form="ring" intensity={6} position={[0, -3, -4]} scale={7} />
        <Lightformer form="rect" intensity={3} position={[0, 0, 8]} scale={[10, 6, 1]} />
      </Environment>

      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 5, 6]} intensity={2.2} color="#FFF3D6" />
      <pointLight position={[-4, -2, 4]} intensity={30} color="#6FE3C4" distance={14} />

      <group ref={hero}>
        <Halo />
        <pointLight intensity={14} color="#FFD98A" distance={9} />
        <Sculpture still={still} />
      </group>

      <points ref={dust}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={dustPositions} count={DUST} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#FFE9B8" size={0.034} transparent opacity={0.7} sizeAttenuation />
      </points>
    </>
  );
}

export default function Scene() {
  const { rtl } = useLang();
  return (
    <div className="pointer-events-none fixed inset-0" aria-hidden>
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true, powerPreference: "low-power" }}
        onCreated={({ gl }) => {
          gl.toneMappingExposure = 1.05;
        }}
      >
        <Rig rtl={rtl} />
      </Canvas>
    </div>
  );
}
