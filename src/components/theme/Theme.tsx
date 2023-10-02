import { getTheme, setTheme } from "@/utils/theme";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { BsMoon } from "react-icons/bs";
import { BsFillSunFill } from "react-icons/bs";
import ThemeStyles from "./theme.module.css";
import { ThemeContext } from "@/context/themeContext";

export const Theme = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme} className="btn-blank ">
      {theme == "light" ? (
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
