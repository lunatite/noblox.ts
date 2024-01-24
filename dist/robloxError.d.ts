export declare class RobloxError extends Error {
    readonly url?: string;
    readonly statusCode?: number;
    readonly errorResponse?: unknown;
    constructor(error: Error);
}
