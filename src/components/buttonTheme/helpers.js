// components/theme.js
export function getAppliedTheme() {
  const root = document.documentElement;
  const attr = root.getAttribute("data-theme"); // 'dark' | 'light' | null
  if (attr === "dark") return "dark";
  if (attr === "light") return "light";
  return "system";
}

export function setTheme(choice) {
  const root = document.documentElement;

  if (choice === "dark") {
    root.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else if (choice === "light") {
    root.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  } else {
    root.removeAttribute("data-theme");
    localStorage.removeItem("theme");
  }

  const meta = document.querySelector('meta[name="color-scheme"]');
  if (meta) {
    const isDark =
      root.getAttribute("data-theme") === "dark" ||
      (!root.hasAttribute("data-theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    meta.setAttribute("content", isDark ? "dark light" : "light dark");
  }
}
