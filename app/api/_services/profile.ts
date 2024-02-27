import { Types } from "mongoose";
import ProfileModel from "@/app/api/_models/Profile";
import { warn } from "console";
import { get } from "http";

export const createProfile = async () => {
  try {
    const newProfile = await ProfileModel.create({
      displayName: "Default Role",
      email: [],
      phone: [],
      avatar: "",
      about: "",
      pronouns: "",
    });
    return newProfile;
  } catch (error) {
    warn(error);
  }
};
export const getProfile = async (profileId: Types.ObjectId) => {};

export const deleteProfile = async (profileId: Types.ObjectId) => {
  ProfileModel.findByIdAndDelete(profileId).exec();
};
