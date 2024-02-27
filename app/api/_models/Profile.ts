import mongoose from "mongoose";

interface Phone {
  number: string; // xxxx
  type?: string; // 001
}

interface Email {
  address: string; // exmpa@com
  type?: string; // work, personal, etc.
}
export interface IProfile extends mongoose.Document {
  displayName: string;
  email: [Email];
  phone: [Phone];
  avatar: string;
  about: string;
  pronouns: string;
}

const EmailSchema = new mongoose.Schema<Email>({
  address: { type: String, required: true },
  type: { type: String, required: false },
});

const PhoneSchema = new mongoose.Schema<Phone>({
  number: { type: String, required: true },
  type: { type: String, required: false },
});

export const ProfileSchema = new mongoose.Schema<IProfile>({
  displayName: { type: String, required: true },
  email: { type: [EmailSchema], required: true },
  phone: { type: [PhoneSchema], required: true },
  avatar: String,
  about: String,
  pronouns: String,
});

export default mongoose.models.Profile ||
  mongoose.model<IProfile>("Profile", ProfileSchema);
