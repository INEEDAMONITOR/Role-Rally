import { Types } from "mongoose";
import RoleModel, { IRole } from "@/app/api/_models/Role";
import { warn } from "console";
import { createProfile, deleteProfile } from "./profile";

export const createRole = async () => {
  let newProfile = null;

  try {
    newProfile = await createProfile();
    const newRole = await RoleModel.create<IRole>({
      profileId: newProfile._id,
      accessibility: "public",
      friends: [],
      chatRooms: [],
    });
    return newRole;
  } catch (error) {
    if (newProfile) {
      await deleteProfile(newProfile._id);
    }
    warn(error);
  }
};

export const getRoles = async ({ userId }: { userId: any }) => {
  // TODO: Add the logic to get the roles by the user id
  const roles = await RoleModel.find({ profileId: userId }).exec();
  return roles;
};
export const deleteRole = async (roleId: Types.ObjectId) => {
  RoleModel.findById(roleId).then(async role => {
    if (role) {
      await deleteProfile(role.profile);
    }
    RoleModel.findByIdAndDelete(roleId).exec();
  });
};
