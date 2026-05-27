import {
  addProduct,
  ProductRecord,
  getProducts as GetProducts,
  updateProduct as UpdateProduct,
  deleteProduct as RemoveProduct,
} from "@/lib/firebase/firestore/products";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { firestore } from "@/lib/firebase/firestore/firestore";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    return await GetProducts(firestore);
  },
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, update }: { id: string; update: Partial<ProductRecord> }) => {
    return await UpdateProduct(firestore, id, update);
  },
);

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (data: Omit<ProductRecord, "id">) => {
    return await addProduct(data);
  },
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id: string) => {
    return await RemoveProduct(firestore, id);
  },
);
