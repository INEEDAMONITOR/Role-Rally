import { Types } from "mongoose";
import UserModel, { IUser } from "@/app/api/_models/User";
import bcrypt from "bcrypt";
import { Selector, generateFindOneQuery } from "@/app/api/_services/utils";
import { deleteRole } from "@/app/api/_services/role";
import {
  deleteProfile,
  getProfile,
} from "@/app/api/_services/profile";

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

export type UserQueryProps = Partial<UserProps> | string | Types.ObjectId;
/**
 * Retrieves a user based on the provided props and optional selector.
 * @param props - The properties used to identify the user.
 * @param selector - Optional selector to specify the fields to include or exclude in the user object.
 * @returns A promise that resolves to the user object if found, or null if not found or an error occurred.
 */
export const getUser = generateFindOneQuery<typeof UserModel, UserQueryProps>(
  UserModel
);

export const getUserWithProfile = async (
  props: UserQueryProps,
  selector?: Selector
) => {
  let user = await getUser(props, selector);
  try {
    if (user) {
      const profile = await getProfile(user.profileId);
      user = { ...user.toObject(), profile };
    }
    return user;
  } catch (error) {
    console.error(error);
    return {};
  }
};

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
  try {
    const newUser = await UserModel.create({
      name: user.name,
      email: user.email,
      password: user.password,
    });
    
    return newUser;
  } catch (error) {
    console.error(error);
  }
};
