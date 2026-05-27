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

export interface GalleryRecord {
  id: string;
  name: string;
  image: {
    publicId: string;
    secureUrl: string;
  };
  created_at: string;
  updated_at: string;
}

export type InitialGalleryRecord = Omit<GalleryRecord, "id"> &
  Partial<Pick<GalleryRecord, "id">>;

const COLLECTION = "gallery";

const galleryConverter: FirestoreDataConverter<GalleryRecord> = {
  toFirestore(gallery: GalleryRecord) {
    return gallery;
  },

  fromFirestore(snapshot, options) {
    const data = snapshot.data(options) as Omit<GalleryRecord, "id">;
    return {
      id: snapshot.id,
      ...data,
    } satisfies GalleryRecord;
  },
};

export async function addGallery(data: Omit<GalleryRecord, "id">) {
  const col = collection(firestore, COLLECTION).withConverter(galleryConverter);
  const now = new Date().toISOString();
  const toSave = { ...data, created_at: now, updated_at: now };
  const ref = await addDoc(col, toSave);
  return { id: ref.id, ...toSave } as GalleryRecord;
}

export async function getGalleries(opts?: { limit?: number }) {
  const col = collection(firestore, COLLECTION).withConverter(galleryConverter);
  let q = query(col, orderBy("created_at", "desc"));
  if (opts?.limit) {
    q = query(q, limit(opts.limit));
  }

  const snap = await getDocs(q);
  const out: GalleryRecord[] = snap.docs.map((item) => item.data());
  return out;
}

export async function getGalleryById(firestore: Firestore, id: string) {
  const ref = doc(firestore, COLLECTION, id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return {
    id: snap.id,
    ...(snap.data() as Record<string, unknown>),
  } as GalleryRecord;
}

export async function updateGallery(
  id: string,
  update: Partial<GalleryRecord>,
) {
  const ref = doc(firestore, COLLECTION, id);
  const now = new Date().toISOString();
  await updateDoc(ref, {
    ...update,
    updated_at: now,
  });
  const updated = await getGalleryById(firestore, id);
  return updated;
}

export async function deleteGallery(firestore: Firestore, id: string) {
  const ref = doc(firestore, COLLECTION, id);
  await deleteDoc(ref);
  return { id };
}
