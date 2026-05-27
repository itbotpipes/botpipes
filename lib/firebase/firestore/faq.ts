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

export interface FaqRecord {
  id?: string;
  question: string;
  description: string;
  homepage: boolean;
  career: boolean;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

const COLLECTION = "faqs";

export async function addFaq(data: Omit<FaqRecord, "id">) {
  const col = collection(firestore, COLLECTION);
  const now = new Date().toISOString();
  const toSave = { ...data, created_at: data.created_at ?? now } as Record<
    string,
    unknown
  >;
  const ref = await addDoc(col, toSave);
  return { id: ref.id, ...toSave } as FaqRecord;
}

export async function getFaqs(opts?: { limit?: number }) {
  const col = collection(firestore, COLLECTION);
  let q = query(col, orderBy("created_at", "desc"));
  if (opts?.limit) q = query(q, limit(opts.limit));

  const snap = await getDocs(q);
  const out: FaqRecord[] = [];
  snap.forEach((d) =>
    out.push({
      id: d.id,
      ...(d.data() as Record<string, unknown>),
    } as FaqRecord),
  );
  return out;
}

export async function getFaqById(firestore: Firestore, id: string) {
  const ref = doc(firestore, COLLECTION, id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return {
    id: snap.id,
    ...(snap.data() as Record<string, unknown>),
  } as FaqRecord;
}

export async function updateFaq(id: string, update: Partial<FaqRecord>) {
  const ref = doc(firestore, COLLECTION, id);
  await updateDoc(ref, update as Record<string, unknown>);
  const updated = await getFaqById(firestore, id);
  return updated;
}

export async function deleteFaq(id: string) {
  const ref = doc(firestore, COLLECTION, id);
  await deleteDoc(ref);
  return { id };
}

const FaqsService = {
  addFaq,
  getFaqs,
  getFaqById,
  updateFaq,
  deleteFaq,
};

export default FaqsService;
