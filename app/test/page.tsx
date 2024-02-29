"use client";

import { useEffect, useState } from "react";
import { Types } from "mongoose";
import { UserCard } from "@/app/components/testComponents/UserCard";
import { Role, User } from "../types";
import { IUser } from "../api/_models/User";
import { IRole } from "../api/_models/Role";
import { CreateUserForm } from "@/app/components/testComponents/CreateUserForm";

export const createUser = async (user: { name: string, email: string }) => {
  const response = await fetch("http://localhost:3000/api/dbtest/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });
  const data = await response.json();
  return data;
};

const getUsers = async () => {
  const response = await fetch("http://localhost:3000/api/dbtest/user", {
    method: "GET"
  });
  let users = await response.json() as User[];
  console.log(users);
  users = await Promise.all(users.map((user) => enhanceUser(user))) as User[];
  return users as User[];
};

const enhanceUser = async (user: IUser) => {
  const profile = await getProfile(user.profileId);
  let roles: Partial<Role>[] | IRole[] = await Promise.all(user.rolesId.map((roleId) => getRole(roleId))) as IRole[];
  roles = await Promise.all(roles.map((role) => enhanceRoles(role as IRole)));
  return {
    ...user,
    profile,
    roles
  } as unknown as User;
};

const enhanceRoles = async (role: IRole) => {
  const profile = await getProfile(role.profileId);
  return {
    ...role,
    profile
  };
};

const getRole = async (roleId: Types.ObjectId | string) => {
  const response = await fetch(`http://localhost:3000/api/dbtest/role/${roleId}`, {
    method: "GET"
  });
  const data = await response.json();
  return data;
};

const getProfile = async (profileId: Types.ObjectId) => {
  const response = await fetch(`http://localhost:3000/api/dbtest/profile/${profileId}`, {
    method: "GET"
  });
  const data = await response.json();
  return data;
};

const deleteUser = async (userId: Types.ObjectId) => {
  const response = await fetch("http://localhost:3000/api/dbtest/user/", {
    method: "DELETE",
    body: JSON.stringify({
      userId: userId
    }),
  });
};

const Test = () => {
  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
    });
  }, []);
  const [users, setUsers] = useState<User[]>([]); // Update the type of state
  console.log(users);
  // handle the data
  return (
    <div className="flex flex-col items-center justify-center p-4 gap-10">
      {
        users?.map((user) => {
          return (
            <div key={user._id.toString()}>
              <UserCard
                user={user}
              />
            </div>
          );
        })
      }
      <CreateUserForm />
    </div >
  );
};
export default Test;