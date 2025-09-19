import { Icons } from "@/components/assets/Icons";
import Section from "@/components/layouts/Section";
import Title from "@/components/typography/Title";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FOOTER_NAVIGATION } from "@/data/Navigation";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <>
      <Section>
        <footer
          className={`z-40 w-full min-h-[284px] rounded-[64px] bg-gradient-to-br from-[#A5A5A5]/5 via-[#FFFFFF]/5 to-[#DEDEDE]/5 border-white backdrop-blur-md text-foreground container mx-auto p-8 flex flex-col items-center justify-center`}
        >
          <div
            className={`w-full grid grid-cols-1 lg:grid-cols-4 space-y-6 md:space-y-0 md:space-x-10 items-center`}
          >
            <div>
              <Icons.textLogo
                className={`h-24 w-auto aspect-video object-contain`}
              />
              {/* <h1 className={`text-4xl lg:text-5xl font-bold text-foreground`}>
                Lorem <span className={`text-[#4f89cc]`}>ipsum dolor</span> sit
                amet
              </h1> */}
              <p>
                At METACCES, we believe in building a future full of profit and
                innovation. You deserve to own while you enjoy your normal
                living.
              </p>
            </div>
            {FOOTER_NAVIGATION.map((f) => (
              <div key={f.title} className={`h-full`}>
                <h1 className={`text-[#4f89cc] font-bold text-3xl mb-2`}>
                  {f.title}
                </h1>
                <ul>
                  {f.links.map((l) => (
                    <li key={l.id}>
                      <Button variant={"link"} asChild>
                        <Link href={`${l.value}`}>{l.name}</Link>
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div
            className={`w-full flex flex-col items-center justify-center pt-2`}
          >
            <Separator className={`my-2`} />
            <div>
              <p className={`text-sm`}>
                All rights resserved <span className={`font-semibold`}>Metacces LLC 2025 ©.</span>
              </p>
            </div>
          </div>
        </footer>
      </Section>
    </>
  );
}
