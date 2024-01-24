import { AxiosError } from "axios";

function getErrorMessage(error: AxiosError) {
  if (!error.response) {
    return "";
  }

  const errorRespData: any = error.response.data;

  if (errorRespData.errors) {
    return JSON.stringify(errorRespData.errors);
  }

  return errorRespData.message;
}

export class RobloxError extends Error {
  public readonly url?: string;
  public readonly statusCode?: number;
  public readonly errorResponse?: unknown;

  constructor(error: Error) {
    super(error.message);

    if (error instanceof AxiosError) {
      this.url = error.response?.config.url;
      this.statusCode = error.response?.status;
      this.errorResponse = getErrorMessage(error);
    }

    this.name = "RobloxError";
  }
}
