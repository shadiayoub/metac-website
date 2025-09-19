import MainCarousel from "@/components/partials/carousel/MainCarousel";
import { CarouselItem } from "@/components/ui/carousel";
import React from "react";
import Image from "next/image";
import Section from "@/components/layouts/Section";
import Title from "@/components/typography/Title";
import SkinsCarousel from "@/components/partials/carousel/SkinsCarousel";

export default function Skins() {
  return (
    <>
      <Section>
        <div
          className={
            "w-full h-full flex flex-col items-center justify-evenly gap-4"
          }
        >
          <Title>
            Oli <span className={"text-[#4f89cc]"}>Skins</span> & NFTs
          </Title>
          <div className={"w-full flex items-center justify-center"}>
            <div>
              <SkinsCarousel />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
