import React from "react";
import NavBar from "../partials/navbar/NavBar";
import Footer from "../partials/footer/Footer";

export type LayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: LayoutProps) {
  return (
    <>
      <NavBar />
      <main className={`relative`}>{children}</main>
      <Footer />
    </>
  );
}
