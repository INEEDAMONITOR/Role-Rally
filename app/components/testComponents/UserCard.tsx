"use strict";
import { IProfile } from "@/app/api/models/Profile";
import { User } from "@/app/types";
// Create a user card component
export function UserCard({ user }: { user: User }) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white text-black">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">
          {user.name}
        </div>
        <p className="text-gray-700 text-base">
          {user.profile.about}
        </p>
        <p className="text-gray-800 text-sm">
          ID:
          {user._id}
        </p>
        <div className="mt-4">
          <span className="text-lg font-semibold block mb-2">
            Roles
          </span>
          <ul className="list-disc list-inside">
            {/* Assuming user.roles is an array of role names */}
            {user.roles.map((role, index) => (
              <li
                key={index}
                className="text-gray-700 text-base"
              >
                {role.profile.displayName}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}