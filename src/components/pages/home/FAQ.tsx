import Section from "@/components/layouts/Section";
import Title from "@/components/typography/Title";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_LIST } from "@/data/Faq";

export default function FAQ() {
  return (
    <>
      <Section>
        <div
          className={`w-full h-full flex flex-col items-center justify-evenly gap-4`}
        >
          <Title>FAQ</Title>
          <div className={`w-full flex flex-col gap-2`}>
            {FAQ_LIST.map((f) => (
              <Accordion
                key={f.id}
                type="single"
                collapsible
                className={`rounded-[16px] bg-gradient-to-br from-[#A5A5A5]/5 via-[#FFFFFF]/5 to-[#DEDEDE]/5 border-white backdrop-blur-md flex flex-col items-center text-foreground`}
              >
                <AccordionItem
                  value={`${f.question}`}
                  className={"w-full container mx-auto"}
                >
                  <AccordionTrigger
                    className={`w-full flex items-center justify-between`}
                  >
                    {f.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>{f.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
