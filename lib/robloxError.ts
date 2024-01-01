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

  constructor(error: AxiosError) {
    super(getErrorMessage(error));

    this.url = error.response?.config.url;
    this.statusCode = error.response?.status;
    this.name = "RobloxError";
  }
}
