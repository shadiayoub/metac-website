import React from "react";
import { cn } from "@/lib/utils";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode;
  fillColor?: string;
  hoverFillColor?: string;
}

export default function CustomButton({
  className,
  children,
  fillColor = "#5F9FE7",
  hoverFillColor = "#447ab8",
  ...props
}: CustomButtonProps) {
  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors text-primary",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 139 53"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.1066 4.90927L4.8934 10.1225C2.08035 12.9355 0.5 16.7508 0.5 20.7291V32.271C0.5 36.2492 2.08035 40.0645 4.8934 42.8776L10.1066 48.0908C12.9196 50.9038 16.735 52.4842 20.7132 52.4842H116.787C120.765 52.4842 124.58 50.9038 127.393 48.0908L134.607 40.8776C137.42 38.0645 139 34.2492 139 30.271V20.7291C139 16.7508 137.42 12.9355 134.607 10.1225L129.393 4.90927C126.58 2.09622 122.765 0.515869 118.787 0.515869H20.7132C16.735 0.515869 12.9197 2.09622 10.1066 4.90927Z"
          fill={fillColor}
          className={`transition-colors hover:fill-[${hoverFillColor}]`}
        />
      </svg>
      <span className="relative z-10 px-2 py-1">{children}</span>
    </button>
  );
}
