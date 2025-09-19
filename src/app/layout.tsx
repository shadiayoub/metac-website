import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
// const keepCalm = localFont({
//   src: "./fonts/KeepCalm.woff",
//   variable: "--font-keep-calm",
//   weight: "100 900",
// });
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
import { Toaster } from "@/components/ui/toaster";
import WagmiLayout from "@/components/layouts/WagmiLayout";

export const metadata: Metadata = {
  title: "Metacces",
  description: "Live to own 🌏",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={"en"} className={`dark`}>
      <WagmiLayout>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <main>{children}</main>
          <Toaster />
        </body>
      </WagmiLayout>
    </html>
  );
}
