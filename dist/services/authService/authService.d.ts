import { RobloxSession } from "../../robloxSession";
export declare class AuthService {
    private readonly _session;
    private static readonly _xsrfTokenRegex;
    constructor(_session: RobloxSession);
    getXsrfToken(): Promise<string>;
}
