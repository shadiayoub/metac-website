"use client";

import React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import { Dot } from "lucide-react";

interface MainCarouselProps {
  children: React.ReactNode;
  delay?: number;
  autoplay?: boolean;
  dots?: boolean;
}

const MainCarousel = ({
  children,
  autoplay,
  delay,
  dots,
}: MainCarouselProps) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <>
      <div className={`w-full`}>
        {autoplay ? (
          <Carousel
            setApi={setApi}
            className={"w-full"}
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: delay || 4000,
              }),
            ]}
          >
            <CarouselContent>{children}</CarouselContent>
            <div className={`hidden md:block`}>
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        ) : (
          <Carousel
            setApi={setApi}
            className={"w-full"}
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>{children}</CarouselContent>
            <div className={`hidden md:block`}>
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        )}
        {dots && (
          <div className="pt-4">
            <div className="flex justify-center items-center gap-2">
              {[...Array(count)].map((_, index) => (
                <div key={index}>
                  <div
                    className={`rounded-full transition-all ${index + 1 == current ? "bg-[#B848D8] w-6 h-2" : "bg-border h-2 w-2"}`}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MainCarousel;
