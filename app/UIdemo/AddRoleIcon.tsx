import React from "react";
import { Role, User } from "@/app/types";

import Image from "next/image";
export function AddRoleIcon({ user }: { user: User }) {
  return (
    <button aria-label="AddRoleBt">
      <Image
        src="/AddIconImage.jpg"
        alt="avatar"
        width={50}
        height={50}
        className="rounded-full"
      />
    </button>
  );
}
