import { create } from "zustand";

interface CategoryNavbarStore {
  selectedCategory: string;
  setCategory: (category: string) => void;
}

export const useCategoryNavbar = create<CategoryNavbarStore>((set) => ({
  selectedCategory: "Featured",
  setCategory: (category: string) => set(() => ({ selectedCategory: category })),
}));
