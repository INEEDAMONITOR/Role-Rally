import React, { useState, useEffect } from "react";
import { Role, User } from "@/app/types";
import Image from "next/image";
import { ProfileCard } from "../role-demo/ProfileCard";
import { Profile } from "@/app/types";
export function ProfileComponent({ role }: { role: Role }) {
  return (
    <div className="flex items-center  justify-center w-full h-full">
      <ProfileCard profile={role.profile} />
    </div>
  );
}
