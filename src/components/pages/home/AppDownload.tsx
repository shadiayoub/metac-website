import Section from "@/components/layouts/Section";
import Title from "@/components/typography/Title";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DOWNLOAD_CARDS } from "@/data/Download";
import { DownloadIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DownloadButton from "./DownloadButton";

export default function AppDownload() {
  return (
    <>
      <Section>
        <div
          className={"h-full flex flex-col items-center justify-evenly gap-4"}
        >
          <div
            className={
              "w-full flex flex-col gap-10 items-center justify-center mb-28"
            }
          >
            <Title>
              Future <span className={"text-[#4f89cc]"}>Trends</span>, All in
              One App!
            </Title>
            <p className={"md:text-center md:text-lg"}>
              Introducing a revolutionary application that merges the most
              cutting-edge and trending features poised to shape the future.
              Designed to anticipate and meet the evolving demands of tomorrow,
              this app offers an unparalleled experience by seamlessly
              integrating the latest innovations in technology and user
              engagement.
            </p>
            <DownloadButton />
          </div>
          <section className={"pt-4"}>
            <div
              className={
                "grid grid-cols-1 md:grid-cols-3 gap-28 md:gap-10 h-full"
              }
            >
              {DOWNLOAD_CARDS.map((d, index) => (
                <Card
                  key={index}
                  className={`rounded-[60px] bg-gradient-to-br from-[#A5A5A5]/5 via-[#FFFFFF]/5 to-[#DEDEDE]/5 border backdrop-blur-sm h-full flex flex-col items-center justify-between relative`}
                >
                  <div
                    className={`relative h-full w-full flex items-center justify-center`}
                  >
                    <Image
                      src={`/download/circle.png`}
                      alt={`Circle`}
                      width={512}
                      height={512}
                      className={`h-48 md:h-56 w-auto absolute -top-24 md:-top-28`}
                    />
                    <Image
                      src={`${d.image}`}
                      alt={`${d.title}`}
                      width={512}
                      height={512}
                      className={`h-48 md:h-56 w-auto absolute -top-32 md:-top-36 animate-float`}
                    />
                  </div>
                  <CardHeader className={`mt-14`}>
                    <CardTitle>{d.title}</CardTitle>
                  </CardHeader>
                  <CardContent className={`min-h-[100px]`}>
                    <p className={`text-justify md:text-center`}>
                      {d.description}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant={"link"}
                      asChild
                      className={`text-[#4f89cc] font-bold text-base hidden`}
                    >
                      <Link href={`${d.url}`}>Show More &rarr;</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </Section>
    </>
  );
}
