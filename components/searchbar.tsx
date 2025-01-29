"use client";

import React, { useState } from "react";
import qs from "query-string";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";

const SearchInput = () => {
  const router = useRouter();

  const [isInputVisible, setIsInputVisible] = useState(false);
  const [value, setValue] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim()) return;
    const url = qs.stringifyUrl(
      {
        url: "/search",
        query: { term: value },
      },
      { skipEmptyString: true }
    );
    router.push(url);
  };

  const onClear = () => {
    setValue("");
  };

  const toggleInput = () => {
    setIsInputVisible(!isInputVisible);
  };

  return (
    <div className="relative flex items-center">
      {isInputVisible ? (
        <form
          className="flex items-center border border-n-4/60 rounded-lg py-2 w-48 h-7 transition-all duration-300 origin-right"
          onSubmit={onSubmit}
        >
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="
              w-full 
              outline-none 
              bg-transparent 
              placeholder-gray-500
              px-2
              text-xs
              text-n-1
            "
            placeholder="Search subjects, #tags or broadcasters"
          />
          <button
            type="reset"
            onClick={!value ? toggleInput : onClear}
            className="flex items-center justify-center mr-2"
          >
            <X size={16} color="#2563eb" className="cursor-pointer" />
          </button>
        </form>
      ) : (
        <button onClick={toggleInput} className="p-1 rounded-sm transition-all">
          <Search size={16} color="#2563eb" />
        </button>
      )}
    </div>
  );
};

export const SearchBar = () => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim()) return;
    const url = qs.stringifyUrl(
      {
        url: "/search",
        query: { term: value },
      },
      { skipEmptyString: true }
    );
    router.push(url);
  };

  const onClear = () => {
    setValue("");
  };

  return (
    <form className="relative flex flex-col space-y-1 items-center w-full" onSubmit={onSubmit}>
      <div
        className="flex items-center border border-n-4/60 rounded-lg py-2 w-full h-12 transition-all duration-300 origin-right"
      >
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="
              w-full 
              outline-none 
              bg-transparent 
              placeholder-n-2
              placeholder-shown:font-medium
              px-2
              text-base
              text-n-1
            "
          placeholder="Search subjects, #tags or broadcasters"
        />
        <button
          type="reset"
          onClick={onClear}
          className="flex items-center justify-center mr-2"
        >
          <X size={24} color="#2563eb" className="cursor-pointer" />
        </button>
      </div>
      <button type="submit" className="p-2 rounded-lg transition-all w-full bg-primary-3">
        <p className="text-base text-center font-semibold text-primary-1">Search</p>
      </button>
    </form>
  );
};

export default SearchInput;
