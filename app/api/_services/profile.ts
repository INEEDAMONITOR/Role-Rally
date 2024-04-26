import { Types } from "mongoose";
import ProfileModel, { IProfile } from "@/app/api/_models/Profile";
import { generateFindOneQuery } from "@/app/api/_services/utils";
import ProfileVisibilityModel, { ProfileVisibility } from "@/app/api/_models/ProfileVisibility";

export interface ProfileProps extends Omit<IProfile, "_id"> {
  _id: string | Types.ObjectId;
}
type ProfileQueryProps = Partial<ProfileProps> | string | Types.ObjectId;
export const getProfile = generateFindOneQuery<
  typeof ProfileModel,
  ProfileQueryProps
>(ProfileModel);

export const getProfileVisibility = async ({ profileId }: {profileId: string}) => {
  const res = (await ProfileVisibilityModel.findOne({ profileId }, { _v: 0, _id: 0, profileId: 0 }).exec()).toObject(); 
  
  if (!res) {
    return;
  }

  let selectors: {
    [k: string]: boolean,
  } = {};

  Object.keys(res).map(key => {
    if (res[key] === "0") {
      selectors[key] = false;
    }
  });
  
  return selectors;
};

/**
 * Deletes a profile by its ID.
 *
 * @method
 * @async
 * @param {Types.ObjectId} profileId - The ID of the profile to delete.
 * @returns {Promise<void>} - A promise that resolves when the profile is deleted.
 */
export const deleteProfile = async (profileId: Types.ObjectId) => {
  await ProfileVisibilityModel.findOneAndDelete({ profileId }).exec();
  await ProfileModel.findByIdAndDelete(profileId).exec();
};

export const createProfileVisibilty = async (profileId: string) => {
  await ProfileVisibilityModel.create({
    profileId,
    lastName: "1",
    email: "1",
    about: "1",
    pronouns: "1",
    website: "1",
  });
};

export const updateProfileVisibility = async (profileId: string, body: ProfileVisibility) => {
  await ProfileVisibilityModel.findOneAndUpdate({
    profileId
  }, 
  body,
  {
    new: true,
  });
};