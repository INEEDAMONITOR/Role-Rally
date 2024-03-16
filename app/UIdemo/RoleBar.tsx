import React from "react";
import { UserCard } from "./UserCard";
import { RoleList } from "./RoleList";
import { Role, User } from "@/app/types";
import { getByCookies } from "@/app/utils/https";
import { useEffect, useState } from "react";

// 文件名大写
export function RoleBar({ user }: { user: User }) {
  useEffect(() => {
    getByCookies("role").then((res) => setRoles(res as Role[]));
  }, []);

  const [roles, setRoles] = useState<Role[]>([]);
  return (
    <div className="flex-1 bg-gray-700 ">
      {user && <UserCard user={user} />}
      {user && <RoleList roles={roles} />}
    </div>
  );
}
