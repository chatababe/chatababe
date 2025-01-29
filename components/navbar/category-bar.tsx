"use client";

import SearchInput, { SearchBar } from "@/components/searchbar";
import { categories } from "@/constants";
import { ListFilter } from "lucide-react";
import { useFilterSidebar } from "@/store/use-filter-sidebar";
import { cn } from "@/lib/utils";
import { useCategory } from "@/app/providers/use-categories";
import { Button } from "../ui/button";
import { useState } from "react";

const Categorybar = () => {
  const { collapsed, onExpand, onCollapse } = useFilterSidebar(
    (state) => state
  );
  const { category, updateCategory } = useCategory();

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
                  category === item.title && "bg-primary-2 hover:bg-primary-2"
                )}
                key={item.id}
                onClick={() => updateCategory(item.title)}
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
  const { category, updateCategory } = useCategory();
  const [showOptions, setShowOptions] = useState(false);
  return (
    <div className="relative px-3 my-3 lg:hidden">
      <div className="flex items-center gap-4 w-full overflow-hidden overflow-x-scroll hidden-scrollbar">
        {categories.map((item) => (
          <button
            className={cn(
              "p-2 px-3 rounded-md border border-n-4 flex items-center",
              category === item.title && "bg-primary-3 hover:bg-primary-3"
            )}
            key={item.id}
            onClick={() => updateCategory(item.title)}
          >
            <p
              className={cn(
                "text-xs font-semibold uppercase text-n-3",
                category === item.title && "text-n-5"
              )}
            >
              {item.title}
            </p>
          </button>
        ))}
      </div>

      <div className="w-full pt-1 space-y-1">
          <Button
            variant="link"
            className=" block ml-auto"
            onClick={() => setShowOptions(!showOptions)}
          >
            <p className="text-n-2 text-xs">Options</p>
          </Button>
        {showOptions && (
          <div className="w-full p-2">
            <SearchBar />
          </div>
        )}
      </div>
    </div>
  );
};
export default Categorybar;
