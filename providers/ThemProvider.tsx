"use client";
import { useEffect, useState } from "react";
import { ThemeContext } from "../context";
import LoadingScreen from "@/src/components/global/Loadings/LoadingScreen";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<string>("sunset");
  const [isMounted, setIsMounted] = useState<boolean>(false);

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
