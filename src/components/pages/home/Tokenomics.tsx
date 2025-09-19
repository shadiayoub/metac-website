import Section from "@/components/layouts/Section";
import Title from "@/components/typography/Title";
import Image from "next/image";
import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TOKENOMICS_TABLE } from "@/data/Tokenomics";

export default function Tokenomics() {
  return (
    <>
      <Section>
        <div className={"rounded-[60px] overflow-hidden p-8 md:p-12"}>
          <div
            className={
              "flex flex-col md:flex-row items-center justify-between gap-8"
            }
          >
            <div className={"flex-1 space-y-4"}>
              <Title>Tokenomics</Title>
              <Table
                className={`bg-muted/20 backdrop-blur-md border-4 border-purple-500 rounded-t-2xl overflow-clip`}
              >
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] text-foreground/75">
                      Tag
                    </TableHead>
                    <TableHead className="text-foreground/75">
                      Progress
                    </TableHead>
                    <TableHead className="text-foreground/75">
                      # of Tokens
                    </TableHead>
                    <TableHead className="text-foreground/75">% T.S</TableHead>
                    <TableHead className="text-right text-foreground/75">
                      Round Price
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {TOKENOMICS_TABLE.map((t) => (
                    <TableRow key={t.id}>
                      <TableCell className="font-medium">{t.tag}</TableCell>
                      <TableCell>{t.progress}</TableCell>
                      <TableCell>{t.tokens.toLocaleString()}</TableCell>
                      <TableCell>{t.ts}%</TableCell>
                      <TableCell className="text-right">
                        ${t.price.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* <h2
                className={
                  "text-3xl md:text-4xl font-bold tracking-tighter text-[#4f89cc]"
                }
              >
                METACCES:
              </h2>
              <Title>UNVEILING THE TOKENOMICS</Title>
              <p className={"text-md/relaxed"}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                lacinia odio vitae vestibulum vestibulum. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit. Vivamus lacinia odio vitae
                vestibulum vestibulum. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Vivamus lacinia odio vitae vestibulum
                vestibulum.
              </p> */}
            </div>
            <div className={"flex-1 relative flex items-center justify-center"}>
              <Image
                src="/main/tokenomic.png"
                alt="Tokenomics chart"
                width={500}
                height={500}
                className={`rounded-[60px]`}
              />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
