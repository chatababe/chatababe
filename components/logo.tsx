import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

function Logo() {
  return (
    <Link
      className={cn(
        "hover:no-underline flex flex-col items-center xl:mr-8 lg:items-start"
      )}
      href="/"
    >
      <Image
        src="/assets/icons/logo.svg"
        alt="logo"
        width={120}
        height={120}
        className="max-lg:hidden"
      />
      <Image
        src="/assets/images/logo-small.jpg"
        alt="logo"
        width={80}
        height={80}
        className="lg:hidden"
      />
    </Link>
  );
}

export default Logo;
