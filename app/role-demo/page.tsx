"use client";

import { useEffect, useState } from "react";
import { User } from "../types";
import { getByCookies } from "@/app/utils/https";
import { UserCard } from "@/app/role-demo/UserCard";


const RoleDemo = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getByCookies("user").then((res) => setUser(res));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4 gap-10">
      <a
        href="/chats"
        className="text-2xl text-center text-gray-500 p-4"
      >
        Go to Chat Demo Page
      </a>
      {user && <UserCard user={user} />}
    </div >
  );
};


export default RoleDemo;