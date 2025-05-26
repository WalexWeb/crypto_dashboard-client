import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { IThemeStore } from "../../types/IThemeStore.type";
import type { IFavoriteStore } from "../../types/IFavoriteStore.type";

export const useThemeStore = create<IThemeStore>()(
  persist(
    (set) => ({
      isDarkMode: true,
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useFavoritesStore = create<IFavoriteStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (id: string) => {
        set((state) => {
          const isFavorite = state.favorites.includes(id);
          return {
            favorites: isFavorite
              ? state.favorites.filter((favId) => favId !== id)
              : [...state.favorites, id],
          };
        });
      },
      isFavorite: (id: string) => {
        return get().favorites.includes(id);
      },
    }),
    {
      name: "favorites-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
