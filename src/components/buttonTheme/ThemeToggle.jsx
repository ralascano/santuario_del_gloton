// components/ThemeToggle.jsx
"use client";

import { useEffect, useState } from "react";
import { getAppliedTheme, setTheme } from "./helpers";

const labels = {
  system: "Sistema",
  light: "Claro",
  dark: "Oscuro",
};

export default function ThemeToggle() {
  const [choice, setChoice] = useState("system");

  useEffect(() => {
    setChoice(getAppliedTheme());

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (getAppliedTheme() === "system") {
        setTheme("system"); // refresca meta color-scheme
      }
    };
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  const cycle = () => {
    const next =
      choice === "system" ? "light" : choice === "light" ? "dark" : "system";
    setChoice(next);
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={cycle}
      className="btn"
      aria-label={`Cambiar tema (actual: ${labels[choice]})`}
      title={`Tema: ${labels[choice]} — clic para cambiar`}
    >
      <span aria-hidden="true">
        {choice === "dark" ? "🌙" : choice === "light" ? "☀️" : "🖥️"}
      </span>
      <span>{labels[choice]}</span>
    </button>
  );
}
