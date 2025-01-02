// app/providers/use-filters.tsx
"use client";

import React, { createContext, useContext } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// Define allowed filter categories
export type FilterCategory = 'year' | 'room' | 'genre' | 'country' | 'type';

// Define the filter types with index signature
export type Filters = {
  [key in FilterCategory]: string | undefined;
} & {
  year?: string;
  room?: string;
  genre?: string;
  country?: string;
  type?:string;
};

// Define the context type
interface FilterContextType {
  filters: Filters;
  updateFilters: (newFilters: Partial<Filters>) => void;
  clearFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

interface FilterProviderProps {
  children: React.ReactNode;
}

export function FilterProvider({ children }: FilterProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const filters: Filters = {
    year: searchParams.get('year') ?? undefined,
    room: searchParams.get('room') ?? undefined,
    genre: searchParams.get('genre') ?? undefined,
    country: searchParams.get('country') ?? undefined,
    type:  searchParams.get('type') ?? undefined,
  };

  const updateFilters = (newFilters: Partial<Filters>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    const newURL = `${pathname}?${params.toString()}`;
    router.push(newURL);
  };

  const clearFilters = () => {
    router.push(pathname);
  };

  const contextValue: FilterContextType = {
    filters,
    updateFilters,
    clearFilters
  };

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters(): FilterContextType {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
}