import { Types } from "mongoose";
import UserModel, { IUser } from "@/app/api/_models/User";
import { warn } from "console";
import { createRole, deleteRole } from "./role";
import { createProfile, deleteProfile } from "./profile";

interface CreateUserProp {
  name: string;
  email: string;
  password: string;
}
export const validateUser = async (email: string, password: string) => {
  // TODO: Add the logic to validate the user
  // bcrypt.compareSync(password1, password2);
};

export const getUser = async (userId: Types.ObjectId) => {
  // TODO: Add the logic to get the user by the user id
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

// Return the JSW token if success
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
    // TODO: Return the JWT token
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
