"use client";
import React from "react";

import MiddleComponent from "./midComponent";
import RightComponent from "./rightComponent";
import DetailBar from "./DetailBar";
import { ProfileComponent } from "./ProfileComponent";
import { RoleBar } from "./RoleBar";
import { RoleIcon } from "./RoleIcon";
import { UserCard } from "./UserCard";
import { useEffect, useState } from "react";
import { User, Role } from "../types";
import { getByCookies } from "@/app/utils/https";
import { AddRoleIcon } from "./AddRoleIcon";

/*
const MyPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    getByCookies("user").then((res) => setUser(res));
  }, []);

  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-blue-100 flex">
        {user && <RoleBar user={user} />}
        <DetailBar />
      </div>
      <MiddleComponent role={role}/>
      <RightComponent />
    </div>
  );
};

export default MyPage; */
const MyPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  var [selectedRole, setSelectedRole] = useState<Role | null>(null);
  var [viewProfile, setViewProfile] = useState<Boolean>(false);
  const middleComponent =
    viewProfile && selectedRole ? (
      <ProfileComponent role={selectedRole} />
    ) : (
      <MiddleComponent />
    );
  useEffect(() => {
    getByCookies("user").then((res) => setUser(res));
  }, []);
  useEffect(() => {
    getByCookies("role").then((res) => setRoles(res as Role[]));
  }, []);
  const [roles, setRoles] = useState<Role[]>([]);
  const selectRoleHandler = (role: Role) => {
    if (selectedRole?._id == role._id) {
      console.log("set back to null");
      setSelectedRole(null);
      return;
    }
    setSelectedRole(role);
  };

  return (
    <div className="flex h-screen">
      <div className="flex-2 bg-blue-100 flex">
        {user && (
          <div className="bg-black ">
            <UserCard user={user} />
            <div className="bg-black flex justify-center overflow-y-scroll no-scrollbar h-full">
              <ul className="w-full mt-2">
                {roles.map((role) => (
                  <li
                    key={role._id}
                    className={`flex justify-center mb-1 p-2 ${
                      selectedRole?._id === role._id
                        ? "bg-gray-700"
                        : "hover:bg-gray-700"
                    }`}
                  >
                    <div onClick={() => selectRoleHandler(role)}>
                      {role && <RoleIcon role={role} />}
                    </div>
                  </li>
                ))}
                <li className="flex justify-center mb-1 p-2 hover:bg-gray-700">
                  {user && <AddRoleIcon user={user} />}
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
      <div className="flex-[4_4_0%] bg-green-100 flex">
        {selectedRole && (
          <DetailBar
            role={selectedRole}
            setViewProfile={setViewProfile}
            viewProfile={viewProfile}
          />
        )}

        <div className="flex-[4_4_0%] bg-gray-600 ">{middleComponent}</div>
      </div>
      <RightComponent />
    </div>
  );
};

export default MyPage;
