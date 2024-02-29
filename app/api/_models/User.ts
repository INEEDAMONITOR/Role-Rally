import mongoose, { mongo } from "mongoose";
import { Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  profileId: Types.ObjectId;
  rolesId: Types.ObjectId[];
}

const UserSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Profile",
  },
  rolesId: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: "Role",
  },
});

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
