import create, { SetState } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { ExternalWebsiteItem } from '@/types';

export interface WebsitesDataState {
  data: ExternalWebsiteItem[];
  add: (websiteItem: ExternalWebsiteItem) => void;
  remove: (id: string) => void;
  update: (id: string, websiteItem: Partial<ExternalWebsiteItem>) => void;
  toggleHidden: (id: string) => void;
  show: (id: string) => void;
  hide: (id: string) => void;
  hideAll: () => void;
}

const useWebsitesDataStore = create<WebsitesDataState>(
  // Allowing tracking store with redux devtools
  devtools(
    (set: SetState<WebsitesDataState>) => ({
      // initial state
      data: [],

      // methods for manipulating state
      add: (websiteItem: ExternalWebsiteItem) =>
        set((state) => ({ data: [...state.data, websiteItem] })),
      remove: (id: string) =>
        set((state) => ({ data: state.data.filter((item) => item.id !== id) })),
      update: (id: string, websiteItem: Partial<ExternalWebsiteItem>) =>
        set((state) => ({
          data: state.data.map((item) =>
            item.id === id
              ? {
                ...item,
                ...websiteItem,
              }
              : item
          ),
        })),
      toggleHidden: (id: string) =>
        set((state) => ({
          data: state.data.map((item) =>
            item.id === id
              ? {
                ...item,
                hidden: !(item.hidden ?? false),
              }
              : item
          ),
        })),
      show: (id: string) =>
        set((state) => ({
          data: state.data.map((item) => ({
            ...item,
            hidden: item.id !== id,
          })),
        })),
      hide: (id: string) =>
        set((state) => ({
          data: state.data.map((item) => ({
            ...item,
            hidden: item.id === id,
          })),
        })),
      hideAll: () =>
        set((state) => ({
          data: state.data.map((item) => ({
            ...item,
            hidden: true,
          })),
        })),
    }),
    // Unique identifier on devtools
    { name: 'ExternalWebsites' }
  )
);

export default useWebsitesDataStore;
