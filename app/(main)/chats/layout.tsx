"use client";

import RoleSelector from "@/app/components/RoleSelector";
import { Role } from "@/app/types";
import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import { ReactNode, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Spinner } from "flowbite-react";
import { useRouter } from "next/navigation";

export default function ChatsLayout({
  children,
}: {
  children: ReactNode
}) {
  const router = useRouter();
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


  const handleSelectRole = async (role?: Role) => {
    if (!role) {
      localStorage.clear();
      setCurrentRoleId(undefined);
      setAccessToken(undefined);

      return;
    }
    const roleId = role._id;
    const token = await fetchAccessToken(roleId);
    localStorage.setItem("roleId", roleId);
    setCurrentRoleId(roleId);
    setAccessToken(token);

    // TODO: fix role switching hack
    location.href = "/chats";
  };

  const handleRolesFetchingSuccess = (res: Role[]) => {
    setRolesLoading(false);

    if (res.length === 0) {
      router.replace("/role/create?new=1");
    }
  };

  const handleRolesFetchingError = () => {
    setRolesLoading(false);
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

  return (
    <div className="flex">
      <div className="flex-shrink-0 border-e border-zinc-800 px-1 h-screen overflow-y-scroll no-scrollbar">
        <RoleSelector
          selectedRoleId={currentRoleId}
          onSelectedRole={handleSelectRole}
          onRolesFetchingSuccess={handleRolesFetchingSuccess}
          onRolesFetchingError={handleRolesFetchingError}
        />
      </div>
      <div className="flex-grow overflow-hidden">
        {(!isRolesLoading && accessToken && currentRoleId) ? (
          <SendbirdProvider
            appId={process.env.NEXT_PUBLIC_SENDBIRD_APP_ID as string}
            userId={currentRoleId}
            accessToken={accessToken}
            theme="dark"
            colorSet={{
              "--sendbird-dark-background-600": "#000000"
            }}
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