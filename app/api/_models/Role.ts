import mongoose, { Types } from "mongoose";

export interface IRole {
  _id: Types.ObjectId;
  profileId: Types.ObjectId;
  ownerId: Types.ObjectId;
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
