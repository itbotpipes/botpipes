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

export interface TestimonialRecord {
  id: string;
  username: string;
  role: string;
  description: string;
  ratings: number;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

export type InitialTestimonialRecord = Omit<TestimonialRecord, "id"> &
  Partial<Pick<TestimonialRecord, "id">>;

const COLLECTION = "testimonials";

const testimonialConverter: FirestoreDataConverter<TestimonialRecord> = {
  toFirestore(testimonial) {
    return testimonial;
  },

  fromFirestore(snapshot, options) {
    const data = snapshot.data(options) as Omit<TestimonialRecord, "id">;
    return {
      id: snapshot.id,
      ...data,
    };
  },
};

export async function addTestimonial(data: Omit<TestimonialRecord, "id">) {
  const col = collection(firestore, COLLECTION).withConverter(
    testimonialConverter,
  );
  const now = new Date().toISOString();
  const toSave = { ...data, created_at: data.created_at ?? now };
  const ref = await addDoc(col, toSave);
  return { id: ref.id, ...toSave } as TestimonialRecord;
}

export async function getTestimonials(opts?: { limit?: number }) {
  const col = collection(firestore, COLLECTION).withConverter(
    testimonialConverter,
  );
  let q = query(col, orderBy("created_at", "desc"));
  if (opts?.limit) q = query(q, limit(opts.limit));

  const snap = await getDocs(q);
  const out: TestimonialRecord[] = snap.docs.map((item) => item.data());
  return out;
}

export async function getTestimonialById(firestore: Firestore, id: string) {
  const ref = doc(firestore, COLLECTION, id).withConverter(
    testimonialConverter,
  );
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return snap.data();
}

export async function updateTestimonial(
  id: string,
  update: Partial<TestimonialRecord>,
) {
  const ref = doc(firestore, COLLECTION, id).withConverter(
    testimonialConverter,
  );
  await updateDoc(ref, update);
  const updated = await getTestimonialById(firestore, id);
  return updated;
}

export async function deleteTestimonial(id: string) {
  const ref = doc(firestore, COLLECTION, id);
  await deleteDoc(ref);
  return { id };
}

const TestimonialsService = {
  addTestimonial,
  getTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
};

export default TestimonialsService;
