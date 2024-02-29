import { Types } from "mongoose";
import RoleModel, { IRole } from "@/app/api/_models/Role";
import { warn } from "console";
import {
  generateFindOneQuery,
  generateFindQuery,
} from "@/app/api/_services/utils";
import { createProfile, deleteProfile } from "@/app/api/_services/profile";
import { dbConnect } from "@/app/api/_utils";

export const createRole = async (ownerId?: string | Types.ObjectId) => {
  let newProfile = null;
  try {
    await dbConnect();
    newProfile = await createProfile();
    const newRole = await RoleModel.create<IRole>({
      profileId: newProfile._id,
      accessibility: "public",
      ownerId: ownerId,
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

interface RoleQueryProps extends Omit<IRole, "profileId" | "ownerId"> {
  profileId: string | Types.ObjectId;
  ownerId: string | Types.ObjectId;
}

export const getRole = generateFindOneQuery<typeof RoleModel, RoleQueryProps>(
  RoleModel
);

export const getRoles = generateFindQuery<typeof RoleModel, RoleQueryProps>(
  RoleModel
);

export const deleteRole = async (roleId: Types.ObjectId) => {
  RoleModel.findById(roleId).then(async role => {
    if (role) {
      await deleteProfile(role.profile);
    }
    RoleModel.findByIdAndDelete(roleId).exec();
  });
};
