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

  // If the component has not yet mounted, display the loading screen
  if (!isMounted) {
    return <LoadingScreen />; // Return loading screen until mounted
  }

  // Function to change the current theme
  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Providing the theme context value to children components
  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      <div data-theme={theme}>{children}</div>
    </ThemeContext.Provider>
  );
};
