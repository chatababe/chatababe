import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Label } from "./ui/label";

function Logo() {
  return (
    <Link
      className={cn(
        "hover:no-underline flex flex-col gap-2"
      )}
      href="/"
    >
      <div className="relative w-[200px] h-[60px] max-lg:w-[100px] max-lg:h-[30px]">
        <Image
          src="/assets/icons/logo.svg"
          alt="logo"
          fill
          className="object-cover"
        />
      </div>
      <Label className="font-semibold text-xs font-poppins text-n-3 max-lg:text-[10px] max-lg:font-medium max-lg:text-n-1/90">
        The home of pleasure
      </Label>
    </Link>
  );
}

export default Logo;