import React from 'react';
import { UserCard } from './UserCard';
import { Role, User } from "@/app/types";
export function RoleBar({ user }: { user: User }){
  return <div className="flex-1 bg-blue-200">
    {user && <UserCard user={user} />}
    </div>;
};

