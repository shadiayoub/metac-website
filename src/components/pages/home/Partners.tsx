import { Icons } from "@/components/assets/Icons";
import Section from "@/components/layouts/Section";
import Title from "@/components/typography/Title";
import { PARTNERS } from "@/data/Partners";
import Image from "next/image";
import React from "react";
import Marquee from "react-fast-marquee";

export default function Partners() {
  return (
    <>
      <Section>
        <div
          className={`w-full h-full flex flex-col items-center justify-evenly gap-4`}
        >
          <div className={`flex flex-col gap-2 items-center justify-center`}>
            <Title>Partners</Title>
          </div>
          <div
            className={`backdrop-blur-lg bg-gradient-to-br from-[#A5A5A5]/5 via-[#FFFFFF]/5 to-[#DEDEDE]/5 border-white backdrop-blur-md/20 rounded-[36px] w-full h-28 md:h-36 flex items-center justify-center overflow-clip`}
          >
            <Marquee>
              {PARTNERS.map((i) => (
                <div
                  key={i.id}
                  className={`w-64 h-24 mr-4 p-1 flex items-center justify-center`}
                >
                  <Image
                    src={`/partners/${i.image}`}
                    alt={`${i.name}`}
                    width={512}
                    height={512}
                    className={`h-24 w-auto aspect-video object-contain`}
                  />
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </Section>
    </>
  );
}
