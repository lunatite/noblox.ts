import { AxiosRequestConfig, Method } from "axios";
import { HttpsProxyAgent } from "https-proxy-agent";
import { UsersService, AuthService, CatalogService, AssetDeliveryService, GroupsService, AssetService, ThumbnailsService, GamepassService } from "./services";
import { SessionUser } from "./entities";
export declare class RobloxSession {
    private readonly _cookie;
    private readonly _axios;
    private readonly _httpAgent?;
    private _user;
    readonly services: {
        auth: AuthService;
        user: UsersService;
        catalog: CatalogService;
        thumbnails: ThumbnailsService;
        assetDelivery: AssetDeliveryService;
        asset: AssetService;
        groups: GroupsService;
        gamepass: GamepassService;
    };
    constructor(cookie: string, httpsAgent?: typeof HttpsProxyAgent);
    get cookie(): string;
    get user(): SessionUser | undefined;
    request<T>(url: string, method: Method, config?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<T, any>>;
    login(): Promise<this>;
}
