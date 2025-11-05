"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCount } from "@/store/slices/cartSlice";
import { toggleCart } from "@/store/slices/uiSlice";
import styles from "./cartbutton.module.css";

export default function CartButton() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const prev = useRef(count);
  const [isMobile, setIsMobile] = useState(false);

  // Detecta viewport < 768px (móvil) y escucha cambios
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener?.("change", update);
    return () => mql.removeEventListener?.("change", update);
  }, []);

  // Mini anim cuando cambia el conteo
  useEffect(() => {
    if (count !== prev.current) prev.current = count;
  }, [count]);

  // 💡 Cambia > 1 por >= 1 si deseas FAB con 1+
  const fabActive = isMobile && count >= 1;

  const classNames = [
    "btn",
    styles.cartBtn,
    fabActive ? styles.fab : "",
    fabActive ? styles.pop : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={classNames}
      onClick={() => dispatch(toggleCart())}
      aria-label={`Abrir carrito (${count})`}
      title="Abrir carrito"
      type="button"
    >
      <span className={styles.icon} aria-hidden="true">
        🛒
      </span>
      <span className={styles.label}>Carrito</span>
      <span className={styles.count} aria-live="polite">
        {count}
      </span>
    </button>
  );
}
