import React from "react";
import { Role, User } from "@/app/types";
import Button from "@/app/components/Button";

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
    <Button
      icon={{
        type: "ROUND_BUTTON",
        lg: true,
        img: {
          src: user.profile?.avatar || "/default.jpg",
          alt: "avatar",
        }
      }}
    />
  );
};

export const RoleAvatar = (props: RoleAvatarProps) => {
  const { role, selected, onClick } = props;

  const handleClick = () => {
    onClick?.(role);
  };

  return (
    <Button
      selected={selected}
      icon={{
        img: {
          src: role.profile?.avatar || "/default.jpg",
          alt: "avatar",
        }
      }}
      onClick={handleClick}
    />
  );
};
