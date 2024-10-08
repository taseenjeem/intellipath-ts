"use client";
import { getUserByEmail } from "@/database/server-actions";
import { updateUserInfo } from "@/redux/slices/UserInfoSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface IUserActionBtnsProps {
  isSmallDevice?: boolean;
}

const UserActionBtns = ({ isSmallDevice = false }: IUserActionBtnsProps) => {
  const pathName = usePathname(); // Get the current pathname
  const isActive = pathName.includes("/auth"); // Check if the current path is for authentication routes
  const { data: session, status } = useSession(); // Session data and status from next-auth
  const authData = useAppSelector((state) => state.userInfo); // Get the user information from Redux store
  const dispatch = useAppDispatch(); // Redux dispatch function

  // Fetch user data from server if authenticated
  useEffect(() => {
    const fetchUserData = async () => {
      if (status === "authenticated" && session?.user?.email) {
        const userData = await getUserByEmail(session.user.email); // Fetch user data by email
        dispatch(updateUserInfo(userData)); // Update the user information in Redux store
      }
    };
    fetchUserData();
  }, [dispatch, session?.user?.email, status]);

  // Close the drawer menu on small devices
  const closeDrawer = () => {
    const menuCheckbox = document.getElementById(
      "menu-contents"
    ) as HTMLInputElement;

    if (menuCheckbox) {
      menuCheckbox.checked = false;
    }
  };

  // Open the logout modal
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
      {status === "authenticated" || authData.status ? ( // Check if user is authenticated
        <>
          {/* Desktop view of user profile and logout options */}
          <div className="dropdown dropdown-end lg:mx-3 lg:mt-1 hidden md:block">
            <button tabIndex={0} className="avatar">
              <div className="ring-primary ring-offset-base-100 size-8 rounded-full ring ring-offset-2">
                <Image
                  width={32}
                  height={32}
                  src={
                    authData?.profileImageUrl
                      ? authData.profileImageUrl
                      : "/assets/images/profile-placeholder.jpg"
                  }
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
          {/* Mobile view of user profile and logout options */}
          <Link
            href={`/profile/${authData?.username}`}
            className="flex justify-center items-center gap-4 mt-5 md:hidden"
          >
            <div className="avatar">
              <div className="ring-primary ring-offset-base-100 size-8 rounded-full ring ring-offset-2">
                <Image
                  width={32}
                  height={32}
                  src={
                    authData?.profileImageUrl
                      ? authData.profileImageUrl
                      : "/assets/images/profile-placeholder.jpg"
                  }
                  alt="Profile"
                />
              </div>
            </div>
            <div>
              <h4 className="text-base font-semibold">@{authData?.username}</h4>
              <p>{authData?.email}</p>
            </div>
          </Link>
          {/* Logout button for mobile */}
          <button
            onClick={openLogoutModal}
            className="btn btn-primary btn-sm mt-3 block md:hidden"
          >
            Logout
          </button>
        </>
      ) : (
        // Login button for unauthenticated users
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
