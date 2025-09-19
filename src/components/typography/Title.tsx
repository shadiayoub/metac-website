import { cn } from "@/lib/utils";
import React from "react";

export type TitleProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Title({ children, className }: TitleProps) {
  return (
    <h1
      className={cn(
        "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2 md:mb-4",
        className
      )}
    >
      {children}
    </h1>
  );
}
