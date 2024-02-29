import { Types } from "mongoose";
import ProfileModel from "@/app/api/_models/Profile";
import { warn } from "console";

export const createProfile = async () => {
  try {
    return await ProfileModel.create({
      displayName: "New Role",
      email: [],
      phone: [],
      avatar: "",
      about: "",
      pronouns: "",
    });
  } catch (error) {
    warn(error);
  }
};
export const getProfile = async (profileId: Types.ObjectId) => {};

export const deleteProfile = async (profileId: Types.ObjectId) => {
  ProfileModel.findByIdAndDelete(profileId).exec();
};
