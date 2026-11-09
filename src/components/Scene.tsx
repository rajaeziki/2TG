"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { useLang } from "@/i18n/LangProvider";

const FOREST = "#0F5A48";
const GOLD = "#C9A24F";

// Horseshoe (Moroccan) arch outline: straight sides that flare into a circle, closed at the bottom.
function archShape(halfW: number, r: number, cy: number, bottom: number) {
  const dy = Math.sqrt(r * r - halfW * halfW);
  const a = Math.atan2(-dy, halfW);
  const s = new THREE.Shape();
  s.moveTo(-halfW, bottom);
  s.lineTo(halfW, bottom);
  s.lineTo(halfW, cy - dy);
  s.absarc(0, cy, r, a, Math.PI - a, false);
  s.lineTo(-halfW, bottom);
  return s;
}

// Eight-point star (khatam), the classic zellige motif.
function starShape(R: number, r: number, n = 8) {
  const s = new THREE.Shape();
  for (let i = 0; i < n * 2; i++) {
    const a = (i / (n * 2)) * Math.PI * 2;
    const rad = i % 2 ? r : R;
    const x = Math.cos(a) * rad;
    const y = Math.sin(a) * rad;
    if (i) s.lineTo(x, y);
    else s.moveTo(x, y);
  }
  s.closePath();
  return s;
}

const bevel = (depth: number, b = 0.04) => ({ depth, bevelEnabled: true, bevelThickness: b, bevelSize: b, bevelSegments: 4, curveSegments: 48 });

// An open door framed by a horseshoe arch, warm light inside, in front of two turning stars:
// a welcome into the home, in a Moroccan idiom.
function Sculpture({ still }: { still: React.MutableRefObject<boolean> }) {
  const arch = useRef<THREE.Group>(null);
  const starA = useRef<THREE.Mesh>(null);
  const starB = useRef<THREE.Mesh>(null);

  const { outer, border, inner, glowGeo } = useMemo(() => {
    const hole = archShape(0.78, 0.92, 0.62, -1.5);
    const outer = archShape(1.1, 1.25, 0.65, -1.75);
    outer.holes.push(new THREE.Path(hole.getPoints(64)));
    const border = archShape(1.1, 1.25, 0.65, -1.75);
    border.holes.push(new THREE.Path(archShape(1.0, 1.15, 0.65, -1.7).getPoints(64)));
    const inner = hole;
    // Vertical warm gradient painted with vertex colours: pale light at the top, amber low.
    const glowGeo = new THREE.ShapeGeometry(inner, 48);
    const pos = glowGeo.getAttribute("position");
    const colors = new Float32Array(pos.count * 3);
    const top = new THREE.Color("#FFF4D6");
    const bottom = new THREE.Color("#EDB95A");
    for (let i = 0; i < pos.count; i++) {
      const t = THREE.MathUtils.clamp((pos.getY(i) + 1.5) / 3.0, 0, 1);
      const c = bottom.clone().lerp(top, t);
      colors.set([c.r, c.g, c.b], i * 3);
    }
    glowGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return { outer, border, inner, glowGeo };
  }, []);

  const star1 = useMemo(() => starShape(1.95, 1.3), []);
  const star2 = useMemo(() => starShape(1.55, 1.0), []);
  void inner;

  useFrame(({ clock }, dt) => {
    const s = still.current ? 0 : 1;
    if (arch.current) arch.current.rotation.y = Math.sin(clock.elapsedTime * 0.5) * 0.3 * s;
    if (starA.current) starA.current.rotation.z += dt * 0.12 * s;
    if (starB.current) starB.current.rotation.z -= dt * 0.18 * s;
  });

  return (
    <group position={[0, -0.1, 0]}>
      <mesh ref={starA} position={[0, 0.2, -1.1]}>
        <extrudeGeometry args={[star1, bevel(0.06, 0.03)]} />
        <meshStandardMaterial color="#E2C27A" metalness={0.9} roughness={0.25} envMapIntensity={1.4} />
      </mesh>
      <mesh ref={starB} position={[0, 0.2, -0.95]} rotation={[0, 0, Math.PI / 8]}>
        <extrudeGeometry args={[star2, bevel(0.06, 0.03)]} />
        <meshPhysicalMaterial color={FOREST} roughness={0.3} clearcoat={0.8} envMapIntensity={1.2} />
      </mesh>

      <group ref={arch}>
        <mesh position={[0, 0, -0.12]}>
          <extrudeGeometry args={[border, bevel(0.12, 0.02)]} />
          <meshStandardMaterial color={GOLD} metalness={1} roughness={0.2} envMapIntensity={1.8} />
        </mesh>
        <mesh position={[0, 0, -0.04]}>
          <extrudeGeometry args={[outer, bevel(0.4, 0.05)]} />
          <meshPhysicalMaterial color={FOREST} roughness={0.28} clearcoat={1} clearcoatRoughness={0.1} envMapIntensity={1.4} />
        </mesh>
        <mesh geometry={glowGeo} position={[0, 0, 0.0]}>
          <meshBasicMaterial vertexColors />
        </mesh>
      </group>

      <ContactShadows position={[0, -1.82, 0]} opacity={0.4} scale={9} blur={2.6} far={3.5} resolution={512} frames={1} color="#0d2b24" />
    </group>
  );
}

function Rig({ rtl }: { rtl: boolean }) {
  const { size } = useThree();
  const hero = useRef<THREE.Group>(null);
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

  useFrame((_, dt) => {
    const wide = size.width >= 1024;
    const vh = size.height || 1;
    const k = Math.min(scrollPx.current / (vh * 0.9), 1);
    const side = rtl ? -1 : 1;
    const { lerp, damp } = THREE.MathUtils;

    // Beside the hero text first, then gliding into the top corner as the page scrolls.
    const heroX = wide ? side * 2.3 : 0;
    const heroY = wide ? -0.1 : 1.55;
    const heroS = wide ? 0.85 : 0.46;
    const cornerX = side * (wide ? 4.4 : 1);
    const cornerY = wide ? 2.2 : 2.35;
    const cornerS = wide ? 0.24 : 0.2;
    const g = hero.current;
    if (g) {
      g.position.x = damp(g.position.x, lerp(heroX, cornerX, k), 4, dt);
      g.position.y = damp(g.position.y, lerp(heroY, cornerY, k), 4, dt);
      g.scale.setScalar(damp(g.scale.x, lerp(heroS, cornerS, k), 4, dt));
      g.rotation.x = damp(g.rotation.x, mouse.current.y * 0.12, 3, dt);
      g.rotation.y = damp(g.rotation.y, mouse.current.x * 0.25, 3, dt);
    }
  });

  return (
    <>
      <Environment frames={1} resolution={256}>
        <Lightformer form="rect" intensity={5} position={[0, 5, 4]} scale={[14, 4, 1]} />
        <Lightformer form="rect" intensity={3} color="#FFE7B0" position={[-6, 1, 3]} scale={[3, 8, 1]} />
        <Lightformer form="rect" intensity={2.5} color="#DFF5EC" position={[6, 0, 3]} scale={[3, 7, 1]} />
        <Lightformer form="rect" intensity={2} position={[0, 0, 9]} scale={[12, 7, 1]} />
      </Environment>
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 5, 6]} intensity={1.6} color="#FFF3D6" />

      <group ref={hero}>
        <Sculpture still={still} />
      </group>
    </>
  );
}

export default function Scene() {
  const { rtl } = useLang();
  return (
    <div className="pointer-events-none fixed inset-0" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        onCreated={({ gl }) => {
          gl.toneMappingExposure = 1;
        }}
      >
        <Rig rtl={rtl} />
      </Canvas>
    </div>
  );
}
