"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useTransform, useScroll } from "framer-motion";

interface AnimationProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  height?: string;
}

const HorizontalScroll: React.FC<AnimationProps> = ({
  children,
  className,
  innerClassName = "sticky top-0 flex items-center overflow-x-clip h-[100vh]",
  height
}) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [totalWidth, setTotalWidth] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  // Set the window width on mount and on window resize
  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };
    updateWindowWidth();
    window.addEventListener("resize", updateWindowWidth);
    return () => window.removeEventListener("resize", updateWindowWidth);
  }, []);

  // Use the useScroll hook with a specific target
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // UseTransform to adjust the x position based on the scroll progress
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0px", `-${totalWidth - windowWidth}px`]
  );

  // Effect to calculate the total width of all children dynamically and adjust the height
  useEffect(() => {
    if (containerRef.current) {
      const childrenArray = Array.from(containerRef.current.children);
      const width = childrenArray.reduce(
        (acc, child) => acc + (child as HTMLElement).clientWidth,
        0
      );
      setTotalWidth(width);
    }
  }, [children]);

  // Calculate dynamic height based on the number of children and their total width
  const dynamicHeight = (totalWidth / windowWidth) * 100; // Example conversion factor, adjust as needed

  return (
    <div
      ref={targetRef}
      className={`relative ${className}`}
      style={{ height: height || `${Math.max(100, dynamicHeight)}vh` }}
      id="horizontal-scroll"
    >
      <div
        className={`${innerClassName}`}
      >
        <motion.div
          ref={containerRef}
          style={{ x, minWidth: `${totalWidth}px` }}
          className="flex items-center"
        >
          {React.Children.map(children, (child, index) => (
            <div
              key={index}
              className="w-full"
              style={{ flexShrink: 0, width: "100vw" }}
            >
              {child}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HorizontalScroll;

// Usage example
<HorizontalScroll>
  <div style={{ width: "100vw", height: "100vh", backgroundColor: "red" }}>
    Item 1
  </div>
  <div style={{ width: "100vw", height: "100vh", backgroundColor: "blue" }}>
    Item 2
  </div>
  <div style={{ width: "100vw", height: "100vh", backgroundColor: "green" }}>
    Item 3
  </div>
  <div style={{ width: "100vw", height: "100vh", backgroundColor: "yellow" }}>
    Item 4
  </div>
</HorizontalScroll>;
