export const toggleTheme = (): void => {
  const isDark = localStorage.theme === "dark";
  localStorage.theme = isDark ? "light" : "dark";
  applyTheme();
};

export const applyTheme = (): void => {
  document.documentElement.classList.toggle(
    "dark",
    localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches),
  );
};
