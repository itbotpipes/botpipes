import {
  addCareer,
  CareerRecord,
  getCareers,
  updateCareer as UpdateCareer,
  deleteCareer as RemoveCareer,
} from "@/lib/firebase/firestore/careers";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCareers = createAsyncThunk(
  "career/fetchCareers",
  async () => {
    return await getCareers();
  },
);

export const updateCareer = createAsyncThunk(
  "career/updateCareer",
  async ({ id, update }: { id: string; update: Partial<CareerRecord> }) => {
    return await UpdateCareer(id, update);
  },
);

export const createCareer = createAsyncThunk(
  "career/createCareer",
  async (data: Omit<CareerRecord, "id">) => {
    return await addCareer(data);
  },
);

export const deleteCareer = createAsyncThunk(
  "career/deleteCareer",
  async (id: string) => {
    return await RemoveCareer(id);
  },
);
