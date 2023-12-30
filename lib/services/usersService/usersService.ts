import { AuthUser } from "../../entities/users/authUser";
import { RobloxSession } from "../../robloxSession";

export class UserService {
  public static readonly baseUrl = "https://users.roblox.com/v1/";

  constructor(private readonly _session: RobloxSession) {}

  public async getAuthUser(): Promise<AuthUser> {
    const response = await this._session.request<AuthUser>(
      `${UserService.baseUrl}/users/authenticated`,
      "GET",
    );

    return response.data;
  }

  public async getRobuxBalance(): Promise<number> {
    const response = await this._session.request<{ robux: number }>(
      "https://economy.roblox.com/v1/user/currency",
      "GET",
    );
    return response.data.robux;
  }
}
