import { createContext, useState, useEffect, useRef } from "react";

import { useRouter } from "../routes/hooks/use-router";

// Create Theme Context
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const savedTheme = localStorage.getItem("theme") || "dark";
  const [theme, setTheme] = useState(savedTheme);

  const router = useRouter();
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(141);

  useEffect(() => {
    const updateHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    const timeoutId = setTimeout(updateHeight, 0);

    window.addEventListener("resize", updateHeight);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", updateHeight);
    };
  }, [router?.pathname]);

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);



  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        headerHeight,
        setHeaderHeight,
        headerRef,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
