import { useEffect } from "react";
import { createContext, ReactNode, useState } from "react";

type ThemeType = "light" | "dark";
type ThemeContextType = {
  theme: ThemeType;
  toggleTheme: () => void;
};
type ThemeContextProviderProps = {
  children: ReactNode;
};

export const ThemeContext = createContext({} as ThemeContextType);

export function ThemeContextProvider(props: ThemeContextProviderProps) {
  const getCurrentTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [currentTheme, setCurrentTheme] = useState<ThemeType>(() => {
    const storagedTheme = localStorage.getItem("theme");
    const PreferenceTheme = (getCurrentTheme() ? "dark" : "light");
    return (storagedTheme ?? PreferenceTheme ?? "light") as ThemeType;
  });

  useEffect(() => {
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme])

  function toggleTheme() {
    setCurrentTheme(currentTheme === "light" ? "dark" : "light");
  }

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
