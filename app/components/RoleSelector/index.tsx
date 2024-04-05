"use client";

import { UserContext } from "@/app/contexts/UserContext";
import { Role } from "@/app/types";
import { getByCookies } from "@/app/utils/https";
import { useContext, useEffect, useState } from "react";
import { RoleAvatar, UserAvatar } from "@/app/components/RoleSelector/Avatar";
import { ListGroup, Tooltip } from "flowbite-react";
import ProfileCard from "@/app/components/ProfileCard";
import { Bars } from "@/app/components/Icon";

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
                animation={false}
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
        </div>
        <div className="p-2">
          <Tooltip
            content={(
              <div className="flex justify-center">
                <ListGroup className="w-48">
                  <ListGroup.Item href="/settings/create-role">
                    Roles Management
                  </ListGroup.Item>
                </ListGroup>
              </div>
            )}
            trigger="click"
            arrow={false}
          >
            <Bars className="p-2 px-3 rounded-xl hover:bg-zinc-700 cursor-pointer" />
          </Tooltip>
        </div>
      </div>
    </div>
  );
}