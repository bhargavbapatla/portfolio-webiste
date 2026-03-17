"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { ReactNode } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.07, duration: 1.2, smoothTouch: false }}>
      {children}
    </ReactLenis>
  );
}