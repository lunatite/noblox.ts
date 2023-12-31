import axios, { AxiosError, AxiosRequestConfig, Method } from "axios";
import { AuthUser } from "./entities/users/authUser";
import { UserService } from "./services/usersService/usersService";
import { AuthService } from "./services/authService/authService";
import { CatalogService } from "./services/catalogService/catalogService";
import { AssetDeliveryService } from "./services/assetDeliveryService/assetDeliverySerivce";
import { GroupsService } from "./services/groupsService/groupsSerivce";
import { RobloxError } from "./robloxError";

export class RobloxSession {
  private _cookie: string;
  private _user: AuthUser | undefined;

  public readonly services = {
    auth: new AuthService(this),
    user: new UserService(this),
    catalog: new CatalogService(this),
    assetDelivery: new AssetDeliveryService(),
    groups: new GroupsService(this),
  };

  constructor(cookie: string) {
    if (!cookie.toLowerCase().includes("warning:-")) {
      throw new Error(
        "Warning : No Roblox warning detected in provided cookie. Ensure you include the entire .ROBLOSECURITY.",
      );
    }
    if (cookie.length === 0) {
      throw new Error("Cookie cannot be an empty string.");
    }

    this._cookie = cookie;
  }

  public get cookie() {
    return this._cookie;
  }

  public get user() {
    return this._user;
  }

  public async request<T>(
    url: string,
    method: Method,
    config?: AxiosRequestConfig,
  ) {
    const headers: Record<string, string> = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0",
      Cookie: `.ROBLOSECURITY=${this._cookie}`,
    };

    if (method !== "GET") {
      headers["X-CSRF-TOKEN"] = await this.services.auth.getXsrfToken();
    }

    try {
      const request = await axios<T>({
        ...config,
        url,
        method,
        headers: {
          ...config?.headers,
          ...headers,
        },
      });

      return request;
    } catch (e) {
      throw new RobloxError(e as AxiosError);
    }
  }

  public async login() {
    this._user = await this.services.user.getAuthUser();
    return this;
  }
}
