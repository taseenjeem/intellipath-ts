"use client";
import { useAppSelector } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface IUserActionBtnsProps {
  isSmallDevice?: boolean;
}

const UserActionBtns = ({ isSmallDevice = false }: IUserActionBtnsProps) => {
  const pathName = usePathname();
  const isActive = pathName.includes("/auth");
  const authData = useAppSelector((state) => state.userInfo);

  const closeDrawer = () => {
    const menuCheckbox = document.getElementById(
      "menu-contents"
    ) as HTMLInputElement;

    if (menuCheckbox) {
      menuCheckbox.checked = false;
    }
  };

  const openLogoutModal = () => {
    const logoutModal = document.getElementById(
      "logout-modal"
    ) as HTMLDialogElement | null;
    if (logoutModal) {
      logoutModal.showModal();
    }
  };

  return (
    <>
      {authData.status ? (
        <div className="dropdown dropdown-end lg:mx-3 lg:mt-1">
          <button tabIndex={0} className="avatar">
            <div className="ring-primary ring-offset-base-100 size-8 rounded-full ring ring-offset-2">
              <Image
                width={32}
                height={32}
                src="https://randomuser.me/api/portraits/men/8.jpg"
                alt="Profile"
              />
            </div>
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 border border-primary rounded-box z-[1] w-52 p-2 mt-5 shadow"
          >
            <li>
              <Link href={`/profile/${authData.username}`}>My Profile</Link>
            </li>
            <li>
              <button onClick={openLogoutModal}>Log Out</button>
            </li>
          </ul>
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
