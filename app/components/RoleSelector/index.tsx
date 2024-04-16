"use client";

import { UserContext } from "@/app/contexts/UserContext";
import { Profile, Role } from "@/app/types";
import { getByCookies } from "@/app/utils/https";
import { useCallback, useContext, useEffect, useState } from "react";
import { Avatar, ListGroup, Tooltip } from "flowbite-react";
import { Bars } from "@/app/components/Icon";
import ProfileCard from "@/app/components/ProfileCard";
import Dialog from "@/app/components/Dialog";
import { ProfileForm } from "@/app/components/Form";

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

  useEffect(() => {
    handleFetchRoles();
  }, [handleFetchRoles]);

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col items-center">
        <div className="px-3 py-6 mx-auto fixed bg-black z-20">
          <Avatar placeholderInitials="RR" />
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
          <Dialog
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
        </div>
        <div className="p-2 fixed bg-black bottom-0">
          <Tooltip
            content={(
              // TODO: ListGroup theme adjust
              <ListGroup className="w-48">
                <ListGroup.Item href="/role/create">
                  Add New Role
                </ListGroup.Item>
                <ListGroup.Item href="/login?out=1">
                  Log Out
                </ListGroup.Item>
              </ListGroup>
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
      </div>
    </div>
  );
}