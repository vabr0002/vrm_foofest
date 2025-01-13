"use client";

import { getCurrentTheme } from "@/utils/themeSwitcher";

const ThemedCard = ({ children, className }) => {
  const theme = getCurrentTheme();

  const themedBackground =
    theme === "dark" ? "bg-white text-black" : "bg-black text-white";
  theme === "light" ? "bg-dark text-white" : "bg-black text-white";

  return (
    <div
      className={`${themedBackground} ${className} rounded-xl transition duration-300`}
    >
      {children}
    </div>
  );
};

export default ThemedCard;
