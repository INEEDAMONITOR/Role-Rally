"use client";

import { UserContext } from "@/app/contexts/UserContext";
import { Role } from "@/app/types";
import { getByCookies } from "@/app/utils/https";
import { useContext, useEffect, useState } from "react";
import { Avatar, ListGroup, Tooltip } from "flowbite-react";
import { Bars } from "@/app/components/Icon";
import RoleAvatar from "@/app/components/RoleSelector/RoleAvatar";

interface RoleSwitcherProps {
  selectedRoleId?: string,
  onSelectedRole?: (role: Role) => void;
  onRolesFetching?: () => void;
  onRolesFetchingSuccess?: (roles: Role[]) => void;
  onRolesFetchingError?: (error: any) => void;
}

export default function RoleSelector(props: RoleSwitcherProps) {
  const { selectedRoleId, onSelectedRole } = props;
  const { user } = useContext(UserContext);
  const [roles, setRoles] = useState<Role[]>([]);

  const handleSelectRole = (role: Role) => {
    onSelectedRole?.(role);
  };

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        props.onRolesFetching?.();

        const res: Role[] = await getByCookies("role");

        setRoles(res);
        props.onRolesFetchingSuccess?.(res);
      } catch (e) {
        props.onRolesFetchingError?.(e);
      }
    };

    fetchRoles();

  }, []);

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col items-center">
        <div className="px-3 py-6 mx-auto fixed bg-black z-20">
          <Avatar placeholderInitials="RR" />
        </div>
        <div className="w-4 h-24" />
      </div>

      <div className="w-full flex-grow flex flex-col justify-between items-center">
        <div className="flex flex-col items-center space-y-2">
          {roles.map((role) => (
            <RoleAvatar
              key={role._id}
              role={role}
              selected={selectedRoleId === role._id}
              onClick={handleSelectRole}
            />
          ))}
        </div>
        <div className="p-2 fixed bg-black bottom-0">
          <Tooltip
            content={(
              // TODO: ListGroup theme adjust
              <ListGroup className="w-48">
                <ListGroup.Item href="/settings/create-role">
                  Add New Role
                </ListGroup.Item>
                <ListGroup.Item href="/login?out=1">
                  Log Out
                </ListGroup.Item>
              </ListGroup>
            )}
            trigger="click"
            arrow={false}
          >
            <div className="p-2 px-3 rounded-xl hover:bg-zinc-700 cursor-pointer">
              <Bars />
            </div>
          </Tooltip>
        </div>
        <div className="w-4 h-20" />
      </div>
    </div>
  );
}