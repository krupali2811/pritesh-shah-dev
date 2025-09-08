import { createContext, useState, useEffect, useRef } from "react";

import { useRouter } from "../routes/hooks/use-router";

// Create Theme Context
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const savedTheme = localStorage.getItem("theme") || "dark";
  const savedRiseFallColor = JSON.parse(localStorage.getItem("riseFallColor"));
  const savedTradingInterface =
    localStorage.getItem("tradingInterface") || "standard";
  const [theme, setTheme] = useState(savedTheme);
  const [riseFallColor, setRiseFallColor] = useState(savedRiseFallColor);
  const [tradingInterface, setTradingInterface] = useState(
    savedTradingInterface
  );

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

  useEffect(() => {
    if (riseFallColor) {
      localStorage.setItem("riseFallColor", JSON.stringify(riseFallColor));
    } else {
      localStorage.setItem(
        "riseFallColor",
        JSON.stringify({
          title: "Green_Up",
          up: "#12b76a",
          down: "#FF4761",
          candleUp: "#2B6B2B",
          candleDown: "#dc3545",
        })
      );
      setRiseFallColor({
        title: "Green_Up",
        up: "#12b76a",
        down: "#FF4761",
        candleUp: "#2B6B2B",
        candleDown: "#dc3545",
      });
    }
  }, [riseFallColor]);

  useEffect(() => {
    if (tradingInterface) {
      localStorage.setItem("tradingInterface", tradingInterface);
    } else {
      localStorage.setItem("tradingInterface", "standard");
    }
  }, [tradingInterface]);

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
        riseFallColor,
        setRiseFallColor,
        tradingInterface,
        setTradingInterface,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
