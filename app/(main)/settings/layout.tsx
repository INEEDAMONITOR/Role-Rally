"use client";

import { ReactNode } from "react";
import { Back } from "@/app/components/Icon";
import { useRouter } from "next/navigation";
import NavBar from "@/app/components/NavBar";

export default function SettingsLayout({
  children,
}: {
  children: ReactNode
}) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  
  return (
    <>
      <NavBar>
        <Back onClick={handleBack} />
      </NavBar>
      {children}
    </>
  );
}