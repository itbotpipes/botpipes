import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { firestore } from "./firestore";

export interface ProductRecord {
  id?: string;
  name: string;
  description: string;
  features: string[];
  created_at: string;
  updated_at: string;
}

const COLLECTION = "products";

export async function addProduct(data: Omit<ProductRecord, "id">) {
  const col = collection(firestore, COLLECTION);
  const now = new Date().toISOString();
  const toSave = { ...data, createdAt: now, updatedAt: now };
  const ref = await addDoc(col, toSave as unknown as Record<string, unknown>);
  return {
    id: ref.id,
    ...(toSave as Record<string, unknown>),
  } as ProductRecord;
}

export async function getProducts(
  firestore: Firestore,
  opts?: { limit?: number },
) {
  const col = collection(firestore, COLLECTION);
  let q = query(col, orderBy("createdAt", "desc"));
  if (opts?.limit) {
    q = query(q, limit(opts.limit));
  }

  const snap = await getDocs(q);
  const out: ProductRecord[] = [];
  snap.forEach((d) => {
    out.push({
      id: d.id,
      ...d.data(),
    } as ProductRecord);
  });
  return out;
}

export async function getProductById(firestore: Firestore, id: string) {
  const ref = doc(firestore, COLLECTION, id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return {
    id: snap.id,
    ...(snap.data() as Record<string, unknown>),
  } as ProductRecord;
}

export async function updateProduct(
  firestore: Firestore,
  id: string,
  update: Partial<ProductRecord>,
) {
  const ref = doc(firestore, COLLECTION, id);
  const now = new Date().toISOString();
  await updateDoc(ref, {
    ...(update as Record<string, unknown>),
    updatedAt: now,
  });
  const updated = await getProductById(firestore, id);
  return updated;
}

export async function deleteProduct(firestore: Firestore, id: string) {
  const ref = doc(firestore, COLLECTION, id);
  await deleteDoc(ref);
  return { id };
}
