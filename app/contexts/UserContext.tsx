"use client";

import { createContext, Dispatch,ReactNode, SetStateAction, useEffect,useState } from "react";
import { User } from "@/app/types";
import { getByCookies } from "@/app/utils/https";

type UserState = User | null;

type UserContextType = {
  user: UserState,
  setUser: Dispatch<SetStateAction<UserState>>;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export function UserProvider({ 
  children,
} :{
  children: ReactNode,
}) {
  const [user, setUser] = useState<UserState>(null);

  useEffect(() => {
    getByCookies("user").then((res) => setUser(res));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}