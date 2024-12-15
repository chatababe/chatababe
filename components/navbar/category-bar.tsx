"use client"

import { useState } from "react";
import SearchInput from "@/components/searchbar";
import Settingstab from "@/components/settings";
import { categories } from "@/constants";
import { ListFilter, Settings } from "lucide-react";
import React from "react";

const Categorybar = () => {
 
  const [openSettings,setOpenSettings] = useState(false)
  return (
    <>
      <div className="overflow-hidden mx-8 my-2 border-b border-n-4/40 max-lg:hidden">
        <div className="w-full flex items-center">
          <div className="flex items-center gap-[2px]">
            {categories.map((item) => (
              <button
                className=" p-2 px-3 rounded-t-md bg-primary-3/40 hover:bg-primary-3/90 flex items-center"
                key={item.id}
              >
                <p className="text-xs font-semibold uppercase text-n-5">
                  {item.title}
                </p>
              </button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-4">
            <button className="flex items-center p-1 rounded-sm">
              <ListFilter size={16} color="#2563eb" />
              <p className="text-[10px] text-primary-2">Filters</p>
            </button>
            <SearchInput />
            <button onClick={()=>setOpenSettings(!openSettings)}>
              <Settings size={16} color="#2563eb" />
            </button>
          </div>
        </div>
      </div>
      {
        openSettings && <Settingstab setOpenSettings={setOpenSettings}/>
      }
    </>
  );
};

export default Categorybar;
