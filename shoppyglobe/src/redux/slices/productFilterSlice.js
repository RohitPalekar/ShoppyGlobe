// Redux slice for product search functionality
import { createSlice } from "@reduxjs/toolkit";
// keeped initial empty
const initialState = {
  filteredProducts: [],
};

export const productFilterSlice = createSlice({
  name: "productFilter",
  initialState,
  reducers: {
    // Set filtered products based on search
    setFilteredProducts: (state, action) => {
      state.filteredProducts = action.payload;
    },
  },
});

export const { setFilteredProducts } = productFilterSlice.actions;

export default productFilterSlice.reducer;