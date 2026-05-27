import { FaqRecord } from "@/lib/firebase/firestore/faq";
import { createSlice } from "@reduxjs/toolkit";
import { fetchFaqs, createFaq, deleteFaq, updateFaq } from "./thunk";

interface FaqState {
  faqs: FaqRecord[];
  loading: boolean;
  error: string | null;
}

const initialState: FaqState = {
  faqs: [],
  loading: false,
  error: null,
};

const faqSlice = createSlice({
  name: "faq",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Faqs
    builder.addCase(fetchFaqs.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchFaqs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch faqs";
    });
    builder.addCase(fetchFaqs.fulfilled, (state, action) => {
      state.loading = false;
      state.faqs = action.payload;
    });

    // Create Faq
    builder.addCase(createFaq.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createFaq.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to create faq";
    });
    builder.addCase(createFaq.fulfilled, (state, action) => {
      state.loading = false;
      state.faqs.unshift(action.payload);
    });

    // Delete Faq
    builder.addCase(deleteFaq.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteFaq.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to delete faq";
    });
    builder.addCase(deleteFaq.fulfilled, (state, action) => {
      state.loading = false;
      state.faqs = state.faqs.filter((faq) => faq.id !== action.payload.id);
    });

    // Update Faq
    builder.addCase(updateFaq.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateFaq.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to update faq";
    });
    builder.addCase(updateFaq.fulfilled, (state, action) => {
      state.loading = false;

      const updatedFaq = action.payload;
      if (!updatedFaq) return;
      state.faqs = state.faqs.map((faq) =>
        faq.id === updatedFaq.id ? updatedFaq : faq,
      );
    });
  },
});

export default faqSlice.reducer;
