import axios, {
  Axios,
  AxiosProxyConfig,
  AxiosRequestConfig,
  Method,
} from "axios";
import {
  UsersService,
  AuthService,
  CatalogService,
  AssetDeliveryService,
  GroupsService,
  AssetService,
  ThumbnailsService,
} from "./services";
import { RobloxError } from "./robloxError";
import { SessionUser } from "./entities";

axios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(new RobloxError(error)),
);

export class RobloxSession {
  private readonly _cookie: string;
  private readonly _axios: Axios;
  private readonly _proxy: AxiosProxyConfig | undefined;
  private _user: SessionUser | undefined;

  public readonly services = {
    auth: new AuthService(this),
    user: new UsersService(this),
    catalog: new CatalogService(),
    thumbnails: new ThumbnailsService(),
    assetDelivery: new AssetDeliveryService(),
    asset: new AssetService(this),
    groups: new GroupsService(this),
  };

  constructor(cookie: string, proxy?: AxiosProxyConfig) {
    if (!cookie.toLowerCase().includes("warning:-")) {
      throw new RobloxError(
        Error(
          "Warning : No Roblox warning detected in provided cookie. Ensure you include the entire .ROBLOSECURITY.",
        ),
      );
    }
    if (cookie.length === 0) {
      throw new RobloxError(Error("Cookie cannot be an empty string."));
    }

    this._cookie = cookie;
    this._proxy = proxy;

    this._axios = axios.create({
      timeout: 5000,
      proxy,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0",
        Cookie: `.ROBLOSECURITY=${this._cookie}`,
      },
    });

    this._axios.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(new RobloxError(error)),
    );
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
    const headers: Record<string, string> = {};

    if (method !== "GET") {
      headers["X-CSRF-TOKEN"] = await this.services.auth.getXsrfToken();
    }

    const request = await this._axios.request<T>({
      ...config,
      url,
      method,
      headers: {
        ...config?.headers,
        ...headers,
      },
      proxy: this._proxy,
    });

    return request;
  }

  public async login() {
    const authUser = await this.services.user.getAuthUser();
    const avatarHeadshotUrl =
      await this.services.thumbnails.getUserAvatarHeadshot(authUser.id);

    this._user = { ...authUser, profilePicture: avatarHeadshotUrl };

    return this;
  }
}
