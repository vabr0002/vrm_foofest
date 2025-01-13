import { FaMoon, FaSun } from "react-icons/fa";
import { useEffect, useState } from "react";
import { applyTheme, toggleTheme } from "@/utils/themeSwitcher";

const ThemeSwitcher = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Funktion til at opdatere tema baseret på systemindstillinger
    const updateThemeBasedOnSystem = (e) => {
      const systemPrefersDark = e.matches;
      setIsDarkMode(systemPrefersDark);
      applyTheme(systemPrefersDark ? "dark" : "light");
    };

    // Match systemets foretrukne farvetema
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // Opdater tema ved komponent-mount
    updateThemeBasedOnSystem(mediaQuery);

    // Lyt til ændringer i systemets præference
    mediaQuery.addEventListener("change", updateThemeBasedOnSystem);

    // Cleanup event listener
    return () => {
      mediaQuery.removeEventListener("change", updateThemeBasedOnSystem);
    };
  }, []);

  const handleToggle = () => {
    toggleTheme(); // Skift tema manuelt
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button
      id="theme-toggle-btn"
      onClick={handleToggle}
      className="transition duration-300 hover:text-primary"
    >
      {isDarkMode ? <FaSun /> : <FaMoon />}
    </button>
  );
};

export default ThemeSwitcher;
