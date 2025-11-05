// components/menuItem/MenuItemCard.jsx
"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  updateQty,
  removeItem,
  selectQtyById,
} from "@/store/slices/cartSlice";
import styles from "./menu.module.css";

export default function MenuItemCard({ id, title, desc, price, image }) {
  const dispatch = useDispatch();
  const qtyInCartRaw = useSelector(selectQtyById(id));
  const qtyInCart = qtyInCartRaw ?? 0; // ✅ evita undefined

  const handleAdd = () => {
    dispatch(addItem({ id, name: title, price, image, qty: 1 }));
  };

  const handleIncrease = () => {
    dispatch(updateQty({ id, qty: qtyInCart + 1 }));
  };

  const handleDecrease = () => {
    if (qtyInCart <= 1) {
      dispatch(removeItem(id));
    } else {
      dispatch(updateQty({ id, qty: qtyInCart - 1 }));
    }
  };

  return (
    <div className={styles.card}>
      <div
        className={styles.thumb}
        style={{ backgroundImage: `url("${image}")` }}
        aria-label={title}
      />
      <div className={styles.body}>
        <p className={styles.name}>{title}</p>
        <p className={styles.desc}>{desc}</p>
        <p className={styles.price}>${Number(price).toFixed(2)}</p>
      </div>

      <div className={styles.row}>
        <div className={styles.qty}>
          <button
            className={styles.minus}
            aria-label="Decrease"
            onClick={handleDecrease}
            disabled={qtyInCart === 0}
          >
            -
          </button>

          <span className={styles.count}>{qtyInCart}</span>

          <button
            className={styles.plus}
            aria-label="Increase"
            onClick={handleIncrease}
          >
            +
          </button>
        </div>

        <button
          className="btn btn-primary"
          style={{ height: 40 }}
          onClick={handleAdd}
        >
          Agregar
        </button>
      </div>
    </div>
  );
}
