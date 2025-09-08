import useTheme from "../../hooks/useTheme";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className="btn btn-link p-0 btn-themeToggle" onClick={toggleTheme}>
      <img
        src={`/assets/images/${theme === "light" ? "dark" : "light"}Mode.svg`}
        alt={`${theme === "light" ? "dark" : "light"} Mode`}
      />
    </button>
  );
};

export default ThemeToggle;
