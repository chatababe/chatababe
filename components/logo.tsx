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
      className={cn(" mb-2 hover:no-underline ", lobster.className)}
      href="/"
    >
      <p className="font-serif text-3xl font-bold text-n-1 mb-2">
        Live
        <span className="font-serif text-2xl font-bold text-s-2">stream</span>
      </p>
    </Link>
  );
}

export default Logo;
