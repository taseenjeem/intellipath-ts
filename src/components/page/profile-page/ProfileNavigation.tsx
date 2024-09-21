"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ImProfile } from "react-icons/im";
import { IoIosBook, IoMdSettings } from "react-icons/io";

const ProfileNavigation = ({ username }: { username: string }) => {
  const pathName = usePathname();

  return (
    <>
      <ul className="max-w-md bg-base-200 p-3 rounded-box flex flex-col md:flex-row items-center justify-between">
        <li className="w-full md:w-auto">
          <Link
            href={`/profile/${username}`}
            className={`${
              pathName === `/profile/${username}`
                ? "bg-primary text-base-100"
                : ""
            } flex items-center p-2 rounded-xl gap-2`}
          >
            <ImProfile size={24} />
            My Information
          </Link>
        </li>
        <li className="w-full md:w-auto">
          <Link
            href={`/profile/${username}/my-courses`}
            className={`${
              pathName === `/profile/${username}/my-courses`
                ? "bg-primary text-base-100"
                : ""
            } flex items-center p-2 rounded-xl gap-2`}
          >
            <IoIosBook size={24} />
            My Courses
          </Link>
        </li>
        <li className="w-full md:w-auto">
          <Link
            href={`/profile/${username}/settings`}
            className={`${
              pathName === `/profile/${username}/settings`
                ? "bg-primary text-base-100"
                : ""
            } flex items-center p-2 rounded-xl gap-2`}
          >
            <IoMdSettings size={24} />
            Settings
          </Link>
        </li>
      </ul>
    </>
  );
};

export default ProfileNavigation;
