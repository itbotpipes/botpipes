import { CategoryRecord } from "@/lib/firebase/firestore/categories";
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCategories,
  createCategory,
  deleteCategory,
  updateCategory,
} from "./thunk";

interface CategoryState {
  categories: CategoryRecord[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Categories
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch categories";
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    });

    // Create Category
    builder.addCase(createCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to create category";
    });
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.categories.unshift(action.payload);
    });

    // Delete Category
    builder.addCase(deleteCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to delete category";
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload.id,
      );
    });

    // Update Category
    builder.addCase(updateCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to update category";
    });
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.loading = false;

      const updatedCategory = action.payload;
      if (!updatedCategory) return;
      state.categories = state.categories.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category,
      );
    });
  },
});

export default categorySlice.reducer;
