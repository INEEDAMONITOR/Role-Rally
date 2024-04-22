import { Types } from "mongoose";
import RoleModel, { IRole } from "@/app/api/_models/Role";
import ProfileModel, { IProfile } from "@/app/api/_models/Profile";
import {
  Selector,
  generateFindOneQuery,
  generateFindQuery,
} from "@/app/api/_services/utils";
import { deleteProfile, getProfile } from "@/app/api/_services/profile";
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

type ProfilePayload = Partial<
  Pick<
    Profile,
    "lastName" | "phone" | "about" | "avatar" | "pronouns" | "website" | "ownerRoleId"
  >
> &
  Pick<Profile, "firstName" | "email" | "username">;

/**
 * Creates a role with the given user ID and profile payload.
 *
 * @method
 * @async
 * @param userId - The ID of the user.
 * @param profilePayload - The payload containing profile information.
 * @returns An object containing the created role and profile.
 * @throws An error if the profile payload is invalid.
 */
export const createRole = async (
  userId: string | Types.ObjectId,
  profilePayload: ProfilePayload
) => {
  const { firstName, email, username } = profilePayload;

  if (!firstName || !email || !username) {
    throw new Error("profile payload error");
  }
  // TODO: validate profilePayload, like username duplicates
  await dbConnect();

  const profile: IProfile = await ProfileModel.create(profilePayload);

  const role: IRole = await RoleModel.create<IRole>({
    profileId: profile._id,
    ownerId: userId,
    friends: [],
    chatRooms: [],
  });

  await ProfileModel.findByIdAndUpdate(profile._id, {
    ownerRoleId: role._id,
  }).exec();

  await sendbirdRequests.createUser({
    user_id: role._id.toString(),
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

/**
 * Retrieves a role with its associated profile.
 *
 * @method
 * @async
 * @param props - The query props for retrieving the role.
 * @param selector - The selector for retrieving the role.
 * @returns A Promise that resolves to the role object with its associated profile, or an empty object if an error occurs.
 */
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

/**
 * Retrieves roles with associated profiles.
 *
 * @method
 * @async
 * @param props - The query props.
 * @param selector - The selector.
 * @returns A promise that resolves to an array of roles with associated profiles.
 */
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

/**
 * Deletes a role and its associated profile.
 *
 * @method
 * @async
 * @param roleId - The ID of the role to be deleted.
 * @returns A Promise that resolves when the role and profile are successfully deleted.
 */
export const deleteRole = async (roleId: Types.ObjectId | string) => {
  const role = await getRole(roleId, "-_id profileId");
  await deleteProfile(role.profileId);
  RoleModel.findByIdAndDelete(roleId).exec();
  
  await sendbirdRequests.deleteUser(roleId.toString());
};
