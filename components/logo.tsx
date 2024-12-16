import React from "react";
import Link from "next/link";
import { Lobster } from "next/font/google";
import { cn } from "@/lib/utils";

const lobster = Lobster({
  subsets: ["latin"],
  weight: ["400"],
});

function Logo() {
  return (
    <Link
      className={cn(
        "hover:no-underline flex flex-col items-center xl:mr-8 lg:items-start ",
        lobster.className
      )}
      href="/"
    >
      <p className="text-5xl tracking-wide font-bold text-n-1 mb-3 max-lg:text-3xl">
        Live
        <span className="text-3xl tracking-wide font-bold text-s-2 max-lg:text-xl">stream</span>
      </p>
      <p className="font-poppins text-xs tracking-tighter font-semibold text-n-3/60 max-lg:hidden">
        Watch your favourite streams
      </p>
    </Link>
  );
}

export default Logo;
