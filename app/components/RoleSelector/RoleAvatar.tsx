import React from "react";
import { Role } from "@/app/types";
import { Avatar, Tooltip } from "flowbite-react";
import ProfileCard from "@/app/components/ProfileCard";

interface Props {
  role: Role;
  selected: boolean;
  onClick?: (role: Role) => void;
}

export default function RoleAvatar (props: Props) {
  const { role, selected, onClick } = props;

  const handleClick = () => {
    onClick?.(role);
  };

  return (
    <Tooltip
      className="bg-black border border-zinc-800"
      animation={false}
      content={
        <ProfileCard data={role.profile} />
      }
      placement="right"
      arrow={false}
    >
      <Avatar
        className={`cursor-pointer p-3 rounded-2xl ${selected ? "bg-purple-600" :"hover:bg-zinc-700"}`}
        rounded
        img={role.profile?.avatar}
        onClick={handleClick}
      />
    </Tooltip>
  );
}
