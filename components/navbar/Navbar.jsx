import Link from "next/link";
import { navigation } from "@/constants";
import { cn } from "@/lib/utils";

const Navbar = async () => {
  return (
    <div className="bg-primary-2 max-lg:hidden">
      <div className="flex gap-4 justify-between items-center py-4 max-h-[3rem]">
        <nav className="px-12 flex items-center gap-8 overflow-hidden">
          {navigation.map((item) => (
            <Link
              key={item.id}
              href={item.url}
              className={cn("text-n-5 text-xs font-medium font-poppins uppercase hover:underline",item.isMobileOnly?"hidden":"block")}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="h-[3rem] relative flex items-center text-n-5">
          <div className="mr-3">
            <Link
              href="/"
              className="text-center text-white-100 text-sm font-poppins uppercase hover:underline"
            >
              Brodcast yourself
            </Link>
          </div>
          <div className="h-full px-4 bg-s-2 rounded-md flex flex-col items-center justify-center">
            <Link
              href="/"
              className="text-center text-white-100 text-sm font-poppins uppercase hover:underline px-5"
            >
              sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
