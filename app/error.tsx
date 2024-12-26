"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="h-full flex flex-col space-y-4 items-center justify-center">
      <h1 className="text-4xl text-s-1 font-semibold ">404</h1>
      <p className="font-medium text-xl text-n-1">Something went wrong</p>
      <Button variant="default" size="lg" className="bg-primary-2">
        <Link href="/" className="text-n-5 font-medium">
          Go back home
        </Link>
      </Button>
    </div>
  );
};

export default ErrorPage;
