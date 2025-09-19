import Section from "@/components/layouts/Section";
import YoutubeCarousel from "@/components/partials/carousel/YoutubeCarousel";
import Title from "@/components/typography/Title";
import React from "react";

export default function YoutubeVideos() {
  return (
    <>
      <Section>
        <div className={"h-full w-full flex flex-col justify-evenly  gap-4"}>
          <div className={"grid grid-cols-1 md:grid-cols-2 gap-4 items-center"}>
            <Title>
              Influencers speaking about{" "}
              <span className={"text-[#4f89cc]"}>METACCES!</span>
            </Title>
            <p>
              Influencers everywhere are talking about METACCES, raving about
              its fresh approach that brings together augmented reality, AI, and
              Web3 tech. They're excited about how it's shaking up the digital
              world, offering new ways for people to connect, create, and truly
              own their online experiences, and setting a new bar for how we
              interact in the digital space.
            </p>
          </div>
          <section>
            <div>
              <YoutubeCarousel />
            </div>
          </section>
        </div>
      </Section>
    </>
  );
}
