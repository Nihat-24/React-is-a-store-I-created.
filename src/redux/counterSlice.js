import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  cart: [],
  searchTerm: "",
  loading: false,
  hasLoaded: false,
  error: null,
};
const baseURL = "https://fakestoreapi.com/products";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(baseURL);
    return response.data;
  },
);

export const counterSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cart.find(
        (cartItem) => cartItem.id === item.id,
      );

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.cart.push(item);
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    decreaseQuantity: (state, action) => {
      const item = state.cart.find(
        (cartItem) => cartItem.id === action.payload,
      );
      if (!item) return;

      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.cart = state.cart.filter(
          (cartItem) => cartItem.id !== action.payload,
        );
      }
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.hasLoaded = true;
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.hasLoaded = true;
      state.error = action.error.message || "An unexpected error occurred.";
    });
  },
});
export const { addToCart, removeFromCart, decreaseQuantity, setSearchTerm } =
  counterSlice.actions;
export default counterSlice.reducer;
