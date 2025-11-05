"use client";
import { useDispatch, useSelector } from "react-redux";
import ModalCart from "./ModalCart"; // <-- importa tu componente
import {
  selectItems,
  updateQty,
  removeItem,
  clear,
} from "@/store/slices/cartSlice";
import { closeCart } from "@/store/slices/uiSlice";

export default function CartDrawerContainer() {
  const dispatch = useDispatch();

  const items = useSelector(selectItems);
  const open = useSelector((s) => s.ui.cartOpen);

  const onConfirm = (payload) => {
    console.log("Pedido confirmado:", payload);
    // TODO: enviar a backend o WhatsApp
    dispatch(clear());
    dispatch(closeCart());
  };

  return (
    <ModalCart
      open={open}
      onClose={() => dispatch(closeCart())}
      items={items}
      onUpdateQty={(id, qty) => dispatch(updateQty({ id, qty }))}
      onRemoveItem={(id) => dispatch(removeItem(id))}
      onConfirm={onConfirm}
    />
  );
}
