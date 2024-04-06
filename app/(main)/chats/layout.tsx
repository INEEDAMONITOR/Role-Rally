"use client";

import RoleSelector from "@/app/components/RoleSelector";
import { Role } from "@/app/types";
import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import { ReactNode, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Spinner } from "flowbite-react";

export default function ChatsLayout({
  children,
}: {
  children: ReactNode
}) {
  const [accessToken, setAccessToken] = useState();
  const [currentRoleId, setCurrentRoleId] = useState<string>();
  const [isRolesLoading, setRolesLoading] = useState(true);

  const fetchAccessToken = async (sendbirdUserId: string) => {
    const res = await (await fetch(`/api/users/${sendbirdUserId}`)).json();

    if (res?.data?.error) {
      toast.error(res?.data?.message);
      return;
    }

    return res.data.access_token;
  };

  useEffect(() => {
    const roleId = localStorage.getItem("roleId");

    if (!roleId) {
      return;
    }

    fetchAccessToken(roleId).then((t) => {
      setCurrentRoleId(roleId);
      setAccessToken(t);
    });

  }, []);

  const handleSelectRole = async (role: Role) => {
    const roleId = role._id;
    const token = await fetchAccessToken(roleId);
    localStorage.setItem("roleId", roleId);
    setCurrentRoleId(roleId);
    setAccessToken(token);

    location.href = "/chats";
  };

  const handleRolesFetchingCompleted = () => {
    setRolesLoading(false);
  };

  return (
    <div className="flex">
      <div className="flex-shrink-0 border-e border-zinc-800 px-1 h-screen overflow-y-scroll no-scrollbar">
        <RoleSelector
          selectedRoleId={currentRoleId}
          onSelectedRole={handleSelectRole}
          onRolesFetchingSuccess={handleRolesFetchingCompleted}
          onRolesFetchingError={handleRolesFetchingCompleted}
        />
      </div>
      <div className="flex-grow">
        {(accessToken && currentRoleId) ? (
          <SendbirdProvider
            appId={process.env.NEXT_PUBLIC_SENDBIRD_APP_ID as string}
            userId={currentRoleId}
            accessToken={accessToken}
            theme="dark"
          >
            {children}
          </SendbirdProvider>
        ): (
          <div className="flex justify-center text-center items-center h-screen">
            <div className="text-2xl text-gray-500">
              {isRolesLoading ? (
                <Spinner
                  color="purple"
                  size="xl"
                />
              ) : "Choose one role on the left"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}