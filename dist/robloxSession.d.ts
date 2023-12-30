import { AxiosRequestConfig, Method } from "axios";
import { AuthUser } from "./entities/users/authUser";
import { UserService } from "./services/usersService/usersService";
import { AuthService } from "./services/authService/authService";
import { CatalogService } from "./services/catalogService/catalogService";
import { AssetDeliveryService } from "./services/assetDeliveryService/assetDeliverySerivce";
import { GroupsService } from "./services/groupsService/groupsSerivce";
export declare class RobloxSession {
    private _cookie;
    private _authUser;
    readonly auth: AuthService;
    readonly user: UserService;
    readonly catalog: CatalogService;
    readonly assetDelivery: AssetDeliveryService;
    readonly groups: GroupsService;
    constructor(cookie: string);
    get cookie(): string;
    get authUser(): AuthUser | undefined;
    request<T>(url: string, method: Method, config?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<T, any>>;
    login(): Promise<this>;
}
