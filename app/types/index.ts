import { Types } from "mongoose";
import { IProfile } from "../api/models/Profile";
import { IRole } from "../api/models/Role";
import { IUser } from "../api/models/User";


export interface Role extends IRole {
  profile: IProfile
}

export interface User extends IUser {
  profile: IProfile;
  roles: Role[];
}