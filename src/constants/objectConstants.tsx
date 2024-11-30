import { CookieAttributes } from "js-cookie";
import { localDevelopment } from "./toggleConstants";

export const mediaTypes: Record<string, string> = {
  anime: "Anime",
  tv_series: "TV Series",
  video_games: "Video Game",
  movies: "Movie",
};

export const formTypes: Record<string, string> = {
  add: "Add",
  update: "Update",
};

export const cookieConfiguration = {
  name: localDevelopment ? "djangoAuth" : "__Host-djangoAuth",
  properties: localDevelopment
    ? undefined
    : ({
        secure: true,
        path: "/",
        sameSite: "Strict",
        expires: 1,
      } as CookieAttributes),
};
