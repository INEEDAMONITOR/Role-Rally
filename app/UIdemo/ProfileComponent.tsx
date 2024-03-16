import React from "react";
import { Role, User } from "@/app/types";
import Image from "next/image";
export function ProfileComponent({ role }: { role: Role }) {
  return (
    <>
      <div>Profile {role.profile.displayName}</div>
      <div>
        <Image
          src={role.profile.avatar ? role.profile.avatar : "/default.jpg"}
          alt="avatar"
          width={50}
          height={50}
          className="rounded-full"
        />
      </div>
      <div>{role.profile.about}</div>
    </>
  );
}
