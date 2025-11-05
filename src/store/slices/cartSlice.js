import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  items: [], // { id, name, price, qty, image }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const item = action.payload; // { id, name, price, qty?, image }
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        existing.qty += item.qty || 1;
      } else {
        state.items.push({ ...item, qty: item.qty || 1 });
      }
    },
    updateQty(state, action) {
      const { id, qty } = action.payload;
      const q = Math.max(1, Number(qty) || 1);
      const it = state.items.find((i) => i.id === id);
      if (it) it.qty = q;
    },
    removeItem(state, action) {
      const id = action.payload;
      state.items = state.items.filter((i) => i.id !== id);
    },
    clear(state) {
      state.items = [];
    },
  },
});

export const { addItem, updateQty, removeItem, clear } = cartSlice.actions;
export default cartSlice.reducer;

/* ===== Selectors ===== */
const selectCart = (state) => state.cart;
export const selectItems = createSelector([selectCart], (cart) => cart.items);

export const selectCount = createSelector([selectItems], (items) =>
  items.reduce((acc, i) => acc + (Number(i.qty) || 0), 0)
);

export const selectTotal = createSelector([selectItems], (items) =>
  items.reduce(
    (acc, i) => acc + (Number(i.price) || 0) * (Number(i.qty) || 0),
    0
  )
);

// Devuelve la CANTIDAD en carrito para un producto por id
export const selectQtyById = (id) => (state) => {
  const it = state.cart.items.find((i) => i.id === id);
  return it ? Number(it.qty) || 0 : 0;
};

// (Opcional) Devuelve el item completo por id
export const selectItemById = (id) => (state) =>
  state.cart.items.find((i) => i.id === id) || null;
