"use client";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage
import cartReducer from "./slices/cartSlice";
import uiReducer from "./slices/uiSlice";
// import authReducer from "./slices/authSlice" // para futuro

const rootReducer = combineReducers({
  cart: cartReducer,
  ui: uiReducer,
  // auth: authReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"], // 🔐 persistimos solo el carrito (UI no hace falta)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // necesario para redux-persist
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
