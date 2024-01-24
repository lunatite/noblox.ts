import { AxiosProxyConfig, AxiosRequestConfig, Method } from "axios";
import { UsersService, AuthService, CatalogService, AssetDeliveryService, GroupsService, AssetService, ThumbnailsService } from "./services";
import { SessionUser } from "./entities";
export declare class RobloxSession {
    private _cookie;
    private _user;
    private _proxy;
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
