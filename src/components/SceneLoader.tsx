"use client";

import dynamic from "next/dynamic";

// The WebGL scene is client-only and loads after the page text so first paint stays fast.
const Scene = dynamic(() => import("./Scene"), { ssr: false });

export default function SceneLoader() {
  return <Scene />;
}
