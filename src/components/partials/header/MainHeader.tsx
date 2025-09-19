import Page from "@/components/layouts/Page";
import Section from "@/components/layouts/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRightIcon, Instagram, Play, YoutubeIcon } from "lucide-react";
import React from "react";
import Planet from "../planet/Planet";
import { BorderBeam } from "@/components/magicui/border-beam";
import HeroVideoDialog from "@/components/magicui/hero-video-dialog";
import Title from "@/components/typography/Title";
import Link from "next/link";
import { DiscordLogoIcon, InstagramLogoIcon } from "@radix-ui/react-icons";
import { LiaFacebookF, LiaTelegram } from "react-icons/lia";
import { Icons } from "@/components/assets/Icons";
import Image from "next/image";
import CertikEmblem from "./CertikEmblem";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CustomButton from "@/components/custom/CustomButton";
import ReactVideoPlayer from "../video/ReactVideoPlayer";

const socials = [
  {
    link: "https://www.instagram.com/metacces",
    icon: InstagramLogoIcon,
  },
  {
    link: "https://discord.gg/metacces",
    icon: DiscordLogoIcon,
  },
  {
    link: "https://www.youtube.com/@metacces",
    icon: YoutubeIcon,
  },
  {
    link: "https://t.me/Metacces_official_channel",
    icon: LiaTelegram,
  },
  {
    link: "https://x.com/metacces",
    icon: Icons.twitter,
  },
  {
    link: "https://www.facebook.com/metacces.official?mibextid=2JQ9oc",
    icon: LiaFacebookF,
  },
];

export default function MainHeader() {
  return (
    <>
      <div className={`w-full`}>
        <header className={`flex items-center justify-center`}>
          <div className={`hidden md:block absolute -left-[550px]`}>
            <Planet />
          </div>
          <Section>
            <div
              className={`grid grid-cols-1 md:grid-cols-2 gap-36 h-full items-center `}
            >
              <div className={`flex flex-col gap-10`}>
                <section>
                  <Image
                    src={"/main/blue.png"}
                    alt={""}
                    width={1080}
                    height={1080}
                    className={`size-60 md:size-72 aspect-square object-contain`}
                  />
                </section>

                <section>
                  <div className={`flex items-center gap-4 md:gap-10 w-52`}>
                    <CertikEmblem />
                  </div>
                </section>
                <section className={`flex flex-col gap-2`}>
                  <p>Stay updated</p>
                  <div className={`flex items-center gap-2`}>
                    {socials.map((social) => (
                      <Button
                        key={social.link}
                        size={"icon"}
                        className={`bg-[#4f89cc] hover:bg-[#447ab8] text-foreground`}
                      >
                        <Link href={`${social.link}`}>
                          <social.icon className={`size-6`} />
                        </Link>
                      </Button>
                    ))}
                  </div>
                </section>
                <section>
                  <div className={`flex items-center gap-4`}>
                    <HeroVideoDialog
                      animationStyle="from-center"
                      videoSrc="https://www.youtube.com/embed/JE0t78BdBJ0?si=1wboVFF_fQWzjnMz"
                    />
                    <p>Watch Our Story</p>
                  </div>
                </section>
              </div>
            </div>
          </Section>
        </header>
      </div>
    </>
  );
}
