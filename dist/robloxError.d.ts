import { AxiosError } from "axios";
export declare class RobloxError extends Error {
    readonly url?: string;
    readonly statusCode?: number;
    constructor(error: AxiosError);
}
