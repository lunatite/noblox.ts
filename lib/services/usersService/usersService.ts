import axios from "axios";
import { AuthUser } from "../../entities/users/authUser";
import { GetUserResponse } from "../../entities/users/getUserResponse";
import { RobloxSession } from "../../robloxSession";
import { MultiGetUserByNameArrayResponse } from "../../entities/users/multiGetUserByNameResponse";

export class UsersService {
  public static readonly baseUrl = "https://users.roblox.com/v1";

  constructor(private readonly _session: RobloxSession) {}

  public async getAuthUser(): Promise<AuthUser> {
    const response = await this._session.request<AuthUser>(
      `${UsersService.baseUrl}/users/authenticated`,
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

  public static async getUserById(userId: number) {
    const response = await axios.get<GetUserResponse>(
      `${UsersService.baseUrl}/users/${userId}`,
    );
    return response.data;
  }

  public static async getUsersByUsernames(
    usernames: string[],
    excludeBannedUsers = false,
  ) {
    const response = await axios.post<MultiGetUserByNameArrayResponse>(
      `${UsersService.baseUrl}/usernames/users`,
      { usernames, excludeBannedUsers },
    );

    return response.data;
  }

  public static async getUserByUsername(username : string , returnNullIfBanned = true) {
    const users = await this.getUsersByUsernames([username] , returnNullIfBanned);

    return users.data.length !== 0 ? users.data[0] : null;
  }
}
