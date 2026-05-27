import { TestimonialRecord } from "@/lib/firebase/firestore/testimonials";
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTestimonials,
  createTestimonial,
  deleteTestimonial,
  updateTestimonial,
} from "./thunk";

interface TestimonialState {
  testimonials: TestimonialRecord[];
  loading: boolean;
  error: string | null;
}

const initialState: TestimonialState = {
  testimonials: [],
  loading: false,
  error: null,
};

const testimonialSlice = createSlice({
  name: "testimonial",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Testimonials
    builder.addCase(fetchTestimonials.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTestimonials.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch testimonials";
    });
    builder.addCase(fetchTestimonials.fulfilled, (state, action) => {
      state.loading = false;
      state.testimonials = action.payload;
    });

    // Create Testimonial
    builder.addCase(createTestimonial.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createTestimonial.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to create testimonial";
    });
    builder.addCase(createTestimonial.fulfilled, (state, action) => {
      state.loading = false;
      state.testimonials.unshift(action.payload);
    });

    // Delete Testimonial
    builder.addCase(deleteTestimonial.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteTestimonial.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to delete testimonial";
    });
    builder.addCase(deleteTestimonial.fulfilled, (state, action) => {
      state.loading = false;
      state.testimonials = state.testimonials.filter(
        (testimonial) => testimonial.id !== action.payload.id,
      );
    });

    // Update Testimonial
    builder.addCase(updateTestimonial.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateTestimonial.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to update testimonial";
    });
    builder.addCase(updateTestimonial.fulfilled, (state, action) => {
      state.loading = false;

      const updatedTestimonial = action.payload;
      if (!updatedTestimonial) return;
      state.testimonials = state.testimonials.map((testimonial) =>
        testimonial.id === updatedTestimonial.id
          ? updatedTestimonial
          : testimonial,
      );
    });
  },
});

export default testimonialSlice.reducer;
