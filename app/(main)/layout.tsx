import { UserProvider } from "@/app/contexts/UserContext";
import { ReactNode } from "react";

export default function MainLayout({
  children,
}: {
  children: ReactNode
})  {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  );
}
