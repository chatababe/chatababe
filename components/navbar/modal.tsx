"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, Bell, Moon, UserCircle } from "lucide-react";
import { SignInButton, SignOutButton, UserButton } from "@clerk/nextjs";

type User = {
  userName: string;
  tokens: number;
};

const Modal = ({ user }: { user: User }) => {
  // add functionalities to buttons
  return (
    <div className=" relative min-w-[16rem] max-lg:hidden">
      <div className="">
        <div className="bg-primary-2 flex items-center p-2 rounded-t-lg ">
          {user.userName === "Anonymous" ? (
            <button>
              <UserCircle size={18} color="#FFFFFF" />
            </button>
          ) : (
            <UserButton />
          )}
          <div className="ml-auto flex items-center gap-3">
            <button>
              <Moon size={16} color="#FFFFFF" />
            </button>
            <button>
              <MessageCircle size={16} color="#FFFFFF" />
            </button>
            <button>
              <Bell size={16} color="#FFFFFF" />
            </button>
          </div>
        </div>
        <div className="z-1 px-2 py-4 bg-primary-1">
          <div className="flex items-center w-full mb-2">
            <p className="text-xs text-n-2 font-semibold">
              Status:{" "}
              <span className="text-sm text-n-2 font-bold">
                {user.userName}
              </span>
            </p>
            {
              user.userName === "Anonymous" ?(
                <SignInButton>
                <p className="text-xs text-s-3 ml-auto font-medium cursor-pointer">
                  {"(log in)"}
                </p>
              </SignInButton>
              ) :(
                <SignOutButton>
                <p className="text-xs text-s-3 ml-auto font-medium cursor-pointer">
                  {"(log out)"}
                </p>
              </SignOutButton>
              )
            }
          </div>
          <div className="flex items-center w-full">
            <p className="text-xs text-n-2 font-semibold">
              You have:{" "}
              <span className="text-sm text-n-2 font-bold">
                {user.tokens} tokens
              </span>
            </p>
            <Link href="/" className="text-xs text-s-3 ml-auto font-medium">
              {"("}Get More{")"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
