"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React, { createContext, useContext, useState } from "react";

interface CategoryContextType {
  category: string;
  updateCategory: (item: string) => void;
}
// Default values for the context
const defaultCategoryContext: CategoryContextType = {
  category: "featured",
  updateCategory: () => {}, // No-op function to satisfy the type
};

const CategoryContext = createContext<CategoryContextType>(
  defaultCategoryContext
);

interface CategoryProviderProps {
  children: React.ReactNode;
}

export function CategoryProvider({ children }: CategoryProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<string>("featured");

  const updateCategory = (item: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("type", item);
    setCategory(item);
    const newURL = `${pathname}?${params.toString()}`;
    router.push(newURL);
  };

  return (
    <CategoryContext.Provider value={{ category, updateCategory }}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory(): CategoryContextType {
  const context = useContext(CategoryContext);
  return context;
}
