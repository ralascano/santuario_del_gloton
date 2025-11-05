"use client";
import { createPortal } from "react-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./modalCart.module.css";
import { useDispatch } from "react-redux";
import { clear } from "@/store/slices/cartSlice";

const WHATSAPP_PHONE = "593984849691"; // 0984849691 sin el 0 y con +593

function formatMoney(n) {
  const num = Number(n) || 0;
  return `$${num.toFixed(2)}`;
}

function buildWhatsappText(payload) {
  const {
    customer: { name, phone, address },
    deliveryMethod,
    paymentMethod,
    notes,
    items,
    total,
  } = payload;

  const lines = [];
  lines.push(
    "¡Hola! Quiero hacer un pedido desde la web *El Santuario del Glotón*."
  );
  lines.push("");

  lines.push("*Pedido:*");
  items.forEach((it) => {
    const qty = Number(it.qty || 0);
    const unit = formatMoney(it.price);
    const lineTotal = formatMoney(qty * Number(it.price || 0));
    lines.push(`- ${qty} × ${it.name} — ${unit} c/u = ${lineTotal}`);
  });

  lines.push("");
  lines.push(`*Total a pagar:* ${formatMoney(total)}`);
  lines.push("");

  lines.push("*Datos del cliente*");
  if (name) lines.push(`Nombre: ${name}`);
  if (phone) lines.push(`Teléfono: ${phone}`);
  lines.push(
    `Entrega: ${deliveryMethod === "delivery" ? "Delivery" : "Retiro en local"}`
  );
  if (deliveryMethod === "delivery" && address)
    lines.push(`Dirección: ${address}`);
  lines.push(`Pago: ${paymentMethod === "cash" ? "Efectivo" : "Tarjeta"}`);
  if (notes) {
    lines.push("");
    lines.push("Notas:");
    lines.push(notes);
  }

  lines.push("");
  lines.push("Gracias 🙌");

  return lines.join("\n");
}

/**
 * Props:
 * - open: boolean
 * - onClose: () => void
 * - items: [{ id, name, price, qty, image }]
 * - onUpdateQty?: (id, qty) => void
 * - onRemoveItem?: (id) => void
 * - onConfirm?: (payload) => void
 */
export default function ModalCart({
  open,
  onClose,
  items = [],
  onUpdateQty,
  onRemoveItem,
  onConfirm,
}) {
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("delivery"); // "pickup" | "delivery"
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card"); // "cash" | "card"
  const [notes, setNotes] = useState("");

  // Errores / submit intent
  const [attempted, setAttempted] = useState(false);
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);

  useEffect(() => setMounted(true), []);

  // Cerrar con ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const total = useMemo(
    () =>
      items.reduce(
        (acc, it) => acc + (Number(it.price) || 0) * (Number(it.qty) || 0),
        0
      ),
    [items]
  );

  // Validación simple (requeridos excepto notas)
  const isPhoneValid = (v) => (v || "").trim().length >= 7; // básico, puedes mejorar regex local
  const isNameValid = (v) => (v || "").trim().length >= 2;
  const isAddressRequired = deliveryMethod === "delivery";
  const isAddressValid = (v) =>
    !isAddressRequired || (v || "").trim().length >= 4;
  const isPaymentValid = paymentMethod === "cash" || paymentMethod === "card";
  const isDeliveryValid =
    deliveryMethod === "pickup" || deliveryMethod === "delivery";

  const isFormValid =
    isNameValid(name) &&
    isPhoneValid(phone) &&
    isDeliveryValid &&
    isAddressValid(address) &&
    isPaymentValid;

  const focusFirstInvalid = () => {
    if (!isNameValid(name)) {
      nameRef.current?.focus();
      return;
    }
    if (!isPhoneValid(phone)) {
      phoneRef.current?.focus();
      return;
    }
    if (isAddressRequired && !isAddressValid(address)) {
      addressRef.current?.focus();
    }
  };

  const resetForm = () => {
    setName("");
    setPhone("");
    setDeliveryMethod("delivery");
    setAddress("");
    setPaymentMethod("card");
    setNotes("");
    setAttempted(false);
  };

  const handleConfirm = () => {
    if (items.length === 0) return;
    setAttempted(true);

    if (!isFormValid) {
      focusFirstInvalid();
      return;
    }

    const payload = {
      customer: {
        name,
        phone,
        address: deliveryMethod === "delivery" ? address : "",
      },
      deliveryMethod,
      paymentMethod,
      notes,
      items: items.map((i) => ({
        id: i.id,
        name: i.name,
        price: Number(i.price) || 0,
        qty: Number(i.qty) || 1,
      })),
      total,
    };

    onConfirm?.(payload);

    const text = buildWhatsappText(payload);
    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
      text
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");

    dispatch(clear());
    resetForm();
    onClose?.();
  };

  if (!mounted) return null;

  return createPortal(
    <>
      {open && <div className={styles.backdrop} onClick={onClose} />}

      <div
        className={`${styles.drawer} ${open ? styles.open : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className={styles.header}>
          <h1 id="modal-title" className={styles.title}>
            Tu pedido
          </h1>
          <button
            aria-label="Cerrar"
            onClick={onClose}
            className={styles.closeBtn}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          {/* Resumen */}
          <div className={styles.list}>
            {items.length === 0 && (
              <div className={styles.empty}>Tu carrito está vacío.</div>
            )}

            {items.map((it) => (
              <div key={it.id} className={styles.item}>
                <div className={styles.itemInfo}>
                  <div
                    className={styles.thumb}
                    style={{ backgroundImage: `url("${it.image}")` }}
                    aria-label={it.name}
                  />
                  <div className={styles.meta}>
                    <p className={styles.name}>{it.name}</p>

                    <div className={styles.controls}>
                      <label
                        className={styles.qtyLabel}
                        htmlFor={`qty-${it.id}`}
                      >
                        Cant:
                      </label>
                      <input
                        id={`qty-${it.id}`}
                        type="number"
                        min={1}
                        value={it.qty}
                        onChange={(e) =>
                          onUpdateQty?.(it.id, Number(e.target.value))
                        }
                        className={styles.qtyInput}
                        required
                      />
                      {onRemoveItem && (
                        <button
                          type="button"
                          onClick={() => onRemoveItem(it.id)}
                          className={styles.removeBtn}
                        >
                          Quitar
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className={styles.price}>{formatMoney(it.price)}</div>
              </div>
            ))}
          </div>

          <hr className={styles.hr} />

          {/* Formulario Entrega & Pago */}
          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <h2 className={styles.sectionTitle}>Entrega y pago</h2>

            <div className={styles.field}>
              <label htmlFor="name" className={styles.label}>
                Nombre
              </label>
              <input
                id="name"
                name="name"
                placeholder="Nombre y apellido"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`${styles.input} ${
                  attempted && !isNameValid(name) ? styles.invalid : ""
                }`}
                required
                ref={nameRef}
              />
              {attempted && !isNameValid(name) && (
                <small className={styles.errorMsg}>
                  Ingresa tu nombre (mín. 2 caracteres).
                </small>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="phone" className={styles.label}>
                Teléfono
              </label>
              <input
                id="phone"
                name="phone"
                placeholder="099 123 4567"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`${styles.input} ${
                  attempted && !isPhoneValid(phone) ? styles.invalid : ""
                }`}
                required
                ref={phoneRef}
              />
              {attempted && !isPhoneValid(phone) && (
                <small className={styles.errorMsg}>
                  Ingresa un teléfono válido.
                </small>
              )}
            </div>

            <div className={styles.field}>
              <p className={styles.label}>Método de entrega</p>
              <div
                className={styles.radioRow}
                role="radiogroup"
                aria-label="Método de entrega"
              >
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="pickup"
                    checked={deliveryMethod === "pickup"}
                    onChange={() => setDeliveryMethod("pickup")}
                    required
                  />
                  <span>Retiro en local</span>
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="delivery"
                    checked={deliveryMethod === "delivery"}
                    onChange={() => setDeliveryMethod("delivery")}
                    required
                  />
                  <span>Delivery</span>
                </label>
              </div>
            </div>

            {deliveryMethod === "delivery" && (
              <div className={styles.field}>
                <label htmlFor="address" className={styles.label}>
                  Dirección
                </label>
                <input
                  id="address"
                  name="address"
                  placeholder="González Suárez, Quito"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={`${styles.input} ${
                    attempted && !isAddressValid(address) ? styles.invalid : ""
                  }`}
                  required
                  ref={addressRef}
                />
                {attempted && !isAddressValid(address) && (
                  <small className={styles.errorMsg}>
                    Ingresa la dirección para delivery.
                  </small>
                )}
              </div>
            )}

            <div className={styles.field}>
              <p className={styles.label}>Método de pago</p>
              <div
                className={styles.radioRow}
                role="radiogroup"
                aria-label="Método de pago"
              >
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={() => setPaymentMethod("cash")}
                    required
                  />
                  <span>Efectivo</span>
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                    required
                  />
                  <span>Tarjeta</span>
                </label>
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="notes" className={styles.label}>
                Notas adicionales
              </label>
              <textarea
                id="notes"
                name="notes"
                rows="3"
                placeholder="Ej.: sin cebolla, por favor."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className={`${styles.input} ${styles.textarea}`}
              />
              {/* Notas NO es obligatorio */}
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className={styles.footerRow}>
          <div className={styles.totalRow}>
            <span>Total:</span>
            <strong className={styles.totalPrice}>{formatMoney(total)}</strong>
          </div>
          <button
            className={styles.confirmBtn}
            onClick={handleConfirm}
            disabled={items.length === 0 || !isFormValid}
            title={
              items.length === 0
                ? "Tu carrito está vacío"
                : !isFormValid
                ? "Completa los campos requeridos"
                : "Enviar por WhatsApp"
            }
          >
            Confirmar pedido
          </button>
        </div>
      </div>
    </>,
    document.body
  );
}
