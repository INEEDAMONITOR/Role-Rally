import { Types } from "mongoose";
import RoleModel, { IRole } from "@/app/api/_models/Role";
import { warn } from "console";
import {
  generateFindOneQuery,
  generateFindQuery,
} from "@/app/api/_services/utils";
import { createProfile, deleteProfile } from "@/app/api/_services/profile";
import { dbConnect } from "@/app/api/_utils";
interface RoleProps extends Omit<IRole, "_id" | "profileId" | "ownerId"> {
  _id: string | Types.ObjectId;
  profileId: string | Types.ObjectId;
  ownerId: string | Types.ObjectId;
}
type QueryProps = Partial<RoleProps> | string | Types.ObjectId;

export const createRole = async (ownerId?: Pick<RoleProps, "ownerId">) => {
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

export const getRole = generateFindOneQuery<typeof RoleModel, QueryProps>(
  RoleModel
);

export const getRoles = generateFindQuery<typeof RoleModel, QueryProps>(
  RoleModel
);

export const deleteRole = async (roleId: Pick<RoleProps, "_id">) => {
  const role = await getRole(roleId, "-_id profileId");
  await deleteProfile(role.profileId);
  RoleModel.findByIdAndDelete(roleId).exec();
};
