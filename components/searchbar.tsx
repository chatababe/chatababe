"use client";

import React, { useState } from "react";
import { Search, X } from "lucide-react";

const SearchInput = () => {
  const [isInputVisible, setIsInputVisible] = useState(false);

  const toggleInput = () => {
    setIsInputVisible(!isInputVisible);
  };

  return (
    <div className="relative flex items-center">
      {isInputVisible ? (
        <div className="flex items-center border border-n-4/60 rounded-lg py-2 w-48 h-7 transition-all duration-300 origin-right">
          <input
            type="text"
            className="
              w-full 
              outline-none 
              bg-transparent 
              placeholder-gray-500
              px-2
              text-xs
              text-n-1
            "
            placeholder="Search..."
          />
          <button
            onClick={toggleInput}
            className="flex items-center justify-center mr-2"
          >
            <X size={16} color="#2563eb" className="cursor-pointer" />
          </button>
        </div>
      ) : (
        <button onClick={toggleInput} className="p-1 rounded-sm transition-all">
          <Search size={16} color="#2563eb" />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
