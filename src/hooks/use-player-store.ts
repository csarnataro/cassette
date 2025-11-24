import { PlayableSong } from "@/domain/playable-song";
import callPlayer from "@/services/call-player";
import { create } from "zustand";

interface PlayerStore {
  loading: boolean;
  currentSong?: PlayableSong;
  currentSongIndex: number;
  videoId: string;
  callPlayer: (videoId: string, playlistId: string) => void;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  loading: false,
  currentSong: undefined,
  currentSongIndex: -1,
  videoId: "",
  callPlayer: async (videoId: string, playlistId: string) => {
    if (!videoId) {
      return;
    }
    set({ loading: true });
    const currentSong = await callPlayer(videoId, playlistId);
    set({ currentSong });
    set({ currentSongIndex: 0 });
    set({ loading: false });
  },
}));
