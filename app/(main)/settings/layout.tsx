"use client";

import { ReactNode } from "react";
import { Back, Bars } from "@/app/components/Icon";
import { useRouter, useSearchParams } from "next/navigation";
import NavBar from "@/app/components/NavBar";
import { ListGroup, Tooltip } from "flowbite-react";

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
              content={(
                // TODO: ListGroup theme adjust
                <ListGroup className="w-48">
                  <ListGroup.Item href="/login?out=1">
                    Log Out
                  </ListGroup.Item>
                </ListGroup>
              )}
              trigger="click"
              arrow={false}
            >
              <Bars className="p-2 px-3 rounded-xl hover:bg-zinc-700 cursor-pointer" />
            </Tooltip>
          </div> :
          <Back onClick={handleBack} />
        }
      </NavBar>
      {children}
    </>
  );
}