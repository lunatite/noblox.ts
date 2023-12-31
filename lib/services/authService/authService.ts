import axios from "axios";
import { RobloxSession } from "../../robloxSession";

export class AuthService {
  private static readonly _xsrfTokenRegex = /data-token="(.+)"/;

  constructor(private readonly _session: RobloxSession) {}

  private static parseXsrfTokenFromHtml(html: string) {
    const result = AuthService._xsrfTokenRegex.exec(html);

    if (result === null) {
      throw new Error("Failed to scrape X-CSRF-TOKEN from html.");
    }

    return result[1];
  }

  public async getXsrfToken() {
    const request = await this._session.request<string>(
      "https://www.roblox.com/home",
      "GET",
    );

    return AuthService.parseXsrfTokenFromHtml(request.data);
  }

  public static async getXsrfToken() {
    const request = await axios.get("https://www.roblox.com/");
    return this.parseXsrfTokenFromHtml(request.data);
  }
}
