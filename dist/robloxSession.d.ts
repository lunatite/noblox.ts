import { AxiosProxyConfig, AxiosRequestConfig, Method } from "axios";
import { UsersService, AuthService, CatalogService, AssetDeliveryService, GroupsService, AssetService, ThumbnailsService } from "./services";
import { SessionUser } from "./entities";
export declare class RobloxSession {
    private readonly _cookie;
    private readonly _axios;
    private readonly _proxy;
    private _user;
    readonly services: {
        auth: AuthService;
        user: UsersService;
        catalog: CatalogService;
        thumbnails: ThumbnailsService;
        assetDelivery: AssetDeliveryService;
        asset: AssetService;
        groups: GroupsService;
    };
    constructor(cookie: string, proxy?: AxiosProxyConfig);
    get cookie(): string;
    get user(): SessionUser | undefined;
    request<T>(url: string, method: Method, config?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<T, any>>;
    login(): Promise<this>;
}
