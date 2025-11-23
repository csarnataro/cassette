type ThumbnailURL = {
  url: string;
  height: number;
  width: number;
}

export interface Album {
  browseId: string; // the id of the playlist/album
  title: string;
  year: string;
  info: string;
  thumbnailUrl?: ThumbnailURL;
  author?: string;
}
