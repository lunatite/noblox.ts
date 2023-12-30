import axios, { AxiosRequestConfig, Method } from "axios";
import { AuthUser } from "./entities/users/authUser";
import { UserService } from "./services/usersService/usersService";
import { AuthService } from "./services/authService/authService";
import { CatalogService } from "./services/catalogService/catalogService";
import { AssetDeliveryService } from "./services/assetDeliveryService/assetDeliverySerivce";
import { GroupsService } from "./services/groupsService/groupsSerivce";

export class RobloxSession {
  private _cookie: string;
  private _authUser: AuthUser | undefined;

  // i'm doing this cause i don't know how to do it automatically.
  public readonly auth = new AuthService(this);
  public readonly user = new UserService(this);
  public readonly catalog = new CatalogService(this);
  public readonly assetDelivery = new AssetDeliveryService();
  public readonly groups = new GroupsService(this);

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

  public get authUser() {
    return this._authUser;
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
      headers["X-CSRF-TOKEN"] = await this.auth.getXsrfToken();
    }

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
  }

  public async login() {
    this._authUser = await this.user.getAuthUser();
    return this;
  }
}
