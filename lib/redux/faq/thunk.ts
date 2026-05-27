import {
  addFaq,
  FaqRecord,
  getFaqs,
  updateFaq as UpdateFaq,
  deleteFaq as RemoveFaq,
} from "@/lib/firebase/firestore/faq";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchFaqs = createAsyncThunk("faq/fetchFaqs", async () => {
  return await getFaqs();
});

export const updateFaq = createAsyncThunk(
  "faq/updateFaq",
  async ({ id, update }: { id: string; update: Partial<FaqRecord> }) => {
    return await UpdateFaq(id, update);
  },
);

export const createFaq = createAsyncThunk(
  "faq/createFaq",
  async (data: Omit<FaqRecord, "id">) => {
    return await addFaq(data);
  },
);

export const deleteFaq = createAsyncThunk(
  "faq/deleteFaq",
  async (id: string) => {
    return await RemoveFaq(id);
  },
);
