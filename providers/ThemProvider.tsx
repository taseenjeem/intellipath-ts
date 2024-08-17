"use client";
import { FC, ReactNode, useEffect, useState } from "react";
import { ThemeContext } from "../context";
import LoadingScreen from "@/components/global/Loadings/LoadingScreen";

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState("sunset");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedTheme = localStorage.getItem("theme") || "sunset";
    setTheme(storedTheme);
  }, []);

  if (!isMounted) {
    return <LoadingScreen />;
  }

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      <div data-theme={theme}>{children}</div>
    </ThemeContext.Provider>
  );
};
