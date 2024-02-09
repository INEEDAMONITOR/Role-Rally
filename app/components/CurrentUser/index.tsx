"use client";

import Image from "next/image";
import { useSendbirdStateContext } from "@sendbird/uikit-react";
import React from "react";
import toast from "react-hot-toast";

const CurrentUser = () => {
  const store = useSendbirdStateContext();
  const user = store?.stores?.userStore?.user;

  const handleSwitchUser = async () => {
    const userId = localStorage.getItem("sendbirdUserId");

    localStorage.setItem("sendbirdUserId", userId === "Jacob" ? "testUser" : "Jacob");
    location.reload();
    toast.loading("Switching user...");
  };

  return (
    <button
      type="button"
      className="m-3 relative rounded-md text-left focus:outline-none focus:ring-2 focus:ring-purple-400"
      onClick={handleSwitchUser}
    >
      <div className="flex space-x-5 p-2">
        <div className="self-center">
          <Image
            className="rounded-full"
            src={user?.profileUrl}
            alt="avatar"
            width={48}
            height={48}
          />
        </div>
        <div>
          <div>
            <span className="flex items-center">
              <span className="block truncate">
                {user?.nickname}
              </span>
            </span>
          </div>
          <div className="text-gray-400">
            {user?.userId}
          </div>
        </div>
        <div>
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center">
            <svg
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
      </div>
    </button>
  );
};

export default CurrentUser;