import { Types } from "mongoose";
import ProfileModel, { IProfile } from "@/app/api/_models/Profile";
import { generateFindOneQuery } from "@/app/api/_services/utils";
import ProfileVisibilityModel from "@/app/api/_models/ProfileVisibility";

export interface ProfileProps extends Omit<IProfile, "_id"> {
  _id: string | Types.ObjectId;
}
type ProfileQueryProps = Partial<ProfileProps> | string | Types.ObjectId;
export const getProfile = generateFindOneQuery<
  typeof ProfileModel,
  ProfileQueryProps
>(ProfileModel);

export const getProfileVisibility = generateFindOneQuery<
  typeof ProfileVisibilityModel,
  {
    profileId: string;
  }
>(ProfileVisibilityModel);

/**
 * Deletes a profile by its ID.
 *
 * @method
 * @async
 * @param {Types.ObjectId} profileId - The ID of the profile to delete.
 * @returns {Promise<void>} - A promise that resolves when the profile is deleted.
 */
export const deleteProfile = async (profileId: Types.ObjectId) => {
  // TODO: DELETE VISIBILITY
  ProfileModel.findByIdAndDelete(profileId).exec();
};
