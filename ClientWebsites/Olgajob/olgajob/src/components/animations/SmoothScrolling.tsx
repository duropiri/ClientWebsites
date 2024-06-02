"use client";
import ReactLenis from "lenis/react";

interface AnimationProps {
  children: React.ReactNode;
}

export default function SmoothScrolling({ children }: AnimationProps) {
  return (
    <ReactLenis root options={{ lerp: 0.2, duration: 5 }}>
      {children}
    </ReactLenis>
  );
}