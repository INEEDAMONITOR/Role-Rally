import { Types } from "mongoose";
import UserModel, { IUser } from "@/app/api/_models/User";
import { warn } from "console";
import bcrypt from "bcrypt";
import { generateFindOneQuery } from "@/app/api/_services/utils";
import { createRole, deleteRole } from "@/app/api/_services/role";
import { createProfile, deleteProfile } from "@/app/api/_services/profile";
import RoleModel from "@/app/api/_models/Role";
import { sendbirdRequests } from "@/app/_lib/sendbird";

interface CreateUserProp {
  name: string;
  email: string;
  password: string;
}
interface UserProps extends Omit<IUser, "_id" | "profileId" | "rolesId"> {
  _id: string | Types.ObjectId;
  profileId: string | Types.ObjectId;
  rolesId: string[] | Types.ObjectId[];
}

/**
 * Validates the user by checking if the provided email and password match the stored user credentials.
 * @param email - The email of the user.
 * @param password - The password of the user.
 * @returns A boolean indicating whether the user is valid or not.
 */
export const validateUser = async (email: string, password: string) => {
  try {
    const user = await getUser({ email }, ["email", "password"]);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return false;
    }

    return await user.toObject();
  } catch (e) {
    return null;
  }
};

type UserQueryProps = Partial<UserProps> | string | Types.ObjectId;
/**
 * Retrieves a user based on the provided props and optional selector.
 * @param props - The properties used to identify the user.
 * @param selector - Optional selector to specify the fields to include or exclude in the user object.
 * @returns A promise that resolves to the user object if found, or null if not found or an error occurred.
 */
export const getUser = generateFindOneQuery<typeof UserModel, UserQueryProps>(
  UserModel
);

export const deleteUser = async (userId: Types.ObjectId) => {
  try {
    const user = (await UserModel.findById(userId).exec()) as IUser;
    if (user) {
      for (const role of user.rolesId) {
        deleteRole(role._id);
      }
      deleteProfile(user.profileId);
      await UserModel.findByIdAndDelete(user._id);
    }
  } catch (error) {
    // Handle the error, log it, or rethrow
    console.error(error);
    throw error; // or any other error handling mechanism
  }
};

export const createUser = async (user: CreateUserProp) => {
  let newRole = null;
  let newProfile = null;
  try {
    newRole = await createRole();
    newProfile = await createProfile();

    const newUser = await UserModel.create({
      name: user.name,
      email: user.email,
      password: user.password,
      profileId: newProfile._id,
      profile: newProfile,
      rolesId: [newRole._id],
    });

    await RoleModel.findByIdAndUpdate(newRole._id, {
      ownerId: newUser._id,
    }).exec();

    // await sendbirdRequests.createUser({
    //   user_id: newRole._id,
    //   nickname: newProfile.displayName,
    //   profile_url: "https://sendbird.com/main/img/profiles/profile_05_512px.png",
    //   issue_access_token: true,
    // });
    return newUser;
  } catch (error) {
    if (newRole) {
      deleteRole(newRole._id);
    }
    if (newProfile) {
      deleteProfile(newProfile._id);
    }
    warn(error);
  }
};
