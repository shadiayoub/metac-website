"use client";

import { Buffer } from "buffer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { WagmiProvider } from "wagmi";

import { config } from "@/config/wagmi";

if (typeof window !== "undefined") {
  globalThis.Buffer = Buffer;
}

const queryClient = new QueryClient();

export type LayoutProps = {
  children: React.ReactNode;
};

export default function WagmiLayout({ children }: LayoutProps) {
  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}
