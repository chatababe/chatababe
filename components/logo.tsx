import React from "react";
import Link from "next/link";
import { Lobster } from "next/font/google";
import { cn } from "@/lib/utils";
import Image from "next/image";

const lobster = Lobster({
  subsets: ["latin"],
  weight: ["400"],
});

function Logo() {
  return (
    <Link
      className={cn(
        "hover:no-underline flex flex-col items-center xl:mr-8 lg:items-start",
        lobster.className
      )}
      href="/"
    >
      <Image
        src='/logo.jpg'
        alt="logo"
        width={120}
        height={120}
      />
    </Link>
  );
}

export default Logo;
