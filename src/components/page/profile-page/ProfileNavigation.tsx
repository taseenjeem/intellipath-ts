"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ImProfile } from "react-icons/im";
import { IoIosBook, IoMdSettings } from "react-icons/io";

const ProfileNavigation = ({ username }: { username: string }) => {
  const pathName = usePathname(); // Getting the current pathname

  return (
    <ul className="max-w-md bg-base-200 p-3 rounded-box flex flex-col md:flex-row items-center justify-between">
      {/* Navigation item for My Courses */}
      <li className="w-full md:w-auto">
        <Link
          href={`/profile/${username}/my-courses`} // Link to user's courses
          className={`${
            pathName === `/profile/${username}/my-courses` ||
            pathName.includes("/my-courses")
              ? "bg-primary text-base-100"
              : ""
          } flex items-center p-2 rounded-xl gap-2`} // Conditional styling
        >
          <IoIosBook size={24} /> {/* Courses icon */}
          My Courses
        </Link>
      </li>

      {/* Navigation item for My Information */}
      <li className="w-full md:w-auto">
        <Link
          href={`/profile/${username}`} // Link to the user's profile
          className={`${
            pathName === `/profile/${username}`
              ? "bg-primary text-base-100"
              : ""
          } flex items-center p-2 rounded-xl gap-2`} // Conditional styling
        >
          <ImProfile size={24} /> {/* Profile icon */}
          My Information
        </Link>
      </li>

      {/* Navigation item for Settings */}
      <li className="w-full md:w-auto">
        <Link
          href={`/profile/${username}/settings`} // Link to user settings
          className={`${
            pathName === `/profile/${username}/settings`
              ? "bg-primary text-base-100"
              : ""
          } flex items-center p-2 rounded-xl gap-2`} // Conditional styling
        >
          <IoMdSettings size={24} /> {/* Settings icon */}
          Settings
        </Link>
      </li>
    </ul>
  );
};

export default ProfileNavigation;
