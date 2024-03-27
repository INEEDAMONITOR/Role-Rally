"use client";

import { UserContext } from "@/app/contexts/UserContext";
import { Role } from "@/app/types";
import { getByCookies } from "@/app/utils/https";
import { useContext, useEffect, useState } from "react";
import { RoleAvatar, UserAvatar } from "@/app/components/Avatar";
import { AddRole } from "@/app/components/AddRole";

interface RoleSwitcherProps {
  selectedRole: Role | null,
  onSelectedRole?: (role: Role) => void;
}

export default function RoleSelector(props: RoleSwitcherProps) {
  const { user } = useContext(UserContext);
  const [roles, setRoles] = useState<Role[]>([]);
  const [currentRole, setCurrentRole] = useState<Role | null>(null);
  
  const handleSelectRole = (role: Role) => {
    setCurrentRole(role);
    props.onSelectedRole?.(role);
  };
  
  useEffect(() => {
    getByCookies("role").then((res) => setRoles(res as Role[]));
  }, []);
  
  if (!user) {
    return null;
  }
  
  return (
    <>
      <div className="mt-2 flex justify-center">
        <UserAvatar user={user} />
      </div>
  
      <div className="border-t border-zinc-700 my-2 w-12 mx-auto" />
  
      <ul className="w-full">
        {roles.map((role) => (
          <li
            key={role._id}
            className={`flex justify-center mb-1 p-1 rounded-2xl cursor-pointer ${currentRole?._id === role._id
              ? "bg-purple-500"
              : "hover:bg-zinc-800"
            }`}
          >
            <div onClick={() => handleSelectRole(role)}>
              <RoleAvatar role={role} />
            </div>
          </li>
        ))}
        <li className="flex justify-center mb-1 p-2 rounded-2xl hover:bg-zinc-800">
          <AddRole />
        </li>
      </ul>
    </>
  );
}