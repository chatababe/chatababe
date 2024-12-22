"use client";

import { useState } from "react";
import Modal from "./modal";
import Link from "next/link";
import { Menu} from "lucide-react";
import { navigation } from "@/constants";
import Logo from "../logo";
import ProfileModal from "./profile-modal";

interface UserProps {
  username: string,
  currentTokens: number
}

const Topbar = ({username,currentTokens}:UserProps) => {
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
          <div className="lg:hidden">
            <ProfileModal/>
          </div>
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
