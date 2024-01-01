import axios, { AxiosRequestConfig, Method } from "axios";
import { AuthUser } from "./entities/users/authUser";
import {
  UsersService,
  AuthService,
  CatalogService,
  AssetDeliveryService,
  GroupsService,
  AssetService,
} from "./services";
import { RobloxError } from "./robloxError";

axios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(new RobloxError(error)),
);

export class RobloxSession {
  private _cookie: string;
  private _user: AuthUser | undefined;

  public readonly services = {
    auth: new AuthService(this),
    user: new UsersService(this),
    catalog: new CatalogService(this),
    assetDelivery: new AssetDeliveryService(),
    asset: new AssetService(this),
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
    this._user = await this.services.user.getAuthUser();
    return this;
  }
}
