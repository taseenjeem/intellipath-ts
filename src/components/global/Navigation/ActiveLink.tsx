"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ActiveLinkProps {
  href: string;
  children: React.ReactNode;
  isSmallDevice?: boolean;
}

const ActiveLink = ({
  href,
  children,
  isSmallDevice = false, // Defaults to false if not provided
}: ActiveLinkProps) => {
  const path = usePathname(); // Get the current pathname
  const isActive = path === href; // Determine if the current link is active

  // Function to close the drawer menu on small devices
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
      {children} {/* Display the children content */}
    </Link>
  );
};

export default ActiveLink;
