import { Song } from "@/domain/song";
import fetchAlbumSongs from "@/services/fetch-album-songs";
import { create } from "zustand";

interface AlbumStore {
  loading: boolean;
  songs: Song[];
  browseId: string;
  fetchSongs: (browseId: string) => void;
}

export const useAlbumStore = create<AlbumStore>((set) => ({
  loading: false,
  songs: [],
  browseId: "",
  setSongs: (songs: Song[]) => {
    set({ songs });
  },
  fetchSongs: async (browseId: string) => {
    if (!browseId) {
      return;
    }
    set({ loading: true });
    const songs = await fetchAlbumSongs(browseId);
    set({ songs });
    set({ loading: false });
  },
}));
