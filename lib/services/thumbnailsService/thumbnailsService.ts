import axios from "axios";
import { UsersAvatarHeadshotResponse } from "../../entities/thumbnails/usersAvatarHeadshotResponse";

export class ThumbnailsService {
  public static readonly baseUrl = "https://thumbnails.roblox.com/v1/";

  public async getUserAvatarHeadshot(userId: number) {
    const resp = await axios.get<UsersAvatarHeadshotResponse>(
      ThumbnailsService.baseUrl +
        `/users/avatar-headshot?userIds=${userId}&size=420x420&format=Png&isCircular=false`,
    );

    return resp.data.data[0].imageUrl;
  }
}
