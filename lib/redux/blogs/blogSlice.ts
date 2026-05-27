import { BlogRecord } from "@/lib/firebase/firestore/blogs";
import { createSlice } from "@reduxjs/toolkit";
import { fetchBlogs, createBlog, deleteBlog, updateBlog } from "./thunk";

interface BlogState {
  blogs: BlogRecord[];
  loading: boolean;
  error: string | null;
}

const initialState: BlogState = {
  blogs: [],
  loading: false,
  error: null,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Blogs
    builder.addCase(fetchBlogs.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchBlogs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch blogs";
    });
    builder.addCase(fetchBlogs.fulfilled, (state, action) => {
      state.loading = false;
      state.blogs = action.payload;
    });

    // Create Blog
    builder.addCase(createBlog.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createBlog.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to create blog";
    });
    builder.addCase(createBlog.fulfilled, (state, action) => {
      state.loading = false;
      state.blogs.unshift(action.payload);
    });

    // Delete Blog
    builder.addCase(deleteBlog.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteBlog.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to delete blog";
    });
    builder.addCase(deleteBlog.fulfilled, (state, action) => {
      state.loading = false;
      state.blogs = state.blogs.filter((blog) => blog.id !== action.payload.id);
    });

    // Update Blog
    builder.addCase(updateBlog.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateBlog.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to update blog";
    });
    builder.addCase(updateBlog.fulfilled, (state, action) => {
      state.loading = false;

      const updatedBlog = action.payload;
      if (!updatedBlog) return;
      state.blogs = state.blogs.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog,
      );
    });
  },
});

export default blogSlice.reducer;
