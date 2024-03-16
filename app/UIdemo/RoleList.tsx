import React from "react";
import { UserCard } from "./UserCard";
import { RoleIcon } from "./RoleIcon";
import { Role, User } from "@/app/types";
export function RoleList({ roles }: { roles: Role[] }) {
  return (
    <div className="bg-gray-700 flex justify-center overflow-y-scroll no-scrollbar h-full">
      {" "}
      <ul className="w-full mt-2">
        {roles.map((role) => (
          <li
            key={role._id}
            className="hover:bg-gray-800 flex justify-center mb-1 p-2"
          >
            {role && <RoleIcon role={role} />}
          </li>
        ))}
      </ul>
    </div>
  );
}
