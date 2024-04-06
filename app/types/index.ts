import { Types } from "mongoose";
import { IProfile } from "../api/_models/Profile";
import { IRole } from "../api/_models/Role";
import { IUser } from "../api/_models/User";

export interface Role
  extends Omit<
    IRole,
    "_id" | "ownerId" | "friends" | "chatRooms" | "profileId"
  > {
  _id: string;
  profileId: string;
  profile: Profile;
  ownerId: string;
  friends: string[];
  chatRooms: string[];
}

export interface Profile extends Omit<IProfile, "_id"> {
  _id: string;
}

export interface User extends Omit<IUser, "_id"  | "rolesId"> {
  _id: string;
  rolesId: string[];
}
