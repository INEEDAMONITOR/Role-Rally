import { Types } from "mongoose";
import { IProfile } from "../api/_models/Profile";
import { IRole } from "../api/_models/Role";
import { IUser } from "../api/_models/User";


export interface Role extends IRole {
  profile: IProfile
}

export interface User extends IUser {
  profile: IProfile;
  roles: Role[];
}