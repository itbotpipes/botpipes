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

export interface CareerRecord {
  id?: string;
  role: string;
  description: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

const COLLECTION = "careers";

const careerConverter: FirestoreDataConverter<CareerRecord> = {
  toFirestore(career: CareerRecord) {
    return career;
  },

  fromFirestore(snapsshot, options) {
    const data = snapsshot.data(options);

    return {
      id: snapsshot.id,
      role: data.role,
      description: data.description,
      created_at: data.created_at,
      updated_at: data.updated_at,
    } satisfies CareerRecord;
  },
};

export async function addCareer(data: Omit<CareerRecord, "id">) {
  const col = collection(firestore, COLLECTION);
  const now = new Date().toISOString();
  const toSave = { ...data, created_at: data.created_at ?? now } as Record<
    string,
    unknown
  >;
  const ref = await addDoc(col, toSave);
  return { id: ref.id, ...toSave } as CareerRecord;
}

export async function getCareers(opts?: { limit?: number }) {
  const col = collection(firestore, COLLECTION).withConverter(careerConverter);
  let q = query(col, orderBy("created_at", "desc"));
  if (opts?.limit) q = query(q, limit(opts.limit));

  const snap = await getDocs(q);
  const out: CareerRecord[] = snap.docs.map((item) => item.data());
  return out;
}

export async function getCareerById(firestore: Firestore, id: string) {
  const ref = doc(firestore, COLLECTION, id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return {
    id: snap.id,
    ...(snap.data() as Record<string, unknown>),
  } as CareerRecord;
}

export async function updateCareer(id: string, update: Partial<CareerRecord>) {
  const ref = doc(firestore, COLLECTION, id);
  await updateDoc(ref, update as Record<string, unknown>);
  const updated = await getCareerById(firestore, id);
  return updated;
}

export async function deleteCareer(id: string) {
  const ref = doc(firestore, COLLECTION, id);
  await deleteDoc(ref);
  return { id };
}

const CareersService = {
  addCareer,
  getCareers,
  getCareerById,
  updateCareer,
  deleteCareer,
};

export default CareersService;
