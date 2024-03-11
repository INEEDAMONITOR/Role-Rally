import React from 'react';
import { Role, User } from "@/app/types";
import Image from "next/image";
import { ListButton } from './ListButton';
export function UserCard({ user }: { user: User }) {
    return (
      <div className="flex items-center p-4 border border-gray-300 rounded-lg bg-black"> 
        <Image
          src={user.profile.avatar || "/default.jpg"}
          alt="avatar"
          width={50}
          height={50}
          className="rounded-full"
        />
        <div className="px-2 flex-2 min-w-0">
          <p className="text-lg font-semibold truncate">{user.name}</p>
          <p className="text-sm text-green-600 ">Online</p>
        </div>
        <div className ="flex-1  min-w-2 ">
            <ListButton/>
        </div>
        
      </div>
    );
  };
  
