import Link from "next/link";
import ActiveLink from "./ActiveLink";
import ThemeController from "./ThemeController";
import UserActionBtns from "./UserActionBtns";
import CloseBtn from "./CloseBtn";
import Logo from "../ui/Logo";

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
              <ul className="flex items-center justify-center text-primary">
                {/* Navbar menu content here */}
                <li>
                  <ActiveLink href={`/features`}>Features</ActiveLink>
                </li>
                <li>
                  <ActiveLink href={`#`}>Pricing</ActiveLink>
                </li>
                <li>
                  <ActiveLink href={`/contact-us`}>Blogs</ActiveLink>
                </li>
                <li>
                  <ActiveLink href={`#`}>Documentation</ActiveLink>
                </li>
                <li>
                  <ActiveLink href={`#`}>Contact Us</ActiveLink>
                </li>
                <li>
                  <ActiveLink href={`#`}>Support Section</ActiveLink>
                </li>
                <li>
                  <ActiveLink href={`#`}>Our Community</ActiveLink>
                </li>
                <li className="mx-5">
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
            <ActiveLink isSmallDevice={true} href={`/features`}>
              Features
            </ActiveLink>
          </li>
          <li>
            <ActiveLink isSmallDevice={true} href={`#`}>
              Pricing
            </ActiveLink>
          </li>
          <li>
            <ActiveLink isSmallDevice={true} href={`/contact-us`}>
              Blogs
            </ActiveLink>
          </li>
          <li>
            <ActiveLink isSmallDevice={true} href={`#`}>
              Documentation
            </ActiveLink>
          </li>
          <li>
            <ActiveLink isSmallDevice={true} href={`#`}>
              Contact Us
            </ActiveLink>
          </li>
          <li>
            <ActiveLink isSmallDevice={true} href={`#`}>
              Support Section
            </ActiveLink>
          </li>
          <li>
            <ActiveLink isSmallDevice={true} href={`#`}>
              Our Community
            </ActiveLink>
          </li>
          <li>
            <UserActionBtns isSmallDevice={true} />
          </li>
          <li>
            <ThemeController />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
