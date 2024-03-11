import React from 'react';
import {RoleBar} from './RoleBar';
import DetailBar from './DetailBar';
import { Role, User } from "@/app/types";

export function LeftComponent({ user }: { user: User }) {
  return <div className="flex-1 bg-blue-100 flex h-screen">
    {user && <RoleBar user={user} />}
    <DetailBar />
  </div>;
};

