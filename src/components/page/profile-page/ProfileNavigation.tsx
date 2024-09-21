"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ImProfile } from "react-icons/im";
import { IoIosBook, IoMdSettings } from "react-icons/io";

const ProfileNavigation = ({ username }: { username: string }) => {
  const pathName = usePathname();

  return (
    <>
      <ul className="menu bg-base-200 lg:menu-horizontal rounded-box">
        <li>
          <Link
            href={`/profile/${username}`}
            className={
              pathName === `/profile/${username}`
                ? "bg-primary text-base-100"
                : ""
            }
          >
            <ImProfile size={24} />
            My Information
          </Link>
        </li>
        <li>
          <Link
            href={`/profile/${username}/my-courses`}
            className={
              pathName === `/profile/${username}/my-courses`
                ? "bg-primary text-base-100"
                : ""
            }
          >
            <IoIosBook size={24} />
            My Courses
          </Link>
        </li>
        <li>
          <Link
            href={`/profile/${username}/settings`}
            className={
              pathName === `/profile/${username}/settings`
                ? "bg-primary text-base-100"
                : ""
            }
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
