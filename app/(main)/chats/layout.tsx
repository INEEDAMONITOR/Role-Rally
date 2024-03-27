"use client";

import React, { ReactNode, useState } from "react";
import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import { Role } from "@/app/types";
import toast from "react-hot-toast";
import RoleSelector from "@/app/components/RoleSelector";

export default function ChatsLayout({
  children,
}: {
  children: ReactNode
}) {
  const [accessToken, setAccessToken] = useState();
  const [currentRole, setCurrentRole] = useState<Role | null>(null);

  const handleSelectRole = (role: Role) => {
    const roleId = role._id;

    const fetchUser = async () => {
      try {
        const res = await (await fetch(`/api/users/${roleId}`)).json();

        if (res?.data?.error) {
          toast.error(res?.data?.message);
          return;
        }

        localStorage.setItem("sendbirdUserId", roleId);
        setCurrentRole(role);
        setAccessToken(res.data.access_token);
      } catch (e) {
        console.error(e);
      }
    };

    fetchUser();
  };

  return (
    <div className="flex">
      <div className="flex-shrink-0 border-e border-zinc-800 px-1 h-screen overflow-y-scroll no-scrollbar">
        <RoleSelector
          selectedRole={currentRole}
          onSelectedRole={handleSelectRole}
        />
      </div>
      <div className="flex-grow">
        {accessToken && currentRole?._id && (
          <SendbirdProvider
            appId={process.env.NEXT_PUBLIC_SENDBIRD_APP_ID as string}
            userId={currentRole._id}
            accessToken={accessToken}
            theme="dark"
          >
            {children}
          </SendbirdProvider>
        )}
      </div>
    </div>
  );
}