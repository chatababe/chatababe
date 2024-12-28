"use client";

import { useState } from "react";
import Modal from "./modal";
import Link from "next/link";
import { Menu, UserCircle} from "lucide-react";
import { navigation } from "@/constants";
import Logo from "../logo";
import {SignUpButton } from "@clerk/nextjs";
import StreamModal from "../stream-modal";

interface UserProps {
  username: string,
  currentTokens: number,
  stream:Stream|undefined|null
}

const Topbar = ({stream, username,currentTokens}:UserProps) => {
  const [openNavigation, setOpenNavigation] = useState(false);

  return (
    <>
      <div className="px-6 py-3 bg-n-5 max-lg:border-b max-lg:border-neutral-500/40 lg:px-8 xl:px-12">
        <div className="flex justify-between items-center">
          <Logo/>
          <Modal username={username} currentTokens={currentTokens}/>
          <button
            className="ml-auto lg:hidden"
            onClick={() => setOpenNavigation(!openNavigation)}
          >
            <Menu size={28} color="#4b5563" />
          </button>
          <Link href={`/u/${username}`} className="ml-4 lg:hidden" >
          <UserCircle size={28} color="#4b5563"/>
          </Link>
        </div>
      </div>
      {openNavigation && (
        <div className="fixed top-[5.4rem] left-0 bottom-0 w-full py-12 bg-primary-1 border-r border-r-n-3/40 z-[100] lg:hidden">
          <div className=" h-full flex flex-col space-y-4 items-center px-8 py-12 gap-4">
            {navigation.map((item) => (
              <Link
                key={item.id}
                href={item.url}
                className="link-text"
              >
                {item.title}
              </Link>
            ))}
              <StreamModal stream={stream} />
            <div className=" mt-4 py-2 px-4 bg-s-2 rounded-md min-w-[10rem] flex flex-col items-center justify-center">
              <SignUpButton
              >
                <p className="font-semibold text-lg text-n-5">sign up</p>
              </SignUpButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Topbar;
