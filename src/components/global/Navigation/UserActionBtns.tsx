"use client";
import { useAppSelector } from "@/redux/store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface IUserActionBtnsProps {
  isSmallDevice?: boolean;
}

const UserActionBtns = ({ isSmallDevice = false }: IUserActionBtnsProps) => {
  const pathName = usePathname();
  const isActive = pathName.includes("/auth");
  const { data: session } = useSession();
  const authData = useAppSelector((state) => state.userInfo);

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
      {authData && session ? (
        <div className="avatar">
          <div className="ring-primary ring-offset-base-100 size-8 rounded-full ring ring-offset-2">
            <Image
              width={32}
              height={32}
              src="https://randomuser.me/api/portraits/men/8.jpg"
              alt="Profile"
            />
          </div>
        </div>
      ) : (
        <Link
          onClick={isSmallDevice ? closeDrawer : undefined}
          href={`/auth/login`}
          className={`btn ${
            isActive ? "btn-primary" : "btn-outline btn-primary"
          } btn-sm md:mx-1 mx-0 my-1 md:my-0`}
        >
          Log In
        </Link>
      )}
    </>
  );
};

export default UserActionBtns;
