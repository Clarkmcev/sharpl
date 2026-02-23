import { useState } from "react";

const STORAGE_KEY = "sidebarOpen";

export function useSidebarOpen(): [boolean, (value: boolean) => void] {
  const [sidebarOpen, setSidebarOpenState] = useState<boolean>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === null ? true : stored === "true";
  });

  const setSidebarOpen = (value: boolean) => {
    localStorage.setItem(STORAGE_KEY, String(value));
    setSidebarOpenState(value);
  };

  return [sidebarOpen, setSidebarOpen];
}
