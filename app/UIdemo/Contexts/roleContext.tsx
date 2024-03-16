import React, { createContext, useState, useContext, ReactNode } from "react";

type RoleContextType = {
  showDetail: boolean;
  setShowDetail: (show: boolean) => void;
};

const defaultState: RoleContextType = {
  showDetail: false,
  setShowDetail: () => {},
};

const RoleContext = createContext<RoleContextType>(defaultState);

export const useRoleContext = () => useContext(RoleContext);

type RoleProviderProps = {
  children: ReactNode; // Define the type for children
};

export function RoleProvider({ children }: RoleProviderProps) {
  const [showDetail, setShowDetail] = useState(false);
  return (
    <RoleContext.Provider value={{ showDetail, setShowDetail }}>
      {children}
    </RoleContext.Provider>
  );
}
