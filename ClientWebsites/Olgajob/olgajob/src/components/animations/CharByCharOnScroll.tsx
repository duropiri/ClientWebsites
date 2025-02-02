"use client";
import React, { useEffect, useRef } from "react";
import { useScroll, motion, useTransform } from "framer-motion";

interface AnimationProps {
  children: React.ReactNode;
  className?: string;
  shadow?: boolean;
  lineStyles?: lineStyles;
  start?: number; // Percentage of the viewport where the animation should start
  end?: number; // Percentage of the viewport where the animation should end
}

interface lineStyles {
  marginTop?: string | number;
  marginRight?: string | number;
  height?: string | number;
  width?: string | number;
  marginBottom?: string | number;
  marginLeft?: string | number;
}

export default function CharByCharOnScroll({
  children,
  className,
  shadow,
  lineStyles,
  start = 90,
  end = 25,
}: AnimationProps) {
  const element = useRef<HTMLParagraphElement>(null);
  // Convert start and end to a percentage string format required by Framer Motion
  // const offsetStart: any = `start ${start}%`;
  // const offsetEnd: any = `start ${end}%`;

  // const { scrollYProgress } = useScroll({
  //   target: element,
  //   // offset: ["start end", "start start"], // start animation once in view, complete animation at top of view
  //   offset: [offsetStart, offsetEnd],

  // Use Framer Motion's useScroll hook to track scroll progress
  const { scrollYProgress } = useScroll();

  // Adjust the progress to start the animation after scrolling 100vh and finish it at 200vh
  const adjustedProgress = useTransform(scrollYProgress, [0.05, 0.5], [0, 10]);

  // useEffect(() => {
  //   scrollYProgress.on("change", (e) => console.log(e));
  // }, []);

  // Split children text into words
  const words = typeof children === "string" ? children.split(" ") : [];

  return (
    <p className={className + " flex flex-wrap leading-4"} ref={element}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        // console.log([start, end]);
        return (
          <Word
            key={i}
            range={[start, end]}
            progress={adjustedProgress}
            shadow={shadow}
            lineStyles={lineStyles}
          >
            {word}
          </Word>
        );
      })}
    </p>
  );
}

const Word = ({ children, range, progress, shadow, lineStyles }: any) => {
  const characters = children.split("");
  const amount = range[1] - range[0];
  const step = amount / children.length;

  return (
    <span
      className={!lineStyles ? styles.word : ""}
      style={{
        marginTop: lineStyles?.marginTop,
        marginBottom: lineStyles?.marginBottom,
        marginRight: lineStyles?.marginRight,
        marginLeft: lineStyles?.marginLeft,
        height: lineStyles?.height,
        width: lineStyles?.width,
      }}
    >
      {characters.map((character: any, i: any) => {
        const start = range[0] + step * i;
        const end = range[0] + step * (i + 1);
        return (
          <Character
            key={i}
            range={[start, end + 0.5]} // Increase the previewed character range
            progress={progress}
            shadow={shadow}
          >
            {character}
          </Character>
        );
      })}
    </span>
  );
};

const Character = ({ children, range, progress, shadow }: any) => {
  // Calculate opacity for each character based on scroll progress
  const opacity = useTransform(progress, range, [0, 1]);

  if (shadow) {
    return (
      <span>
        <span className={styles.shadow}>{children}</span>
        <motion.span style={{ opacity }}>{children}</motion.span>
      </span>
    );
  } else {
    return <motion.span style={{ opacity }}>{children}</motion.span>;
  }
};

const styles = {
  word: "mr-[1ch] mt-[1ch] relative", // Adjust margin-right and margin-top for character spacing
  shadow: "absolute opacity-10", // Shadow style
};
