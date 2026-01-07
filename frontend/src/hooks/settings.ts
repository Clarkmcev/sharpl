import { useEffect } from "react";
import { useAppSelector } from "../store/hooks";

// Custom hooks
export const useSetTheme = () => {
  const themeMode = useAppSelector((state) => state.theme.mode);

  // Apply dark mode class to document root
  useEffect(() => {
    if (themeMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [themeMode]);
};
