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
import Image from "next/image";
import { SKINS } from "@/data/Skins";

export default function SkinsCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = React.useState(0);

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
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
          >
            <CarouselContent>
              {SKINS.map((s, index) => (
                <CarouselItem
                  key={index}
                  className={`md:basis-1/2 lg:basis-1/3 w-full flex items-center justify-center`}
                >
                  <div className="p-1">
                    <Card
                      className={`w-full rounded-[36px] border-none bg-transparent`}
                    >
                      <CardContent
                        className={`w-full h-auto transition-all ${
                          index === current % count
                            ? `md:scale-100 blur-none`
                            : `blur-md scale-50`
                        }`}
                      >
                        <Image
                          src={`${s.image}`}
                          alt={""}
                          width={1080}
                          height={1080}
                        />
                      </CardContent>
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
      </section>
    </>
  );
}
