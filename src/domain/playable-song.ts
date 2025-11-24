import { Song } from "./song";
export interface PlayableSong extends Song {
  playerUrl: string;
}
