import React from "react";
import { cn } from "@/lib/utils";

interface PageProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  circlePosition: {
    x: number;
    y: number;
    size: number;
  };
}

export default function Page({
  children,
  className,
  circlePosition,
  id,
}: PageProps) {
  return (
    <>
      <section
        className={cn(
          "md:min-h-[calc(100vh-5rem)] w-full py-4 relative overflow-clip *:w-full *:h-full flex items-center justify-center",
          className
        )}
        data-circle-position={JSON.stringify(circlePosition)}
        id={id}
      >
        {children}
      </section>
    </>
  );
}
