import { Album } from '@/domain/album';
import { create } from 'zustand';

interface HomeStore {
  loading: boolean;
  albums: Album[];
  query: string;
  setQuery: (query: string) => void;
  searchAlbum: (query: string) => void;
  
}

export const useHomeStore = create<HomeStore>((set) => ({
  loading: false,
  albums: [],
  query: '',
  setQuery: (query: string) => set({query}),
  searchAlbum: async (query: string) => {
    console.log('************ BEGIN: use-home-store 9 ************')
    console.log(query)
    console.log('************ END:   use-home-store 9 ************')
    if (!query) {
      return
    }
    set({loading: true});
    setTimeout(() => {
      set({albums: [
        {
          browseId: "1234",
          title: `${query} greatest hits`,
          year: "2001",
          info: `Album - ${query}`,
          thumbnailUrl: {
            url: 'https://img.youtube.com/vi/VtMZ-ALyL4A/1.jpg'
          }
        },
        {
          browseId: "1235",
          title: `${query} greatest hits`,
          year: "2001",
          info: `Album - ${query}`,
          thumbnailUrl: {
            url: 'https://img.youtube.com/vi/VtMZ-ALyL4A/1.jpg'
          }
        }

      ]})
      set({loading: false});
      // set({query: ''})
    }, 2000)
  }
}))