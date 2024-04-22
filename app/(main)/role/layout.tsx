"use client";

import { ReactNode } from "react";
import { Back, Bars } from "@/app/components/Icon";
import { useRouter, useSearchParams } from "next/navigation";
import NavBar from "@/app/components/NavBar";
import { ListGroup, Tooltip } from "flowbite-react";
import UserMenu, { USER_LINKS } from "@/app/components/UserMenu";

export default function SettingsLayout({
  children,
}: {
  children: ReactNode
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleBack = () => {
    router.back();
  };
  
  return (
    <>
      <NavBar>
        {searchParams.get("new") ?
          <div className="flex items-center">
            <Tooltip
              className="bg-zinc-800 p-2"
              content={(
                <UserMenu links={USER_LINKS.filter(l => l.id === "log-out")} />
              )}
              trigger="click"
              arrow={false}
            >
              <div className="p-2 px-3 rounded-xl hover:bg-zinc-700 cursor-pointer">
                <Bars />
              </div>
            </Tooltip>
          </div> :
          <div
            className="flex items-center w-12 h-full text-gray-500 hover:text-gray-400 cursor-pointer"
            onClick={handleBack}
          >
            <Back />
          </div>
        }
      </NavBar>
      {children}
    </>
  );
}