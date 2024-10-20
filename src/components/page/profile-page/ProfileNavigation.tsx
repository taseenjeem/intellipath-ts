"use client";
import { useAppSelector } from "@/redux/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ImProfile } from "react-icons/im";
import { IoIosBook, IoMdSettings } from "react-icons/io";
import { MdQueryStats } from "react-icons/md";

const ProfileNavigation = () => {
  const pathName = usePathname();
  const { role, username } = useAppSelector((state) => state.userInfo);

  return (
    <div className="md:inline-block">
      <ul className="bg-base-200 p-3 rounded-box flex flex-col md:flex-row items-center justify-between space-x-0 md:space-x-3 space-y-3 md:space-y-0">
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
              pathName === `/profile/${username}/my-courses` ||
              pathName.includes("/my-courses")
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

        {role === "instructor" && (
          <li className="w-full md:w-auto">
            <Link
              href={`/profile/${username}/stats`}
              className={`${
                pathName === `/profile/${username}/stats`
                  ? "bg-primary text-base-100"
                  : ""
              } flex items-center p-2 rounded-xl gap-2`}
            >
              <MdQueryStats size={24} />
              Your Stats
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default ProfileNavigation;
