"use client";

import React, { useEffect, useState, useCallback } from "react";
import Circle from "./Circle";

interface Position {
  x: number;
  y: number;
  size: number;
}

interface ScrollAnimatedCircleProps {
  pcPositions: Position[];
  mobilePositions: Position[];
}

const ScrollAnimatedCircle: React.FC<ScrollAnimatedCircleProps> = ({
  pcPositions,
  mobilePositions,
}) => {
  const [currentPosition, setCurrentPosition] = useState<Position>(
    pcPositions[0]
  );
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Adjust this breakpoint as needed
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleScroll = useCallback(() => {
    const positions = isMobile ? mobilePositions : pcPositions;
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const maxScroll = documentHeight - windowHeight;

    const scrollProgress = Math.min(Math.max(scrollPosition / maxScroll, 0), 1);

    const numPositions = positions.length;
    const segmentLength = 1 / (numPositions - 1);
    const segment = Math.min(
      Math.floor(scrollProgress / segmentLength),
      numPositions - 2
    );

    const segmentProgress =
      (scrollProgress - segment * segmentLength) / segmentLength;

    const currentPos = positions[segment];
    const nextPos = positions[segment + 1];

    const interpolatedPosition = {
      x: currentPos.x + (nextPos.x - currentPos.x) * segmentProgress,
      y: currentPos.y + (nextPos.y - currentPos.y) * segmentProgress,
      size:
        currentPos.size + (nextPos.size - currentPos.size) * segmentProgress,
    };

    setCurrentPosition(interpolatedPosition);
  }, [isMobile, pcPositions, mobilePositions]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial position
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const circleStyle = {
    left: `${currentPosition.x}%`,
    top: `${currentPosition.y}%`,
    width: `${currentPosition.size}vmin`,
    height: `${currentPosition.size}vmin`,
    position: "fixed" as const,
    transform: "translate(-50%, -50%)", // Center the circle on its position
  };

  return <Circle style={circleStyle} />;
};

export default ScrollAnimatedCircle;
