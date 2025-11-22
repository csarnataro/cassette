type ThumbnailURL = {
  url: string;
}

export interface Album {
  browseId: string; // the id of the playlist/album
  title: string;
  year: string;
  info: string;
  thumbnailUrl?: ThumbnailURL;
  author?: string;
}
