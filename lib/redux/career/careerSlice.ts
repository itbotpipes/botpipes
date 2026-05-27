import { CareerRecord } from "@/lib/firebase/firestore/careers";
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCareers,
  createCareer,
  deleteCareer,
  updateCareer,
} from "./thunk";

interface CareerState {
  careers: CareerRecord[];
  loading: boolean;
  error: string | null;
}

const initialState: CareerState = {
  careers: [],
  loading: false,
  error: null,
};

const careerSlice = createSlice({
  name: "career",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Careers
    builder.addCase(fetchCareers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCareers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch careers";
    });
    builder.addCase(fetchCareers.fulfilled, (state, action) => {
      state.loading = false;
      state.careers = action.payload;
    });

    // Create Career
    builder.addCase(createCareer.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createCareer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to create career";
    });
    builder.addCase(createCareer.fulfilled, (state, action) => {
      state.loading = false;
      state.careers.unshift(action.payload);
    });

    // Delete Career
    builder.addCase(deleteCareer.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteCareer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to delete career";
    });
    builder.addCase(deleteCareer.fulfilled, (state, action) => {
      state.loading = false;
      state.careers = state.careers.filter(
        (career) => career.id !== action.payload.id,
      );
    });

    // Update Career
    builder.addCase(updateCareer.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateCareer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to update career";
    });
    builder.addCase(updateCareer.fulfilled, (state, action) => {
      state.loading = false;

      const updatedCareer = action.payload;
      if (!updatedCareer) return;
      state.careers = state.careers.map((career) =>
        career.id === updatedCareer.id ? updatedCareer : career,
      );
    });
  },
});

export default careerSlice.reducer;
