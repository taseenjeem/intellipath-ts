"use client";
import { useContext } from "react";
import darkLogo from "/public/assets/logo/IntelliPath-dark-mode-logo.png";
import lightLogo from "/public/assets/logo/IntelliPath-light-mode-logo.png";
import Image from "next/image";
import { ThemeContext } from "../../../../context";

interface LogoProps {
  navbarMode?: boolean;
  formMode?: boolean;
  footerMode?: boolean;
}

const Logo = ({ navbarMode, formMode, footerMode }: LogoProps) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Image
      priority
      className={
        navbarMode
          ? "max-w-32"
          : formMode
          ? "max-w-48 mx-auto"
          : footerMode
          ? "max-w-48"
          : undefined
      }
      src={theme === "winter" ? lightLogo : darkLogo}
      alt="IntelliPath Logo"
    />
  );
};

export default Logo;
