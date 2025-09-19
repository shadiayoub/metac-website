"use client";

import React from "react";

import WagmiLayout from "@/components/layouts/WagmiLayout";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <WagmiLayout>{children}</WagmiLayout>
    </>
  );
}
