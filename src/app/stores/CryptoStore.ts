import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface IThemeStore {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

interface IFavoriteStore {
  id: string;
  setId: (id: string) => void;
}

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
    (set) => ({
      id: "",
      setId: (id) => set({ id: id }),
    }),
    {
      name: "favorites-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
