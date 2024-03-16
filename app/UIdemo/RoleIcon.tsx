import React from "react";
import { Role, User } from "@/app/types";

import Image from "next/image";
export function RoleIcon({ role }: { role: Role }) {
  return (
    <button aria-label="RoleIcon">
      <Image
        src={role.profile.avatar ? role.profile.avatar : "/default.jpg"}
        alt="avatar"
        width={50}
        height={50}
        className="rounded-full"
      />
    </button>
  );
}
