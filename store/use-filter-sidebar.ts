import { create } from "zustand";

interface FilterSidebarStore {
  collapsed: boolean;
  onExpand: () => void;
  onCollapse: () => void;
}

export const useFilterSidebar = create<FilterSidebarStore>((set) => ({
  collapsed: true,
  onExpand: () => set(() => ({ collapsed: true })),
  onCollapse: () => set(() => ({ collapsed: false })),
}));
