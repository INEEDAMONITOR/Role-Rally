import React from "react";
import { Role, User } from "@/app/types";
import Image from "next/image";
import { ListButton } from "./ListButton";
export function UserCard({ user }: { user: User }) {
  return (
    <div className="flex items-center  lg bg-black justify-center">
      <Image
        src={user.profile.avatar || "/default.jpg"}
        alt="avatar"
        width={80}
        height={80}
        className="lg"
      />
    </div>
  );
}
