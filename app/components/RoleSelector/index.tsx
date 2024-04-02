"use client";

import { UserContext } from "@/app/contexts/UserContext";
import { Role } from "@/app/types";
import { getByCookies } from "@/app/utils/https";
import { useContext, useEffect, useState } from "react";
import { RoleAvatar, UserAvatar } from "@/app/components/Avatar";
import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";
import { Tooltip } from "flowbite-react";
import ProfileCard from "@/app/components/ProfileCard";

interface RoleSwitcherProps {
  selectedRole: Role | null,
  onSelectedRole?: (role: Role) => void;
}

const AddRole = () => {
  const router = useRouter();

  const handleCreateRole = () => {
    router.push("/settings/create-role");
  };

  return (
    <Button
      icon={{
        img: {
          src: "/AddIconImage.jpg",
          alt: "Add Role"
        },
        hoverable: false,
      }}
      className="opacity-50 hover:opacity-70 hover:bg-black"
      onClick={handleCreateRole}
    />
  );
};

const More = () => {
  return (
    <Button
      icon={{}}
      className="px-3"
    >
      <div className="flex flex-col items-center text-xs text-gray-300 hover:text-gray-200">
        <div>
          <svg
            className="w-8 h-8"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              d="M6 12h.01m6 0h.01m5.99 0h.01"
            />
          </svg>
        </div>
        <div>
          More
        </div>
      </div>
    </Button>
  );
};

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
    <div className="flex flex-col h-full">
      <div className="flex flex-col items-center">
        <div className="mt-3 border-b border-zinc-700 pb-3 mb-3 mx-auto">
          <UserAvatar user={user} />
        </div>
      </div>

      <div className="w-full flex-grow flex flex-col justify-between items-center">
        <div className="flex flex-col items-center space-y-2">
          {roles.map((role) => (
            <div key={role._id}>
              <Tooltip
                className="bg-black border border-zinc-800"
                content={
                  <ProfileCard data={role.profile} />
                }
                placement="right"
                arrow={false}
              >
                <RoleAvatar
                  role={role}
                  selected={currentRole?._id === role._id}
                  onClick={handleSelectRole}
                />
              </Tooltip>
            </div>
          ))}
          <More />
        </div>
        <div className="p-2">
          <AddRole />
        </div>
      </div>
    </div>
  );
}