// Redux slice for cart functionality
import { createSlice } from "@reduxjs/toolkit";

// keeped initial empty
const initialState = {
  cartProducts: [], 
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add product to cart
    addProductToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.cartProducts.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartProducts.push({ ...product, quantity: 1 });
      }
    },

    // Increase product quantity
    increaseQuantity: (state, action) => {
      const productId = action.payload;
      const item = state.cartProducts.find((item) => item.id === productId);

      if (item) {
        item.quantity += 1;
      }
    },

    // Decrease product quantity or remove if quantity becomes 0
    decreaseQuantity: (state, action) => {
      const productId = action.payload;
      const itemIndex = state.cartProducts.findIndex(
        (item) => item.id === productId
      );

      if (itemIndex !== -1) {
        if (state.cartProducts[itemIndex].quantity > 1) {
          state.cartProducts[itemIndex].quantity -= 1;
        } else {
          state.cartProducts.splice(itemIndex, 1);
        }
      }
    },

    // Clear all items from cart
    clearCart: (state) => {
      state.cartProducts = [];

    },
  },
});

export const {
  addProductToCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
