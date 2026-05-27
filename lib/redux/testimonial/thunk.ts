import {
  addTestimonial,
  TestimonialRecord,
  getTestimonials,
  updateTestimonial as UpdateTestimonial,
  deleteTestimonial as RemoveTestimonial,
} from "@/lib/firebase/firestore/testimonials";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTestimonials = createAsyncThunk(
  "testimonial/fetchTestimonials",
  async () => {
    return await getTestimonials();
  },
);

export const updateTestimonial = createAsyncThunk(
  "testimonial/updateTestimonial",
  async ({
    id,
    update,
  }: {
    id: string;
    update: Partial<TestimonialRecord>;
  }) => {
    return await UpdateTestimonial(id, update);
  },
);

export const createTestimonial = createAsyncThunk(
  "testimonial/createTestimonial",
  async (data: Omit<TestimonialRecord, "id">) => {
    return await addTestimonial(data);
  },
);

export const deleteTestimonial = createAsyncThunk(
  "testimonial/deleteTestimonial",
  async (id: string) => {
    return await RemoveTestimonial(id);
  },
);
