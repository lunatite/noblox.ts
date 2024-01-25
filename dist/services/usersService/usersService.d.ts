import { AuthUser } from "../../entities/users/authUser";
import { GetUserResponse } from "../../entities/users/getUserResponse";
import { RobloxSession } from "../../robloxSession";
import { MultiGetUserByNameArrayResponse } from "../../entities/users/multiGetUserByNameResponse";
export declare class UsersService {
    private readonly _session;
    static readonly baseUrl = "https://users.roblox.com/v1";
    constructor(_session: RobloxSession);
    getAuthUser(): Promise<AuthUser>;
    getRobuxBalance(): Promise<number>;
    static getUserById(userId: number): Promise<GetUserResponse>;
    static getUsersByUsernames(usernames: string[], excludeBannedUsers?: boolean): Promise<MultiGetUserByNameArrayResponse>;
    static getUserByUsername(username: string, returnNullIfBanned?: boolean): Promise<import("../../entities/users/multiGetUserByNameResponse").MultiGetByNameResponse | null>;
}
