import Link from "next/link";
import { IoIosBook } from "react-icons/io";
import { RiFolderVideoFill } from "react-icons/ri";

const Breadcrumbs = ({
  username,
  course,
}: {
  username: string;
  course: string;
}) => {
  return (
    <>
      <div className="breadcrumbs text-lg mt-5">
        <ul className="flex items-center">
          <li>
            <Link
              href={`/profile/${username}/my-courses`}
              className="flex items-center gap-2"
            >
              <IoIosBook size={20} className="relative top-[1px]" /> My Courses
            </Link>
          </li>
          <li>
            <span className="flex items-center gap-2">
              <RiFolderVideoFill />
              {course}
            </span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Breadcrumbs;
