import { Types } from "mongoose";
import ProfileModel, { IProfile } from "@/app/api/_models/Profile";
import { warn } from "console";
import { generateFindOneQuery } from "@/app/api/_services/utils";

export const createProfile = async () => {
  try {
    return await ProfileModel.create({
      displayName: "New Role",
      email: "",
      phone: "",
      avatar: "",
      about: "",
      pronouns: "",
      username: "",
    });
  } catch (error) {
    warn(error);
  }
};
export interface ProfileProps extends Omit<IProfile, "_id"> {
  _id: string | Types.ObjectId;
}
type ProfileQueryProps = Partial<ProfileProps> | string | Types.ObjectId;
export const getProfile = generateFindOneQuery<
  typeof ProfileModel,
  ProfileQueryProps
>(ProfileModel);

export const deleteProfile = async (profileId: Types.ObjectId) => {
  ProfileModel.findByIdAndDelete(profileId).exec();
};
