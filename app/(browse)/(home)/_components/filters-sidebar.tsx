"use client"

import { countries, decades, genres, years } from '@/constants';
import { cn } from '@/lib/utils';
import { useFilterSidebar } from '@/store/use-filter-sidebar';
import React from 'react';

interface FilterSectionProps {
  onFilterSelect?: (category: string, value: string) => void;
}

const FilterSections: React.FC<FilterSectionProps> = ({ onFilterSelect }) => {
  
   const { collapsed } = useFilterSidebar((state) => state);

  return (
    <div className={cn("w-[22rem] p-6 bg-n-5 space-y-8" ,collapsed && "hidden")}>
      <section>
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-6 h-6 text-gray-700" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
          <h2 className="text-base font-semibold text-n-1">Release Year</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => onFilterSelect?.('year', year)}
              className="px-4 py-2 text-xs bg-n-5 text-n-2/80 rounded-md border border-n-4/60 hover:bg-n-4/30 hover:border-n-4 transition-colors"
            >
              {year}
            </button>
          ))}
          {decades.map((decade) => (
            <button
              key={decade}
              onClick={() => onFilterSelect?.('decade', decade)}
              className="px-4 py-2 text-xs bg-n-5 text-n-2/80 rounded-md border border-n-4/60 hover:bg-n-4/30 hover:border-n-4 transition-colors"
            >
              {decade}
            </button>
          ))}
        </div>
      </section>

      {/* Genres Section */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-6 h-6 text-n-2/80" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <h2 className="text-base font-semibold text-n-1">Genres</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => onFilterSelect?.('genre', genre)}
              className="px-4 py-2 text-xs bg-n-5 text-n-2/80 rounded-md border border-n-4/60 hover:bg-n-4/30 hover:border-n-4 transition-colors"
            >
              {genre}
            </button>
          ))}
        </div>
      </section>

      {/* Country Section */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-6 h-6 text-n-2/80" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
          </svg>
          <h2 className="text-base font-semibold text-n-1">Country</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {countries.map((country) => (
            <button
              key={country}
              onClick={() => onFilterSelect?.('country', country)}
              className="px-4 py-2 text-xs bg-n-5 text-n-2/80 rounded-md border border-n-4/60 hover:bg-n-4/30 hover:border-n-4 transition-colors"
            >
              {country}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FilterSections;