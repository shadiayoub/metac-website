"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CAROUSEL_SLIDES } from "@/data/Carousel";
import Section from "@/components/layouts/Section";
import Title from "@/components/typography/Title";
import Link from "next/link";
import CustomButton from "@/components/custom/CustomButton";

const SLIDE_CHANGE_INTERVAL = 10000; // 10 seconds

const SlideContent: React.FC<any> = ({ slide, direction }) => {
  const variants = {
    hidden: {
      opacity: 0,
      x: direction === "next" ? 100 : -100,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      className="md:p-4 z-10"
      variants={variants}
      initial="hidden"
      animate="visible"
    >
      <div className="mb-4 md:mb-8">
        <motion.div
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        >
          <Title className="text-2xl md:text-3xl lg:text-4xl">
            {slide.title}
          </Title>
        </motion.div>
      </div>
      <div className="mb-4 md:mb-8">
        <motion.p
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          className="text-sm md:text-base lg:text-lg"
        >
          {slide.description}
        </motion.p>
      </div>
      <div className="flex items-center justify-end">
        {slide.url ? (
          <CustomButton>
            <Link href={slide.url}>Show More &rarr;</Link>
          </CustomButton>
        ) : (
          <CustomButton>
            <p>Coming Soon...</p>
          </CustomButton>
        )}
      </div>
    </motion.div>
  );
};

interface CarouselImageProps {
  slide: any;
  index: number;
  activeIndex: number;
  onClick: () => void;
}

const CarouselImage: React.FC<CarouselImageProps> = ({
  slide,
  index,
  activeIndex,
  onClick,
}) => {
  const getSlideStyle = (index: number, activeIndex: number) => {
    const totalSlides = CAROUSEL_SLIDES.length;
    if (index === activeIndex) {
      return { zIndex: 20, scale: 1, x: "0%", opacity: 1 };
    } else if (index === (activeIndex - 1 + totalSlides) % totalSlides) {
      return { zIndex: 10, scale: 0.7, x: "-50%", y: "40%", opacity: 1 };
    } else if (index === (activeIndex + 1) % totalSlides) {
      return { zIndex: 5, scale: 0.7, x: "50%", y: "-40%", opacity: 1 };
    } else {
      return { zIndex: 0, scale: 0.6, x: "0%", opacity: 0.5 };
    }
  };

  return (
    <motion.div
      className="absolute cursor-pointer"
      animate={getSlideStyle(index, activeIndex)}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      onClick={onClick}
    >
      <Image
        width={512}
        height={512}
        className={`rounded-[36px] object-cover transition-all ${
          index === activeIndex
            ? "h-[300px] w-[185px] sm:h-[400px] sm:w-[246px] md:h-[450px] md:w-[277px] lg:h-[562.5px] lg:w-[346.25px] border-4 border-[#B848D8]"
            : "h-[150px] w-[150px] sm:h-[200px] sm:w-[200px] md:h-[250px] md:w-[250px] lg:h-[300px] lg:w-[300px]"
        }`}
        alt={`slide image ${index + 1}`}
        src={slide.imageUrl}
      />
    </motion.div>
  );
};

export default function AnimatedCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "previous">("next");

  const handleImageClick = (index: number) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? "next" : "previous");
    setActiveIndex(index);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDirection("next");
      setActiveIndex((prevIndex) => (prevIndex + 1) % CAROUSEL_SLIDES.length);
    }, SLIDE_CHANGE_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Section>
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-4">
        <AnimatePresence mode="wait">
          <SlideContent
            key={activeIndex}
            slide={CAROUSEL_SLIDES[activeIndex]}
            direction={direction}
          />
        </AnimatePresence>
        <div className="relative flex flex-row-reverse items-center justify-center h-[20rem] sm:h-[25rem] md:h-[30rem] lg:h-[35rem] w-full">
          {CAROUSEL_SLIDES.map((slide, index) => (
            <CarouselImage
              key={index}
              slide={slide}
              index={index}
              activeIndex={activeIndex}
              onClick={() => handleImageClick(index)}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
