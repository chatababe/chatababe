"use client";

import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Clock, Fullscreen, User,} from "lucide-react";

import NavItem, { NavItemSkeleton } from "./nav-item";

const Navigation = () => {
  const pathname = usePathname();
  const { user } = useUser();

  const routes = [
    {
      label: "Analytics",
      href: `/admin/${user?.username}/`,
      icon: Fullscreen,
    },
    {
      label: "Approvals",
      href: `/admin/${user?.username}/approvals`,
      icon: Clock,
    },
    {
      label: "Users",
      href: `/admin/${user?.username}/users`,
      icon: User,
    },
  ];

  if (!user?.username) {
    return (
      <ul className="space-y-2">
        {[...Array(3)].map((_, i) => (
          <NavItemSkeleton key={i} />
        ))}
      </ul>
    );
  }

  return (
    <ul className="space-y-2 px-2 pt-4 lg:pt-0">
      {routes.map((route) => (
        <NavItem
          key={route.href}
          label={route.label}
          icon={route.icon}
          href={route.href}
          isActive={pathname === route.href}
        />
      ))}
    </ul>
  );
};

export default Navigation;
