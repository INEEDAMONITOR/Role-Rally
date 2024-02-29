import mongoose, { Types } from "mongoose";

export type Accessibility = "public" | "private" | "protected";

export interface IRole {
  profileId: Types.ObjectId;
  ownerId: Types.ObjectId;
  accessibility: Accessibility;
  friends: Types.ObjectId[];
  chatRooms: Types.ObjectId[];
}

const RoleSchema = new mongoose.Schema<IRole>({
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Profile",
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  accessibility: {
    type: String,
    required: true,
    enum: ["public", "private", "protected"],
  },
  friends: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    minlength: 0,
  },
  chatRooms: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    minlength: 0,
  },
});

export default mongoose.models.Role ||
  mongoose.model<IRole>("Role", RoleSchema);
