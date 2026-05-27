import { GalleryRecord } from "@/lib/firebase/firestore/gallery";
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchGalleries,
  createGallery,
  deleteGallery,
  updateGallery,
} from "./thunk";

interface GalleryState {
  galleries: GalleryRecord[];
  loading: boolean;
  error: string | null;
}

const initialState: GalleryState = {
  galleries: [],
  loading: false,
  error: null,
};

const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Galleries
    builder.addCase(fetchGalleries.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchGalleries.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch galleries";
    });
    builder.addCase(fetchGalleries.fulfilled, (state, action) => {
      state.loading = false;
      state.galleries = action.payload;
    });

    // Create Gallery
    builder.addCase(createGallery.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createGallery.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to create gallery";
    });
    builder.addCase(createGallery.fulfilled, (state, action) => {
      state.loading = false;
      state.galleries.unshift(action.payload);
    });

    // Delete Gallery
    builder.addCase(deleteGallery.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteGallery.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to delete gallery";
    });
    builder.addCase(deleteGallery.fulfilled, (state, action) => {
      state.loading = false;
      state.galleries = state.galleries.filter(
        (gallery) => gallery.id !== action.payload.id,
      );
    });

    // Update Gallery
    builder.addCase(updateGallery.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateGallery.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to update gallery";
    });
    builder.addCase(updateGallery.fulfilled, (state, action) => {
      state.loading = false;

      const updatedGallery = action.payload;
      if (!updatedGallery) return;
      state.galleries = state.galleries.map((gallery) =>
        gallery.id === updatedGallery.id ? updatedGallery : gallery,
      );
    });
  },
});

export default gallerySlice.reducer;