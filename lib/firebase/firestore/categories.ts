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
  FirestoreDataConverter,
} from "firebase/firestore";
import { firestore } from "./firestore";

export interface CategoryRecord {
  id: string;
  name: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

const COLLECTION = "categories";

const categoryConverter: FirestoreDataConverter<CategoryRecord> = {
  toFirestore(category: CategoryRecord) {
    return category;
  },

  fromFirestore(snapsshot, options) {
    const data = snapsshot.data(options);

    return {
      id: snapsshot.id,
      name: data.name,
      created_at: data.created_at,
      updated_at: data.updated_at,
    } satisfies CategoryRecord;
  },
};

export async function addCategory(data: Omit<CategoryRecord, "id">) {
  const col = collection(firestore, COLLECTION);
  const now = new Date().toISOString();
  const toSave = { ...data, created_at: data.created_at ?? now } as Record<
    string,
    unknown
  >;
  const ref = await addDoc(col, toSave);
  return { id: ref.id, ...toSave } as CategoryRecord;
}

export async function getCategories(opts?: { limit?: number }) {
  const col = collection(firestore, COLLECTION).withConverter(
    categoryConverter,
  );
  let q = query(col, orderBy("created_at", "desc"));
  if (opts?.limit) q = query(q, limit(opts.limit));

  const snap = await getDocs(q);
  const out: CategoryRecord[] = snap.docs.map((item) => item.data());
  return out;
}

export async function getCategoryById(firestore: Firestore, id: string) {
  const ref = doc(firestore, COLLECTION, id).withConverter(categoryConverter);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return snap.data();
}

export async function updateCategory(
  id: string,
  update: Partial<CategoryRecord>,
) {
  const ref = doc(firestore, COLLECTION, id).withConverter(categoryConverter);
  await updateDoc(ref, update as Record<string, unknown>);
  const updated = await getCategoryById(firestore, id);
  return updated;
}

export async function deleteCategory(id: string) {
  const ref = doc(firestore, COLLECTION, id);
  await deleteDoc(ref);
  return { id };
}

const CategoriesService = {
  addCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};

export default CategoriesService;
