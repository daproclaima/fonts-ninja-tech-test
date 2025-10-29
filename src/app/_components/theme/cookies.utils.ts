export const getThemeCookie = (): string | undefined => {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name.trim() === "theme") {
      return value.trim();
    }
  }
  return undefined;
};

export const setThemeCookie = (theme: string): void => {
  document.cookie = `theme=${theme}; path=/; Secure; SameSite=Strict`;
};
