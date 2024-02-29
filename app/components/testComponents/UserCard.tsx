"use strict";
import { IProfile } from "@/app/api/_models/Profile";
import { User } from "@/app/types";
// Create a user card component
const DeleteButton = ({ onDelete }: { onDelete: (...args: any[]) => any }) => {
  return (
    <div>
      <button
        onClick={onDelete}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded text-sm"
      >
        Delete
      </button>

    </div>
  );
};
export function UserCard({ user }: { user: User }) {
  const deleteUserHandler = async () => {
    console.log(user);
    await fetch("/api/dbtest/user", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user._id })
    });
    location.reload();
  };
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white text-black">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center font-bold text-xl mb-2">
          {user.name}
          <DeleteButton
            onDelete={deleteUserHandler}
          />
        </div>

        <p className="text-gray-700 text-base">
          {user.profile.about}
        </p>
        <p className="text-gray-800 text-sm">
          ID:
          {user._id.toString()}
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
                RoleId -
                {" "}
                {role._id}
                {" "}
                {role.profile.displayName}
                <p className="text-gray-700 text-base">
                  {role.profile._id}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}