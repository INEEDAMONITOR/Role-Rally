import { Types } from "mongoose";
import UserModel, { IUser } from "@/app/api/_models/User";
import bcrypt from "bcrypt";
import { generateFindOneQuery } from "@/app/api/_services/utils";
import { deleteRole } from "@/app/api/_services/role";

interface CreateUserProp {
  name: string;
  email: string;
  password: string;
}
interface UserProps extends Omit<IUser, "_id" | "rolesId"> {
  _id: string | Types.ObjectId;
  rolesId: string[] | Types.ObjectId[];
}

/**
 * Validates the user by checking if the provided email and password match the stored user credentials.
 *
 * @method
 * @async
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
 *
 * @method
 * @async
 * @param props - The properties used to identify the user.
 * @param selector - Optional selector to specify the fields to include or exclude in the user object.
 * @returns A promise that resolves to the user object if found, or null if not found or an error occurred.
 */
export const getUser = generateFindOneQuery<typeof UserModel, UserQueryProps>(
  UserModel
);

/**
 * Deletes a user by their ID.
 *
 * @method
 * @async
 * @param userId - The ID of the user to delete.
 */
export const deleteUser = async (userId: Types.ObjectId) => {
  try {
    const user = (await UserModel.findById(userId).exec()) as IUser;
    if (user) {
      for (const role of user.rolesId) {
        deleteRole(role._id);
      }
      await UserModel.findByIdAndDelete(user._id);
    }
  } catch (error) {
    // Handle the error, log it, or rethrow
    console.error(error);
    throw error; // or any other error handling mechanism
  }
};

/**
 * Creates a new user.
 *
 * @method
 * @async
 * @param user - The user object containing the user's name, email, and password.
 * @returns A promise that resolves to the created user object.
 */
export const createUser = async (user: CreateUserProp) => {
  try {
    return await UserModel.create({
      name: user.name,
      email: user.email,
      password: user.password,
    });
  } catch (error) {
    console.error(error);
  }
};
