import MainLayout from "@/components/layouts/MainLayout";
import Section from "@/components/layouts/Section";
import Account from "@/components/wallet/Account";
import React from "react";

export default function page() {
  return (
    <>
      <MainLayout>
        <Section>
          <Account />
        </Section>
      </MainLayout>
    </>
  );
}
