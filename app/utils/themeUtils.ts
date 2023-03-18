export const THEME_TYPES = {
  THEME_DARK: "dark",
  THEME_LIGHT: "light",
};

export const applyThemePreference = (theme: any) => {
  const { THEME_DARK, THEME_LIGHT } = THEME_TYPES;
  const root = window.document.documentElement;
  const isDark = theme === THEME_DARK;
  root.classList.remove(isDark ? THEME_LIGHT : THEME_DARK);
  root.classList.add(theme);
};
