"use strict";
import { ProfileCard } from "@/app/role-demo/ProfileCard";
import { RoleCard } from "@/app/role-demo/RoleCard";
import { Button } from "@/app/role-demo/Button";
import { Role, User } from "@/app/types";
import { getByCookies } from "@/app/utils/https";
import { logout } from "@/app/utils/logout";
import { useEffect, useState } from "react";

export function UserCard({ user }: { user: User }) {

  useEffect(() => {
    getByCookies("role").then((res) => setRoles(res as Role[]));
  }, []);

  const [roles, setRoles] = useState<Role[]>([]);
  const deleteRoleHandler = async (roleId: string) => {
    const role = roles.find((role) => role._id === roleId);
    if (role) {
      const response = await fetch("/api/role/{roleId}", {
        method: "DELETE",
      });
      const res = await response.json();
    }

  };
  return (
    <div className="max-w-lg rounded overflow-hidden shadow-lg bg-white text-black">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center font-bold text-xl mb-2">
          {user.name}
          <Button handler={() => {
            logout();
            location.reload();
          }}
          >
            Logout
          </Button>
        </div>
        <ProfileCard profile={user.profile} />
        <p className="text-gray-700 text-base">
          {user.profile.about}
        </p>
        <p className="text-gray-800 text-sm">
          ID:
          {user._id.toString()}
        </p>
        <p className="text-gray-800 text-sm">
          Email:
          {user.email}
        </p>
        <div className="mt-4">
          <span className="text-lg font-semibold block mb-2">
            Roles
          </span>
          {roles.map((role, index) => (
            <div
              key={index}
              className="mt-5"
            >
              <RoleCard
                role={role}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}