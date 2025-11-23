import { Album } from "@/domain/album";
import searchAlbums from "@/services/search-albums";
import { create } from "zustand";

interface HomeStore {
  loading: boolean;
  albums: Album[];
  query: string;
  setQuery: (query: string) => void;
  searchAlbums: (query: string) => void;
  cfg?: Record<string, any>;
}

export const useHomeStore = create<HomeStore>((set) => ({
  loading: false,
  albums: [],
  query: "",
  cfg: undefined,
  setQuery: (query: string) => set({ query }),
  searchAlbums: async (query: string) => {
    if (!query) {
      return;
    }
    set({ loading: true });
    const albums = await searchAlbums(query);
    set({albums})
    set({ loading: false });
  },
}));
