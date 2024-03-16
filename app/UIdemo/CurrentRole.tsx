import { Role, User } from "@/app/types";
import Image from "next/image";
import { ProfileIcon } from "./Icons/ProfileIcon";
import { SettingIcon } from "./Icons/SettingIcon";
export function CurrentRole({
  role,
  setViewProfile,
  viewProfile,
}: {
  role: Role;
  setViewProfile: (view: boolean) => void;
  viewProfile: Boolean;
}) {
  const toggleViewProfile = () => {
    //临时处理，后面加入全局要改
    setViewProfile(!viewProfile);
  };

  return (
    <div className="flex items-center space-x-4 bg-gray-800 p-2 rounded-lg">
      <Image
        src={role.profile.avatar ? role.profile.avatar : "/default.jpg"}
        alt="avatar"
        width={50}
        height={50}
        className="rounded-full"
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">
          {role.profile.displayName}
        </p>
        <p className="text-xs text-green-500 truncate">Online</p>
      </div>

      <button aria-label="Profile" onClick={toggleViewProfile}>
        <ProfileIcon />
      </button>
      <button aria-label="Setting">
        <SettingIcon />
      </button>
    </div>
  );
}
