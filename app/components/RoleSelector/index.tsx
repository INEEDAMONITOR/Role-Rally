"use client";

import { UserContext } from "@/app/contexts/UserContext";
import { Profile, Role } from "@/app/types";
import { getByCookies } from "@/app/utils/https";
import { useCallback, useContext, useEffect, useState } from "react";
import { Avatar, Tooltip } from "flowbite-react";
import { Bars } from "@/app/components/Icon";
import ProfileCard from "@/app/components/ProfileCard";
import Dialog from "@/app/components/Dialog";
import ProfileForm from "@/app/components/ProfileForm";
import UserMenu, { USER_LINKS, UserLink } from "@/app/components/UserMenu";
import ProfileControl from "@/app/components/ProfileControl";
import Image from "next/image";

interface RoleSwitcherProps {
  selectedRoleId?: string,
  onSelectedRole?: (role?: Role) => void;
  onRolesFetching?: () => void;
  onRolesFetchingSuccess?: (roles: Role[]) => void;
  onRolesFetchingError?: (error: any) => void;
}

export default function RoleSelector(props: RoleSwitcherProps) {
  const { selectedRoleId, onSelectedRole } = props;
  const { user } = useContext(UserContext);
  const [roles, setRoles] = useState<Role[]>([]);
  const [currentEditProfile, setCurrentEditProfile] = useState<Profile>();
  const [isEditProfileVisible, setEditProfileVisible] = useState(false);
  const [isManageProfileVisible, setManageProfileVisible] = useState(false);

  const handleFetchRoles = useCallback(async () => {
    try {
      props.onRolesFetching?.();

      const res: Role[] = await getByCookies("role");

      setRoles(res);
      props.onRolesFetchingSuccess?.(res);
    } catch (e) {
      props.onRolesFetchingError?.(e);
    }
  }, []);

  const handleSelectRole = (role: Role) => {
    onSelectedRole?.(role);
  };

  const handleEditProfile = async (profile: Profile) => {
    const res = await fetch(`/api/role/${profile.ownerRoleId}`);
    const data = await res.json();

    setCurrentEditProfile(data?.data?.profile ? data.data.profile : undefined);
    setEditProfileVisible(true);
  };

  const handleEditProfileClose = (refresh: boolean) => {
    setEditProfileVisible(false);
    setCurrentEditProfile(undefined);

    if (refresh) {
      handleFetchRoles();
    }
  };

  const handleDeleteProfile = (profile: Profile) => {
    setEditProfileVisible(false);
    
    if (localStorage.getItem("roleId") === profile.ownerRoleId.toString()) {
      onSelectedRole?.(undefined);
    }

    setCurrentEditProfile(undefined);
    handleFetchRoles();
  };

  const handleManageProfileClose = () => {
    setManageProfileVisible(false);
  };

  const handleUserLinkClick = (link: UserLink) => {
    if (link.id === "profile-settings") {
      setManageProfileVisible(true);
    }
  };

  useEffect(() => {
    handleFetchRoles();
  }, [handleFetchRoles]);

  if (!user || roles.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col h-full border-e border-zinc-800 px-1">
      <div className="flex flex-col items-center">
        <div className="px-3 py-6 mx-auto fixed bg-black z-20">
          <Image
            className="rounded-full"
            width={60}
            height={60}
            src="/logo.png"
            alt="Role Rally"
          />
        </div>
        <div className="w-4 h-24" />
      </div>

      <div className="w-full flex-grow flex flex-col justify-between items-center">
        <div className="flex flex-col items-center space-y-2">
          {roles.map((role) => (
            <Tooltip
              key={role._id}
              className="bg-black border border-zinc-600"
              animation={false}
              content={
                <ProfileCard
                  data={role.profile}
                  onClickEdit={handleEditProfile}
                />
              }
              placement="right"
              arrow={false}
            >
              <Avatar
                className={`cursor-pointer p-3 rounded-2xl ${selectedRoleId === role._id ? "bg-purple-600" :"hover:bg-zinc-700"}`}
                rounded
                img={role.profile?.avatar}
                onClick={() => handleSelectRole(role)}
              />
            </Tooltip>
          ))}
        </div>
        <div className="p-2 fixed bg-black bottom-0">
          <Tooltip
            className="bg-zinc-800 p-2"
            content={(
              <UserMenu
                links={USER_LINKS}
                onMenuClick={handleUserLinkClick}
              />
            )}
            trigger="click"
            arrow={false}
          >
            <div className="p-2 px-3 rounded-xl hover:bg-zinc-700 cursor-pointer">
              <Bars />
            </div>
          </Tooltip>
        </div>
        <div className="w-4 h-20" />
        <Dialog
          className="max-w-xl"
          header="Edit Proifle"
          isVisible={isEditProfileVisible}
          onClickClose={() => handleEditProfileClose(false)}
        >
          <ProfileForm
            defaultValues={currentEditProfile}
            onSubmit={() => handleEditProfileClose(true)}
            onDelete={handleDeleteProfile}
          />
        </Dialog>
        <ProfileControl
          roles={roles}
          isVisible={isManageProfileVisible}
          onClose={handleManageProfileClose}
        />
      </div>
    </div>
  );
}