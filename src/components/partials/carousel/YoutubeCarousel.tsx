"use client";

import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../../ui/carousel";
import Section from "../../layouts/Section";
import { Button } from "../../ui/button";
import { YOUTUBE_VIDEOS_CAROUSEL } from "@/data/Carousel";
import { Card, CardContent, CardFooter } from "../../ui/card";
import ReactVideoPlayer from "../../partials/video/ReactVideoPlayer";
import { Icons } from "../../assets/Icons";
import Autoplay from "embla-carousel-autoplay";

export default function YoutubeCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = React.useState(0);

  const [autoplayEnabled, setAutoplayEnabled] = useState(true);

  const handlePlay = () => {
    setAutoplayEnabled(false); // Disable autoplay when the video plays
    api?.plugins().autoplay.stop(); // Stop autoplay
  };

  const handleEnd = () => {
    setAutoplayEnabled(true); // Re-enable autoplay when the video ends or pauses
    api?.plugins().autoplay.play(); // Restart autoplay
  };

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <>
      <section>
        <div className={`flex items-center justify-center gap-2 w-full`}>
          <div>
            <Button
              size={"icon"}
              variant={"link"}
              onClick={() => api?.scrollTo(current - 1)}
            >
              <Icons.arrowLeft className={`size-12`} />
            </Button>
          </div>
          <Carousel
            className={`w-full`}
            setApi={setApi}
            opts={{
              align: "center",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
                stopOnInteraction: false, // Ensures autoplay isn't interrupted by user interaction
                playOnInit: autoplayEnabled, // Control autoplay dynamically
              }),
            ]}
          >
            <CarouselContent>
              {YOUTUBE_VIDEOS_CAROUSEL.map((y, index) => (
                <CarouselItem
                  key={y.id}
                  className={`md:basis-1/2 lg:basis-1/3  w-full`}
                >
                  <div className="p-1">
                    <Card
                      className={`w-full rounded-[36px] border-none bg-transparent `}
                    >
                      <CardContent
                        className={`w-full h-auto aspect-video object-cover border-2 mb-2 border-[#5A5A5A] rounded-[36px] p-0 md:scale-75 transition-all overflow-clip ${
                          index === current % count &&
                          `border-[#B848D8] md:scale-100`
                        }`}
                      >
                        <ReactVideoPlayer
                          videoUrl={y.url}
                          onPlay={handlePlay}
                          onPause={handleEnd}
                          onEnded={handleEnd}
                        />
                      </CardContent>
                      <CardFooter>
                        <p className={`text-center`}>{y.description}</p>
                      </CardFooter>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div>
            <Button
              size={"icon"}
              variant={"link"}
              onClick={() => api?.scrollTo(current + 1)}
            >
              <Icons.arrowRight className={`size-12`} />
            </Button>
          </div>
        </div>
        <div className="pt-4">
          <div className="flex justify-center items-center gap-2">
            {[...Array(count)].map((_, index) => (
              <div key={index}>
                <div
                  className={`rounded-full transition-all ${index == current ? "bg-[#B848D8] w-6 h-2" : "bg-border h-2 w-2"}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
