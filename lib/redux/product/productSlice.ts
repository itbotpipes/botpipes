import { ProductRecord } from "@/lib/firebase/firestore/products";
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from "./thunk";

interface ProductState {
  products: ProductRecord[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Products
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch products";
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });

    // Create Product
    builder.addCase(createProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to create product";
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products.unshift(action.payload);
    });

    // Delete Product
    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to delete product";
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id,
      );
    });

    // Update Product
    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to update product";
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.loading = false;

      const updatedProduct = action.payload;
      if (!updatedProduct) return;
      state.products = state.products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product,
      );
    });
  },
});

export default productSlice.reducer;
