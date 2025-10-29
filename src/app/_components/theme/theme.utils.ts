import { getThemeCookie, setThemeCookie } from "./cookies.utils";

export const toggleTheme = (): void => {
  const isDark = getThemeCookie() === "dark";
  setThemeCookie(isDark ? "light" : "dark");
  applyTheme();
};

export const applyTheme = (): void => {
  const theme = getThemeCookie();
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const shouldBeDark = theme === "dark" || (theme === undefined && prefersDark);

  document.documentElement.classList.toggle("dark", shouldBeDark);
};
