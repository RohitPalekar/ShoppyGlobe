// Redux store configuration
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import productFilterReducer from "./slices/productFilterSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    productFilter: productFilterReducer,
  },
});