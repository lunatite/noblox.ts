import { AuthUser } from "./authUser";
export interface SessionUser extends AuthUser {
    profilePicture: string;
}
