import { createContext } from "react";

interface ThemeContextType {
  theme: string;
  changeTheme: (newTheme: string) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "sunset",
  changeTheme: () => {},
});
