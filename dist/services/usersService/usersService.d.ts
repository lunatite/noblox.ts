import { AuthUser } from "../../entities/users/authUser";
import { RobloxSession } from "../../robloxSession";
export declare class UserService {
    private readonly _session;
    static readonly baseUrl = "https://users.roblox.com/v1/";
    constructor(_session: RobloxSession);
    getAuthUser(): Promise<AuthUser>;
    getRobuxBalance(): Promise<number>;
}
