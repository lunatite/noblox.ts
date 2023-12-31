import { AxiosRequestConfig, Method } from "axios";
import { AuthUser } from "./entities/users/authUser";
import { UsersService, AuthService, CatalogService, AssetDeliveryService, GroupsService } from "./services";
export declare class RobloxSession {
    private _cookie;
    private _user;
    readonly services: {
        auth: AuthService;
        user: UsersService;
        catalog: CatalogService;
        assetDelivery: AssetDeliveryService;
        groups: GroupsService;
    };
    constructor(cookie: string);
    get cookie(): string;
    get user(): AuthUser | undefined;
    request<T>(url: string, method: Method, config?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<T, any>>;
    login(): Promise<this>;
}
