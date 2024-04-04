import { Types } from "mongoose";
import RoleModel, { IRole } from "@/app/api/_models/Role";
import ProfileModel, { IProfile } from "@/app/api/_models/Profile";
import {
  Selector,
  generateFindOneQuery,
  generateFindQuery,
} from "@/app/api/_services/utils";
import {
  deleteProfile,
  getProfile,
} from "@/app/api/_services/profile";
import { dbConnect } from "@/app/api/_utils";
import UserModel from "@/app/api/_models/User";
import { Profile } from "@/app/types";
import { sendbirdRequests } from "@/app/_lib/sendbird";

interface RoleProps extends Omit<IRole, "_id" | "profileId" | "ownerId"> {
  _id: string | Types.ObjectId;
  profileId: string | Types.ObjectId;
  ownerId: string | Types.ObjectId;
}
type QueryProps = Partial<RoleProps> | string | Types.ObjectId;

type ProfilePayload = (
  Partial<Pick<Profile, "lastName" | "phone" | "about" | "avatar" | "pronouns" | "ownerRoleId">> &
  Pick<Profile, "firstName" | "email" | "username">
);

export const createRole = async (userId: string | Types.ObjectId, profilePayload: ProfilePayload) => {
  const { firstName, email, username } = profilePayload;
  
  if (!firstName || !email || !username) {
    throw new Error("profile payload error");
  }
  // TODO: validate profilePayload
  
  await dbConnect();
  
  const profile: IProfile = await ProfileModel.create(profilePayload);
  
  const role: IRole = await RoleModel.create<IRole>({
    profileId: profile._id,
    ownerId: userId,
    friends: [],
    chatRooms: [],
  });

  await ProfileModel.findByIdAndUpdate(profile._id, {
    ownerRoleId: role._id
  }).exec();
  
  await sendbirdRequests.createUser({
    user_id: role._id,
    nickname: profile.firstName,
    profile_url:
      profile.avatar ||
      "https://sendbird.com/main/img/profiles/profile_05_512px.png",
    issue_access_token: true,
  });

  UserModel.findByIdAndUpdate(userId, {
    $addToSet: { rolesId: { $each: [role._id] } },
  }).exec();

  return {
    role,
    profile,
  };
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
