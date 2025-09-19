import { cn } from "@/lib/utils";
import React from "react";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

const Section = ({ children, className }: SectionProps) => {
  return (
    <>
      <section
        className={cn(
          `md:container md:mx-auto p-4 space-y-10 *:w-full *:h-full  `,
          className
        )}
      >
        <div className={`flex items-center justify-center *:w-full`}>
          {children}
        </div>
      </section>
    </>
  );
};

export default Section;
