import { RobloxSession } from "../../robloxSession";

export class AuthService {
  private static readonly _xsrfTokenRegex = /data-token="(.+)"/;

  constructor(private readonly _session: RobloxSession) {}

  public async getXsrfToken() {
    const request = await this._session.request<string>(
      "https://www.roblox.com/home",
      "GET",
    );

    const result = AuthService._xsrfTokenRegex.exec(request.data);

    if (result === null) {
      throw new Error("Failed to scrape X-CSRF-TOKEN from page.");
    }

    return result[1];
  }
}
