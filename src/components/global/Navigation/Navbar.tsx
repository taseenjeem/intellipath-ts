import Link from "next/link";
import ActiveLink from "./ActiveLink";
import ThemeController from "./ThemeController";
import UserActionBtns from "./UserActionBtns";
import CloseBtn from "./CloseBtn";
import Logo from "../ui/Logo";
import Search from "./Search";

const Navbar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="drawer drawer-end">
      <input id="menu-contents" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full bg-base-300 bg-opacity-75 backdrop-blur-xl sticky top-0 z-50">
          <div className="w-full navbar container z-50">
            <div className="flex-1 px-2 mx-2 lg:flex">
              <Link
                href={`/`}
                className="text-xl font-semibold btn btn-ghost tracking-widest text-primary px-1"
              >
                <Logo navbarMode={true} />
              </Link>
            </div>
            <div className="flex-none lg:hidden">
              <label
                htmlFor="menu-contents"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="flex-none hidden items-center lg:block">
              <ul className="flex items-center gap-4 justify-center text-primary">
                {/* Navbar menu content here */}
                <li className="w-96 hidden md:block">
                  <Search />
                </li>
                <li>
                  <ActiveLink href={`/courses`}>Our Courses</ActiveLink>
                </li>
                <li>
                  <ActiveLink href={`/blogs`}>Blogs</ActiveLink>
                </li>
                <li>
                  <UserActionBtns />
                </li>
                <li>
                  <ThemeController />
                </li>
              </ul>
            </div>
          </div>
        </div>
        {children}
      </div>
      <div className="drawer-side z-50">
        <label
          htmlFor="menu-contents"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200">
          <CloseBtn />
          {/* Sidebar content here */}
          <li>
            <ActiveLink isSmallDevice={true} href={`/courses`}>
              Our Courses
            </ActiveLink>
          </li>
          <li>
            <ActiveLink isSmallDevice={true} href={`/blogs`}>
              Blogs
            </ActiveLink>
          </li>
          <li>
            <ThemeController />
          </li>
          <li>
            <UserActionBtns isSmallDevice={true} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
