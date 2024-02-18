import { Types } from "mongoose";
import UserModel, { IUser } from "@/app/api/models/User";
import { warn } from "console";
import { createRole, deleteRole } from "./roleController";
import { createProfile, deleteProfile } from "./profileController";

interface CreateUserProp {
  name: string;
  email: string;
}


export const deleteUser = async (userId: Types.ObjectId) => {
  try {
    const user = await UserModel.findById(userId).exec() as IUser;
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
    
    const newUser = await UserModel.create(
      {
        name: user.name,
        email: user.email,
        profileId: newProfile._id,
        profile: newProfile,
        rolesId: [newRole._id],
      }
    ); 
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