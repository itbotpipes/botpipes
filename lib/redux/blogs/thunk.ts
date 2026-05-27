import {
  addBlog,
  getBlogs as GetBlogs,
  updateBlog as UpdateBlog,
  deleteBlog as RemoveBlog,
  uploadImageToCloudinary,
  InitialBlogRecord,
  updateImageInCloudinary,
  deleteImageInCloudinary,
} from "@/lib/firebase/firestore/blogs";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { firestore } from "@/lib/firebase/firestore/firestore";

export const fetchBlogs = createAsyncThunk("blog/fetchBlogs", async () => {
  return await GetBlogs();
});

export interface ThunkBlogInterface
  extends Omit<InitialBlogRecord, "cover_image_url"> {
  cover_image_url: {
    publicId: string; // optional FOR UPDATES ONLY
    file: File | string; // REQUIRED FOR BOTH CREATE AND UPDATE
  };
}

export const updateBlog = createAsyncThunk(
  "blog/updateBlog",
  async ({ id, update }: { id: string; update: ThunkBlogInterface }) => {
    const { cover_image_url, ...rest } = update;
    const payload: Partial<InitialBlogRecord> = { ...rest };

    if (typeof cover_image_url.file !== "string") {
      const updatedImage = await updateImageInCloudinary(
        cover_image_url.file,
        cover_image_url.publicId,
        "blogs/covers",
      );

      payload.cover_image_url = updatedImage;
    }

    return await UpdateBlog(id, payload);
  },
);

export interface CreateBlogInterface
  extends Omit<InitialBlogRecord, "cover_image_url"> {
  cover_image_url: File;
}

export const createBlog = createAsyncThunk(
  "blog/createBlog",
  async (data: CreateBlogInterface) => {
    const cover_image_url = await uploadImageToCloudinary(
      data.cover_image_url,
      "blogs/covers",
    );

    return await addBlog({
      ...data,
      cover_image_url,
    });
  },
);

interface DeleteBlogPayload {
  id: string;
  publicId: string;
}
export const deleteBlog = createAsyncThunk(
  "blog/deleteBlog",
  async ({ id, publicId }: DeleteBlogPayload) => {
    await deleteImageInCloudinary(publicId);
    return await RemoveBlog(firestore, id);
  },
);
