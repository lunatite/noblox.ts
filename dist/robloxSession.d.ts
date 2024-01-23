import { AxiosProxyConfig, AxiosRequestConfig, Method } from "axios";
import { AuthUser } from "./entities/users/authUser";
import { UsersService, AuthService, CatalogService, AssetDeliveryService, GroupsService, AssetService } from "./services";
export declare class RobloxSession {
    private _cookie;
    private _user;
    private _proxy;
    readonly services: {
        auth: AuthService;
        user: UsersService;
        catalog: CatalogService;
        assetDelivery: AssetDeliveryService;
        asset: AssetService;
        groups: GroupsService;
    };
    constructor(cookie: string, proxy?: AxiosProxyConfig);
    get cookie(): string;
    get user(): AuthUser | undefined;
    request<T>(url: string, method: Method, config?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<T, any>>;
    login(): Promise<this>;
}
