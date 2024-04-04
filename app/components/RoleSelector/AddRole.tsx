"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export const AddRole = () => {
  const router = useRouter();

  const handleCreateRole = () => {
    router.push("/settings/create-role");
  };

  return (
    <button
      className="opacity-50 hover:opacity-70"
      onClick={handleCreateRole}
    >
      <Image
        className="rounded-full"
        src="/AddIconImage.jpg"
        alt="add role button"
        width={42}
        height={42}
      />
    </button>
  );
};
