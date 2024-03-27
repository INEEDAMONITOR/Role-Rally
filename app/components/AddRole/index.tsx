"use client";

import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";

export function AddRole() {
  const router = useRouter();

  const handleCreateRole = () => {
    router.push("/settings/create-role");
  };

  return (
    <>
      <Button
        display={{
          type: "ICON",
          size: "SMALL",
        }}
        icon={{
          src: "/AddIconImage.jpg",
          alt: "avatar"
        }}
        onClick={handleCreateRole}
      />
    </>
  );
}
