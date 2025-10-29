(() => {
  const cookies = document.cookie.split(";");
  let theme;

  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name.trim() === "theme") {
      const trimmedValue = value.trim();
      if (trimmedValue === "dark" || trimmedValue === "light") {
        theme = trimmedValue;
      }
      break;
    }
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = theme === "dark" || (theme === undefined && prefersDark);

  if (isDark) {
    document.documentElement.classList.add("dark");
  }
})();
