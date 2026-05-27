import {
  addCategory,
  CategoryRecord,
  getCategories,
  updateCategory as UpdateCategory,
  deleteCategory as RemoveCategory,
} from "@/lib/firebase/firestore/categories";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async () => {
    return await getCategories();
  },
);

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ id, update }: { id: string; update: Partial<CategoryRecord> }) => {
    return await UpdateCategory(id, update);
  },
);

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (data: Omit<CategoryRecord, "id">) => {
    return await addCategory(data);
  },
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id: string) => {
    return await RemoveCategory(id);
  },
);
