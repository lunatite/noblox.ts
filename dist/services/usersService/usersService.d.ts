import { AuthUser } from "../../entities/users/authUser";
import { User } from "../../entities/users/user";
import { RobloxSession } from "../../robloxSession";
export declare class UsersService {
    private readonly _session;
    static readonly baseUrl = "https://users.roblox.com/v1";
    constructor(_session: RobloxSession);
    getAuthUser(): Promise<AuthUser>;
    getRobuxBalance(): Promise<number>;
    static getUserById(userId: number): Promise<User>;
}
