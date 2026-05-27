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
  where,
  limit,
  FirestoreDataConverter,
} from "firebase/firestore";
import { firestore } from "./firestore";

export interface BlogRecord {
  id: string;
  author: string;
  title: string;
  slug: string;
  category_ids: string[];
  sub_category_id: string;
  excerpt: string;
  cover_image_url: {
    publicId: string;
    secureUrl: string;
  };
  tags: string[];
  content: string; // rich text JSON or plain string
  updated_at: string;
  created_at: string;
  is_draft: boolean;
}

export type InitialBlogRecord = Omit<BlogRecord, "id"> &
  Partial<Pick<BlogRecord, "id">>;

const COLLECTION = "blogs";

const blogsConverter: FirestoreDataConverter<BlogRecord> = {
  toFirestore(blog: BlogRecord) {
    return blog;
  },

  fromFirestore(snapshot, options) {
    const data = snapshot.data(options) as Omit<BlogRecord, "id">;
    return {
      id: snapshot.id,
      ...data,
    } satisfies BlogRecord;
  },
};

export async function addBlog(data: Omit<BlogRecord, "id">) {
  const col = collection(firestore, COLLECTION).withConverter(blogsConverter);
  const now = new Date().toISOString();
  const toSave = { ...data, created_at: now, updated_at: now };
  const ref = await addDoc(col, toSave);
  return { id: ref.id, ...toSave } as BlogRecord;
}

export async function getBlogs(opts?: {
  limit?: number;
  publishedOnly?: boolean;
}) {
  const col = collection(firestore, COLLECTION).withConverter(blogsConverter);
  let q = query(col, orderBy("created_at"));
  if (opts?.publishedOnly) {
    q = query(
      col,
      where("publishedAt", "!=", null),
      orderBy("publishedAt", "desc"),
    );
  }
  if (opts?.limit) {
    q = query(q, limit(opts.limit));
  }

  const snap = await getDocs(q);
  const out: BlogRecord[] = snap.docs.map((item) => item.data());
  return out;
}

export async function getBlogById(firestore: Firestore, id: string) {
  const ref = doc(firestore, COLLECTION, id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return {
    id: snap.id,
    ...(snap.data() as Record<string, unknown>),
  } as BlogRecord;
}

export async function getBlogBySlug(slug: string) {
  const col = collection(firestore, COLLECTION).withConverter(blogsConverter);
  const q = query(col, where("slug", "==", slug), limit(1));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const blog = snap.docs[0].data();
  return blog;
}

export async function updateBlog(id: string, update: Partial<BlogRecord>) {
  const ref = doc(firestore, COLLECTION, id);
  const now = new Date().toISOString();
  const updated_data: Partial<BlogRecord> = {
    ...update,
    updated_at: now,
  };
  await updateDoc(ref, updated_data);
  const updated = await getBlogById(firestore, id);
  return updated;
}

export async function deleteBlog(firestore: Firestore, id: string) {
  const ref = doc(firestore, COLLECTION, id);
  await deleteDoc(ref);
  return { id };
}

export async function uploadImageToCloudinary(
  file: File,
  folder?: string,
): Promise<{ publicId: string; secureUrl: string }> {
  const formData = new FormData();
  formData.append("file", file);
  if (folder) formData.append("folder", folder);

  const response = await fetch("/api/v1/image", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload image");
  }

  const data = await response.json();
  return data;
}

export async function updateImageInCloudinary(
  file: File,
  publicId: string,
  folder?: string,
): Promise<{ publicId: string; secureUrl: string }> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("publicId", publicId);
  if (folder) formData.append("folder", folder);

  const response = await fetch("/api/v1/image", {
    method: "PUT",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to update image");
  }

  const data = await response.json();
  return data;
}

export async function deleteImageInCloudinary(publicId: string) {
  const response = await fetch(`/api/v1/image?publicId=${publicId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete image");
  }
}
