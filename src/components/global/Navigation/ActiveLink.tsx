"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface ActiveLinkProps {
  href: string;
  children: ReactNode;
  isSmallDevice?: boolean;
}

const ActiveLink = ({
  href,
  children,
  isSmallDevice = false,
}: ActiveLinkProps) => {
  const path = usePathname();
  const isActive = path === href;

  const closeDrawer = () => {
    const menuCheckbox = document.getElementById(
      "menu-contents"
    ) as HTMLInputElement;

    if (menuCheckbox) {
      menuCheckbox.checked = false;
    }
  };

  return (
    <Link
      onClick={isSmallDevice ? closeDrawer : undefined}
      className={`btn btn-sm font-semibold my-1 md:my-0 ${
        isActive ? "btn-primary" : "btn-ghost"
      }`}
      href={href}
    >
      {children}
    </Link>
  );
};

export default ActiveLink;
