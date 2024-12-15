"use client";

import { useState } from "react";
import Modal from "./modal";
import Link from "next/link";
import { Menu, ArrowDownWideNarrow } from "lucide-react";
import { navigation } from "@/constants";

type User = {
  userName: string,
  tokens: number
}

const Topbar = ({user}:{user:User}) => {
  const [openNavigation, setOpenNavigation] = useState(false);

  return (
    <>
      <div className="px-6 py-3 bg-n-5 max-lg:border-b max-lg:border-neutral-500/40 lg:px-8 xl:px-12">
        <div className="flex justify-between items-center">
          <button
            className="mr-auto lg:hidden"
            onClick={() => setOpenNavigation(!openNavigation)}
          >
            <Menu size={38} color="#4b5563" />
          </button>
          <div className="flex flex-col items-center w-12rem xl:mr-8 lg:items-start ">
            <p className="font-serif text-3xl font-bold text-n-1 mb-2">
              Live
              <span className="font-serif text-2xl font-bold text-s-2">
                stream
              </span>
            </p>
            <p className="text-xs font-semibold text-n-2">
              Watch your favourite streams
            </p>
          </div>
          <Modal user={user}/>
          <button className="ml-auto lg:hidden">
            <ArrowDownWideNarrow size={38} color="#4b5563" />
          </button>
        </div>
      </div>
      {openNavigation && (
        <div className="fixed top-[5.4rem] left-0 bottom-0 w-2/5 bg-primary-1 border-r border-r-n-3/40 lg:hidden">
          <div className=" h-full flex flex-col px-8  py-12 gap-4">
            {navigation.map((item) => (
              <Link
                key={item.id}
                href={item.url}
                className="text-n-3 text-sm font-poppins font-medium uppercase transition-colors hover:text-n-2"
              >
                {item.title}
              </Link>
            ))}
            <div className=" mt-4 py-2 px-4 bg-s-2 rounded-md flex flex-col items-center justify-center">
              <Link
                href="/"
                className="text-center text-n-5 text-sm font-poppins uppercase px-5"
              >
                sign up
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Topbar;
