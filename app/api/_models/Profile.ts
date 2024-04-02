import mongoose, { Types } from "mongoose";

interface Phone {
  number: string; // xxxx
  type: string; // 001
}

export interface IProfile {
  _id: string;
  ownerRoleId: Types.ObjectId;
  displayName: string;
  email: string;
  phone: Phone;
  avatar: string;
  about: string;
  pronouns: string;
  username: string;
}

const PhoneSchema = new mongoose.Schema<Phone>({
  number: { type: String, required: true },
  type: { type: String, required: true },
});

export const ProfileSchema = new mongoose.Schema<IProfile>({
  displayName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: PhoneSchema, required: true },
  ownerRoleId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  avatar: String,
  about: String,
  pronouns: String,
  username: String,
});

export default mongoose.models.Profile ||
  mongoose.model<IProfile>("Profile", ProfileSchema);
