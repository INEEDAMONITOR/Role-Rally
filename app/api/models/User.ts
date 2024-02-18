import mongoose, { mongo } from "mongoose";
import { Types } from "mongoose";

export interface IUser extends mongoose.Document{
  name: string;
  email: string;
  profileId: Types.ObjectId,
  rolesId: Types.ObjectId[],
}

const UserSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profileId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Profile" },
  rolesId: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    validate: {
      validator: function(v: Types.ObjectId[]) {
        return Array.isArray(v) && v.length > 0; // Ensure that 'roles' is an array and has at least one element
      },
      message: "There must be at least one role."
    },
    ref: "Role"
  }, 
});

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);