"user strict";

import { ProfileCard } from "@/app/role-demo/ProfileCard";
import { Role } from "@/app/types";

export const RoleCard = ({ role }: { role: Role }) => {

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-300 text-black">
      <div className="px-6 py-4">
        <p className="text-gray-700 text-base">
          Role Id:
          {" "}
          {role._id}
        </p>
        <ProfileCard profile={role.profile} />
      </div>
    </div>
  );
};