import mongoose from "mongoose";

export type ProfileVisibility = {
  profileId: string;
  lastName: string;
  email: string;
  about: string;
  pronouns: string;
  website: string;
}

export const ProfileVisibilitySchema = new mongoose.Schema<ProfileVisibility>({
  profileId: { type: String, required: true },
  lastName:{ type: String, required: true },
  email:{ type: String, required: true },
  about:{ type: String, required: true },
  pronouns:{ type: String, required: true },
  website:{ type: String, required: true },
});

export default mongoose.models.ProfileVisibility ||
mongoose.model<ProfileVisibility>("ProfileVisibility", ProfileVisibilitySchema);
