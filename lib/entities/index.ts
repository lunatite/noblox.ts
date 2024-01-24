import { AuthUser } from "./users/authUser";

export * from "./assets";
export * from "./catalog";
export * from "./groups";
export * from "./thumbnails/usersAvatarHeadshotResponse";
export { AuthUser } from "./users/authUser";

export interface SessionUser extends AuthUser {
  profilePicture: string;
}
