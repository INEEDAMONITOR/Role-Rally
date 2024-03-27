import React from "react";
import { Role, User } from "@/app/types";
import Button from "@/app/components/Button";

interface UserAvatarProps {
  user: User;
  onClick?: (user: User) => void;
}

interface RoleAvatarProps {
  role: Role,
}

export const UserAvatar = (props: UserAvatarProps) => {
  const { user } = props;

  return (
    <Button 
      display={{
        type: "ICON",
      }}
      icon={{
        src: user.profile?.avatar || "/default.jpg",
        alt: "avatar",
      }}
    />
  );
};

export const RoleAvatar = (props: RoleAvatarProps) => {
  const { role } = props;

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
