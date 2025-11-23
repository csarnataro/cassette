import { Album } from "@/domain/album";
import fetchAlbums from "./fetch-albums";

const searchAlbums = async (query: string): Promise<Album[]> => {
  // const cfg = await fetchYoutubeConfigs();

  return fetchAlbums(query); // , cfg);
};

export default searchAlbums;
