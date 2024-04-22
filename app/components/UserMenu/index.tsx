import Link from "next/link";
import { AddUser, Cog } from "@/app/components/Icon";
import { ReactNode } from "react";

export type UserLink = {
  id: string;
  label: ReactNode;
  url?: string;
  icon?: ReactNode;
  type: string;
}

export const USER_LINKS: UserLink[] = [
  {
    id: "add-new-role",
    url: "/role/create",
    label: "Add New Role",
    icon: <AddUser className="text-white" />,
    type: "page",
  },
  {
    id: "profile-settings",
    label: "Profile Settings",
    icon: <Cog className="text-white" />,
    type: "dialog",
  },
  {
    id: "log-out",
    url: "/login?out=1",
    label: "Log Out",
    type: "system",
  }
];

type Props = {
  links: UserLink[];
  onMenuClick?: (link: UserLink) => void;
}

export default function UserMenu(props: Props) {
  const { links }=props;

  return (
    <div className="w-60">
      {links.map(l => (
        <Link
          key={l.id}
          href={l.url ?? ""}
          onClick={() => props.onMenuClick?.(l)}
        >
          {l.type === "system" && links.length > 1 &&
            <div className="border-t border-zinc-700 my-2" />
          }
          <div
            className={`cursor-pointer hover:bg-zinc-700 px-4 py-3 rounded-xl ${l?.icon ? "flex items-center space-x-3" : ""}`}
          >
            <div>
              {l?.icon}
            </div>
            <div>
              {l.label}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}