"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Instagram,
  TwitterIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { TWEETS } from "@/data/Tweets";
import MainCarousel from "@/components/partials/carousel/MainCarousel";
import { YOUTUBE_VIDEOS_CAROUSEL } from "@/data/Carousel";
import { CarouselItem } from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Title from "@/components/typography/Title";
import { Icons } from "@/components/assets/Icons";

export default function TweetCarousel() {
  const tweets = TWEETS;

  const [currentIndex, setCurrentIndex] = useState(2);

  useEffect(() => {
    const interval = setInterval(() => {
      nextTweet();
    }, 8000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextTweet = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % tweets.length);
  };

  const prevTweet = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + tweets.length) % tweets.length
    );
  };

  const getAvatarStyle = (index: number) => {
    const baseSize = 164;
    const spacing = 700;
    const positions = [
      { x: -spacing, y: 300, size: baseSize },
      { x: -spacing / 1.75, y: 100, size: baseSize + 20 },
      { x: 0, y: -30, size: baseSize + 80 },
      { x: spacing / 1.75, y: 100, size: baseSize + 20 },
      { x: spacing, y: 300, size: baseSize },
    ];
    return positions[index % positions.length];
  };

  return (
    <>
      <section className="hidden lg:flex flex-col items-center justify-evenly gap-4">
        {/* Title Section */}
        <div className="w-full flex items-center justify-center mb-10 md:mb-20">
          <Title>
            <span className="text-[#4f89cc]">Tweets</span> By People You Can
            Trust
          </Title>
        </div>

        {/* Carousel Section */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-full max-w-4xl h-80 mb-1">
            <div className="absolute inset-x-0 top-1/2 -mt-20 flex justify-center items-center ">
              <AnimatePresence initial={false}>
                {tweets.map((tweet, index) => {
                  const position =
                    (index - currentIndex + tweets.length) % tweets.length;
                  const style = getAvatarStyle(position);
                  return (
                    <motion.div
                      key={tweet.id}
                      className={`absolute overflow-hidden cursor-pointer rounded-tl-[64px] rounded-tr-[42px] rounded-br-[64px] rounded-bl-[42px] p-0.5  shadow-lg ${tweet.type === "twitter" ? "bg-gradient-to-b from-[#5F9FE7] to-[#1DA1F2] shadow-[#5F9FE7] " : tweet.type === "blog" ? "bg-gradient-to-b from-[#9B59B6] to-[#8E44AD]  shadow-[#9B59B6]" : ""}`}
                      initial={style}
                      animate={{
                        x: style.x,
                        y: style.y,
                        width: style.size,
                        height: style.size,
                        zIndex: 5 - Math.abs(position - 2),
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    >
                      <Image
                        src={tweet.avatar}
                        alt={tweet.author}
                        className={
                          "w-full h-full object-cover rounded-tl-[64px] rounded-tr-[42px] rounded-br-[64px] rounded-bl-[42px] "
                        }
                        width={1024}
                        height={1024}
                      />
                      {position === 2 && (
                        <motion.div
                          className="absolute inset-0 rounded-2xl"
                          initial={{
                            boxShadow: "0 0 0 0 rgba(77, 163, 255, 0)",
                          }}
                          animate={{
                            boxShadow: "0 0 20px 5px rgba(77, 163, 255, 0.7)",
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Tweet Info and Controls */}
          <div className="flex items-center gap-1">
            <Button
              variant="link"
              onClick={prevTweet}
              className="p-2 z-10"
              aria-label="Previous tweet"
            >
              <ChevronLeft />
            </Button>
            <AnimatePresence mode={"wait"}>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={"max-w-md w-full relative"}
              >
                <Card
                  className={`bg-gradient-to-br from-[#A5A5A5]/15 via-[#FFFFFF]/25 to-[#DEDEDE]/15 border-white backdrop-blur-md/20 rounded-[24px]`}
                >
                  <CardHeader>
                    <CardTitle
                      className={
                        "font-bold text-lg flex items-center justify-between"
                      }
                    >
                      <span>{tweets[currentIndex].author}</span>
                      {tweets[currentIndex].type === "twitter" && (
                        <span>
                          <Icons.twitter className={"size-6"} />
                        </span>
                      )}
                      {tweets[currentIndex].type === "blog" && (
                        <span>
                          <Icons.blogs className={`size-6`} />
                        </span>
                      )}
                    </CardTitle>
                    <CardDescription>
                      {tweets[currentIndex].handle}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{tweets[currentIndex].content}</p>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
            <Button
              variant="link"
              onClick={nextTweet}
              className="p-2 z-10"
              aria-label="Next tweet"
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      </section>
      <section
        className={`flex flex-col items-center justify-evenly lg:hidden w-full`}
      >
        <div className="w-full flex items-center justify-center mb-10 md:mb-20">
          <Title>
            <span className="text-[#4f89cc]">Tweets</span> By People You Can
            Trust
          </Title>
        </div>
        <MainCarousel autoplay delay={8000}>
          {YOUTUBE_VIDEOS_CAROUSEL.map((y) => (
            <CarouselItem key={y.id} className={`md:basis-1/2 lg:basis-1/3`}>
              <div className="p-1">
                <Card
                  className={`bg-gradient-to-br from-[#A5A5A5]/15 via-[#FFFFFF]/25 to-[#DEDEDE]/15 border-white backdrop-blur-md/20 rounded-[24px]`}
                >
                  <CardHeader className={`flex flex-row items-center gap-2`}>
                    <div>
                      <Avatar>
                        <AvatarImage src={tweets[currentIndex].avatar} />
                        <AvatarFallback>HYN</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className={`w-full`}>
                      <CardTitle
                        className={
                          "w-full font-bold text-lg flex items-center justify-between"
                        }
                      >
                        <span>{tweets[currentIndex].author}</span>
                        {tweets[currentIndex].type === "twitter" && (
                          <span>
                            <Icons.twitter className={"size-6"} />
                          </span>
                        )}
                        {tweets[currentIndex].type === "blog" && (
                          <span>
                            <Icons.blogs className={`size-6`} />
                          </span>
                        )}
                      </CardTitle>
                      <CardDescription>
                        {tweets[currentIndex].handle}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{tweets[currentIndex].content}</p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </MainCarousel>
      </section>
    </>
  );
}
