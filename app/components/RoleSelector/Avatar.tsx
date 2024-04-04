import React from "react";
import { Role, User } from "@/app/types";
import { Avatar } from "flowbite-react";

interface UserAvatarProps {
  user: User;
  onClick?: (user: User) => void;
}

interface RoleAvatarProps {
  role: Role;
  selected: boolean;
  onClick?: (role: Role) => void;
}

export const UserAvatar = (props: UserAvatarProps) => {
  const { user } = props;

  return (
    <Avatar
      className={"cursor-pointer p-3 hover:bg-zinc-700"}
      img={user.profile?.avatar}
    />
  );
};

export const RoleAvatar = (props: RoleAvatarProps) => {
  const { role, selected, onClick } = props;

  const handleClick = () => {
    onClick?.(role);
  };

  return (
    <Avatar
      className={`cursor-pointer p-3 rounded-2xl ${selected ? "bg-purple-600" :"hover:bg-zinc-700"}`}
      rounded
      img={role.profile?.avatar}
      onClick={handleClick}
    />
  );
};
