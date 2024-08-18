import Link from "next/link";
import Logo from "../ui/Logo";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <section className="bg-base-200 mt-7 md:mt-28">
      <div className="container bg-base-200">
        <footer className="footer md:p-10 py-5 bg-base-200 text-base-content">
          <nav>
            <h6 className="footer-title">Services</h6>
            <a className="link link-hover">Branding</a>
            <a className="link link-hover">Design</a>
            <a className="link link-hover">Marketing</a>
            <a className="link link-hover">Advertisement</a>
          </nav>
          <nav>
            <h6 className="footer-title">Company</h6>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
          </nav>
          <nav>
            <h6 className="footer-title">Legal</h6>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
          </nav>
        </footer>
        <footer className="footer md:px-10 py-4 border-t bg-base-200 text-base-content border-base-300">
          <aside className="items-center grid-flow-col">
            <div>
              <Logo footerMode={true} />
              <p className="mt-5">
                IntelliPath Education Academy. <br />
                Making the world to reach their goals since 1992
              </p>
            </div>
          </aside>
          <nav className="md:place-self-center md:justify-self-end">
            <div className="flex md:justify-end w-full">
              <p className="text-lg md:mb-5 mb-3 font-semibold">
                Always stay updated with us
              </p>
            </div>
            <div className="grid grid-flow-col gap-4">
              <Link href={`#`}>
                <FaFacebook className="size-7" />
              </Link>
              <Link href={`#`}>
                <FaInstagram className="size-7" />
              </Link>
              <Link href={`#`}>
                <FaLinkedin className="size-7" />
              </Link>
              <Link href={`#`}>
                <FaYoutube className="size-7" />
              </Link>
              <Link href={`#`}>
                <FaXTwitter className="size-7" />
              </Link>
              <Link href={`#`}>
                <FaPinterest className="size-7" />
              </Link>
              <Link href={`#`}>
                <FaTiktok className="size-7" />
              </Link>
            </div>
          </nav>
        </footer>
      </div>
    </section>
  );
};

export default Footer;
