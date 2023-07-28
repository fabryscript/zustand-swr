import { create } from "zustand";

interface FavoriteItem {
  activity: string,
  type: string,
  price: number,
  key: number
}

interface State {
  favs: FavoriteItem[]
}

interface Action {
  addFavorite: (item: FavoriteItem) => void,
  removeFavorite: (key: number) => void
}

export const useFavoritesStore = create<State & Action>((set) => ({
  favs: [],
  addFavorite: (item: FavoriteItem) => set((state) => ({ favs: [...state.favs, item] })),
  removeFavorite: (key: number) => set((state) => {
    const filtered = state.favs.filter((item) => item.key !== key)
    return {
      favs: filtered
    }
  })
}))