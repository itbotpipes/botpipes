import {
  addGallery,
  getGalleries as GetGalleries,
  updateGallery as UpdateGallery,
  deleteGallery as RemoveGallery,
  InitialGalleryRecord,
} from "@/lib/firebase/firestore/gallery";
import {
  uploadImageToCloudinary,
  updateImageInCloudinary,
  deleteImageInCloudinary,
} from "@/lib/firebase/firestore/blogs";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { firestore } from "@/lib/firebase/firestore/firestore";

export const fetchGalleries = createAsyncThunk(
  "gallery/fetchGalleries",
  async () => {
    return await GetGalleries();
  },
);

export interface ThunkGalleryInterface
  extends Omit<InitialGalleryRecord, "image"> {
  image: {
    publicId: string; // optional FOR UPDATES ONLY
    file: File | string; // REQUIRED FOR BOTH CREATE AND UPDATE
  };
}

export const updateGallery = createAsyncThunk(
  "gallery/updateGallery",
  async ({ id, update }: { id: string; update: ThunkGalleryInterface }) => {
    const { image, ...rest } = update;

    const payload: Partial<InitialGalleryRecord> = { ...rest };

    if (typeof image.file !== "string") {
      const updatedImage = await updateImageInCloudinary(
        image.file,
        image.publicId,
        "gallery/images",
      );

      payload.image = updatedImage;
    }

    return await UpdateGallery(id, payload);
  },
);

export interface CreateGalleryInterface
  extends Omit<InitialGalleryRecord, "image"> {
  image: File;
}

export const createGallery = createAsyncThunk(
  "gallery/createGallery",
  async (data: CreateGalleryInterface) => {
    const image = await uploadImageToCloudinary(data.image, "gallery/images");

    return await addGallery({
      ...data,
      image: {
        publicId: image.publicId,
        secureUrl: image.secureUrl,
      },
    });
  },
);

interface DeleteGalleryPayload {
  id: string;
  publicId: string;
}

export const deleteGallery = createAsyncThunk(
  "gallery/deleteGallery",
  async ({ id, publicId }: DeleteGalleryPayload) => {
    await deleteImageInCloudinary(publicId);
    return await RemoveGallery(firestore, id);
  },
);
