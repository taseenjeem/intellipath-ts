"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface UserActionBtnsProps {
  isSmallDevice?: boolean;
}

const UserActionBtns = ({ isSmallDevice = false }: UserActionBtnsProps) => {
  const pathName = usePathname();
  const isActive = pathName.includes("/auth");

  const closeDrawer = () => {
    const menuCheckbox = document.getElementById(
      "menu-contents"
    ) as HTMLInputElement;

    if (menuCheckbox) {
      menuCheckbox.checked = false;
    }
  };

  return (
    <>
      <Link
        onClick={isSmallDevice ? closeDrawer : undefined}
        href={`/auth/login`}
        className={`btn ${
          isActive ? "btn-primary" : "btn-outline btn-primary"
        } btn-sm md:mx-1 mx-0 my-1 md:my-0`}
      >
        Log In
      </Link>
    </>
  );
};

export default UserActionBtns;
