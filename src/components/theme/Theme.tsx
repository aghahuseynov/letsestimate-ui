import { getTheme, setTheme } from "@/utils/theme";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { BsMoon } from "react-icons/bs";
import { BsFillSunFill } from "react-icons/bs";
import ThemeStyles from "./theme.module.css";

export type ThemeType = "dark" | "light";

export const Theme = () => {
  const [themeIcon, setThemeIcon] = useState(getTheme());

  useEffect(() => {
    let theme = getTheme();

    document?.querySelector("html")?.setAttribute("data-theme", theme);
  }, []);

  const toggleTheme = () => {
    let theme = getTheme();

    theme = theme == "dark" ? "light" : "dark";

    setThemeIcon(theme);

    setTheme(theme as ThemeType);

    document?.querySelector("html")?.setAttribute("data-theme", theme);
  };

  return (
    <button onClick={toggleTheme} className="btn-blank ">
      {themeIcon == "light" ? (
        <div className={ThemeStyles.themeIcon}>
          <BsMoon />
        </div>
      ) : (
        <div className={ThemeStyles.themeIcon}>
          <BsFillSunFill />
        </div>
      )}
    </button>
  );
};
