import mongoose from "mongoose";

export const ProfileVisibilitySchema = new mongoose.Schema({
  profileId: { type: String, required: true },
  avatar: { type: String, required: true },
  lastName:{ type: String, required: true },
  email:{ type: String, required: true },
  about:{ type: String, required: true },
  pronouns:{ type: String, required: true },
  website:{ type: String, required: true },
});

export default mongoose.models.ProfileVisibility ||
mongoose.model("ProfileVisibility", ProfileVisibilitySchema);
