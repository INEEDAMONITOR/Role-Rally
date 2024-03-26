import React from "react";
import { Role, User } from "@/app/types";
import Button from "@/app/components/Button";

interface UserAvatarProps {
  user: User;
  onClick?: (user: User) => void;
}

export const UserAvatar = (props: UserAvatarProps) => {
  const { user,onClick } = props;

  return (
    <Button 
      display={{
        type: "ICON",
      }}
      icon={{
        src: user.profile.avatar || "/default.jpg",
        alt: "avatar",
      }}
      onClick={() => onClick?.(user)}
    />
  );
};

export const RoleAvatar = ({ role }: { role: Role }) => {
  return (
    <Button 
      display={{
        type: "ICON",
        size: "SMALL",
      }}
      icon={{
        src: role.profile.avatar || "/default.jpg",
        alt: "avatar",
      }}
    />
  );
};
