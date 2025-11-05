"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "../buttonTheme/ThemeToggle";
import CartButton from "../modalCart/ButtoCart";
import styles from "./header.module.css";
import logo from "../../assets/logoSantuario.png";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);

  // Cerrar menú al pasar a desktop o al navegar
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768 && open) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open]);

  // Detectar "stuck" para aplicar sombra/blur cuando se hace scroll
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${stuck ? styles.stuck : ""}`}>
      <div className={`container ${styles.container}`}>
        <div className={styles.row}>
          {/* Marca */}
          <a href="/" className={styles.brand}>
            <div className={styles.logo}>
              <img src={logo.src} alt="El Santuario del Glotón" />
            </div>
            <h1 className={styles.title}>El Santuario del Gloton</h1>
          </a>

          {/* Links inline SOLO desktop */}
          <nav className={styles.linksInline} aria-label="Navegación">
            <a href="/menu">Menú</a>
            <a href="#reviews">Reviews</a>
            <a href="#contact">Contacto</a>
          </nav>

          {/* Acciones derechas */}
          <div className={styles.actions}>
            {/* Toggle menú SOLO móvil */}
            <button
              type="button"
              className={styles.menuToggle}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open ? "true" : "false"}
              aria-controls="primary-nav"
              onClick={() => setOpen((v) => !v)}
            >
              <span className={styles.burger} aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className={styles.menuLabel}>Menú</span>
            </button>

            <ThemeToggle />
            <CartButton />
          </div>
        </div>

        {/* Links colapsables SOLO móvil */}
        <nav
          id="primary-nav"
          className={`${styles.linksBlock} ${open ? styles.open : ""}`}
          aria-label="Navegación principal"
        >
          <div className={styles.linksInner}>
            <a href="/menu" onClick={() => setOpen(false)}>
              Menú
            </a>
            <a href="#reviews" onClick={() => setOpen(false)}>
              Reviews
            </a>
            <a href="#contact" onClick={() => setOpen(false)}>
              Contacto
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
