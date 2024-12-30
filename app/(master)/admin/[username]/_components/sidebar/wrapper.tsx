"use client";

import { cn } from "@/lib/utils";
import { useAdminSidebar } from "@/store/use-admin-sidebar";

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => {
  const { collapsed } = useAdminSidebar((state) => state);

  return (
    <aside
      className={cn(
        "absolute left-0 flex flex-col w-[70px] lg:w-60 h-full bg-n-5 z-50",
        collapsed && "lg:w-[70px]"
      )}
    >
      {children}
    </aside>
  );
};

export default Wrapper;
