"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CircleUserRound, MessageCircle, Bell } from "lucide-react";

const Popup = () => {
  return (
    <div className="z-20 absolute top-[2rem] left-0 w-full px-2 py-2 bg-primary-3 flex flex-col rounded-b-lg">
      <div className="flex items-center justify-between pb-2">
        <p className="text-sm font-semibold text-n-5 capitalize">
          <span>Dark</span> mode
        </p>
        {/* add theme changer */}
        <div>changer</div>
      </div>
      <Link href="/" className="text-sm font-semibold text-n-5 pb-2 capitalize">
        Log in
      </Link>
      <Link href="/" className="text-sm font-semibold text-n-5 pb-2 capitalize">
        Sign up
      </Link>
      <Link href="/" className="text-sm font-semibold text-n-5 pb-2 capitalize">
        Feedback
      </Link>
    </div>
  );
};
type User = {
  userName: string,
  tokens: number
}

const Modal = ({ user }: { user: User}) => {
  const [isOpen, setIsopen] = useState(false);
  // add functionalities to buttons
  return (
    <div className=" relative min-w-[16rem] max-lg:hidden">
      <div className="">
        <div className="bg-primary-2 flex items-center p-2 rounded-t-lg ">
          <button className="mr-auto" onClick={() => setIsopen(!isOpen)}>
            <CircleUserRound size={18} color="#FFFFFF" />
          </button>
          <div className="flex items-center gap-4">
            <button>
              <MessageCircle size={18} color="#FFFFFF" />
            </button>
            <button>
              <Bell size={18} color="#FFFFFF" />
            </button>
          </div>
        </div>
        <div className="z-1 px-2 py-4 bg-primary-1">
          <div className="flex items-center w-full mb-2">
            <p className="text-xs text-n-2 font-semibold">
              Status:{" "}
              <span className="text-sm text-n-2 font-bold">{user ? user.userName : "Anonymus"}</span>
            </p>
            <Link href="/" className="text-xs text-s-3 ml-auto font-medium">
              {user ? "(log out)" : "(log in)"}
            </Link>
          </div>
          <div className="flex items-center w-full">
            <p className="text-xs text-n-2 font-semibold">
              You have:{" "}
              <span className="text-sm text-n-2 font-bold">{user.tokens} tokens</span>
            </p>
            <Link href="/" className="text-xs text-s-3 ml-auto font-medium">
              {"("}Get More{")"}
            </Link>
          </div>
        </div>
        {isOpen && <Popup />}
      </div>
    </div>
  );
};

export default Modal;
