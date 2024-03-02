import mongoose, { Types } from "mongoose";
import RoleModel, { IRole } from "@/app/api/_models/Role";
import ProfileModel from "@/app/api/_models/Profile";
import { warn } from "console";
import {
  Selector,
  generateFindOneQuery,
  generateFindQuery,
} from "@/app/api/_services/utils";
import {
  ProfileProps,
  createProfile,
  deleteProfile,
  getProfile,
} from "@/app/api/_services/profile";
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

    const role = await RoleModel.create<IRole>({
      profileId: newProfile._id,
      accessibility: "public",
      ownerId: ownerId,
      friends: [],
      chatRooms: [],
    });

    await ProfileModel.findByIdAndUpdate(newProfile._id, {
      ownerRoleId: role._id,
    }).exec();

    return role;
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

export const getRoleWithProfile = async (
  props: QueryProps,
  selector?: Selector
) => {
  let role = await getRole(props, selector);
  try {
    if (role) {
      const profile = await getProfile(role.profileId);
      role = { ...role.toObject(), profile };
    }
    return role;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const getRoles = generateFindQuery<typeof RoleModel, QueryProps>(
  RoleModel
);

export const getRolesWithProfile = async (
  props: QueryProps,
  selector?: Selector
) => {
  let roles = (await getRoles(props, selector)) as any[];
  try {
    for (let i = 0; i < roles.length; i++) {
      const profile = await getProfile({ _id: roles[i].profileId });
      roles[i] = { ...roles[i].toObject(), profile };
    }
    return roles;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const deleteRole = async (roleId: Types.ObjectId | string) => {
  const role = await getRole(roleId, "-_id profileId");
  await deleteProfile(role.profileId);
  RoleModel.findByIdAndDelete(roleId).exec();
};
