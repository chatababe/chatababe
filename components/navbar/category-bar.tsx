"use client";

import SearchInput from "@/components/searchbar";
import { categories } from "@/constants";
import { ListFilter } from "lucide-react";
import React from "react";
import { useFilterSidebar } from "@/store/use-filter-sidebar";
import { useCategoryNavbar } from "@/store/use-category-navbar";
import { cn } from "@/lib/utils";

const Categorybar = () => {
  const { collapsed, onExpand, onCollapse } = useFilterSidebar(
    (state) => state
  );
  const { selectedCategory, setCategory } = useCategoryNavbar();
  const onToggle = () => {
    if (collapsed) {
      onCollapse();
    } else {
      onExpand();
    }
  };

  return (
    <>
      <div className="overflow-hidden mx-8 my-2 border-b border-n-4/40 max-lg:hidden">
        <div className="w-full flex items-center">
          <div className="flex items-center gap-[2px]">
            {categories.map((item) => (
              <button
                className={cn(
                  "p-2 px-3 rounded-t-md bg-primary-3/40 hover:bg-primary-3/90 flex items-center",
                  selectedCategory === item.title &&
                    "bg-primary-2 hover:bg-primary-2"
                )}
                key={item.id}
                onClick={() => setCategory(item.title)}
              >
                <p className="text-xs font-semibold uppercase text-n-5">
                  {item.title}
                </p>
              </button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-4">
            <button
              className="flex items-center p-1 rounded-sm"
              onClick={onToggle}
            >
              <ListFilter size={16} color="#2563eb" />
              <p className="text-[10px] text-primary-2">Filters</p>
            </button>
            <SearchInput />
          </div>
        </div>
      </div>
    </>
  );
};

export const CategoryContainer = () => {
  const { selectedCategory, setCategory } = useCategoryNavbar();
  return (
    <div className=" w-full overflow-hidden overflow-x-scroll hidden-scrollbar px-3 my-3 lg:hidden">
      <div className="flex items-center gap-4">
        {categories.map((item) => (
          <button
            className={cn(
              "p-2 px-3 rounded-md border border-n-4 flex items-center",
              selectedCategory === item.title &&
                "bg-primary-3 hover:bg-primary-3"
            )}
            key={item.id}
            onClick={() => setCategory(item.title)}
          >
            <p className={cn("text-xs font-semibold uppercase text-n-3",selectedCategory === item.title && "text-n-5")}>
              {item.title}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};
export default Categorybar;
