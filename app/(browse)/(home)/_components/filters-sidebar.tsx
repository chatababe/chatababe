"use client";

import { regions, tags, age, rooms } from "@/constants";
import { cn } from "@/lib/utils";
import { useFilterSidebar } from "@/store/use-filter-sidebar";
import React, { useState } from "react";

interface FilterSectionProps {
  onFilterSelect?: (category: string, value: string) => void;
}

const FilterSections: React.FC<FilterSectionProps> = ({ onFilterSelect }) => {
  const { collapsed } = useFilterSidebar((state) => state);
  const [currentPage, setCurrentPage] = useState(1);
  const tagsPerPage = 20;
  const totalPages = Math.ceil(tags.length / tagsPerPage);

  const getCurrentTags = () => {
    const start = (currentPage - 1) * tagsPerPage;
    const end = start + tagsPerPage;
    return tags.slice(start, end);
  };

  return (
    <div
      className={cn(
        "w-[22rem] p-6 bg-n-5 space-y-8 max-lg:hidden",
        collapsed && "hidden"
      )}
    >
      {/* age section */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-base font-semibold text-n-1">Age</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {age.map((year) => (
            <button
              key={year}
              onClick={() => onFilterSelect?.("year", year)}
              className="px-4 py-2 text-xs bg-n-5 text-n-2/80 rounded-md border border-n-4/60 hover:bg-n-4/30 hover:border-n-4 transition-colors"
            >
              {year}
            </button>
          ))}
        </div>
      </section>

      {/* rooms section */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-base font-semibold text-n-1">Room size</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {rooms.map((room) => (
            <button
              key={room}
              onClick={() => onFilterSelect?.("room", room)}
              className="px-4 py-2 text-xs bg-n-5 text-n-2/80 rounded-md border border-n-4/60 hover:bg-n-4/30 hover:border-n-4 transition-colors"
            >
              {room}
            </button>
          ))}
        </div>
      </section>

      {/* Tags Section */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-base font-semibold text-n-1">Tags</h2>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {getCurrentTags().map((genre) => (
            <button
              key={genre}
              onClick={() => onFilterSelect?.("genre", genre)}
              className="px-4 py-2 text-xs bg-n-5 text-n-2/80 rounded-md border border-n-4/60 hover:bg-n-4/30 hover:border-n-4 transition-colors"
            >
              {genre}
            </button>
          ))}
        </div>

        <div className="flex justify-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-xs bg-n-5 text-n-2/80 rounded-md border border-n-4/60 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-xs text-n-2/80">
            {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-xs bg-n-5 text-n-2/80 rounded-md border border-n-4/60 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </section>

      {/* Country Section */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-base font-semibold text-n-1">Region</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {regions.map((country) => (
            <button
              key={country}
              onClick={() => onFilterSelect?.("country", country)}
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
