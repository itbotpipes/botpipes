import {
  doc,
  FirestoreDataConverter,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { firestore } from "./firestore";

const COLLECTION = "users";

export interface UserRecord {
  id: string;
  email: string;
  is_admin: boolean;
}

const usersConverter: FirestoreDataConverter<UserRecord> = {
  toFirestore(user: UserRecord) {
    return user;
  },

  fromFirestore(snapshot, options) {
    const data = snapshot.data(options) as Omit<UserRecord, "id">;
    return {
      id: snapshot.id,
      ...data,
    } satisfies UserRecord;
  },
};

export async function createUser(id: string, email: string) {
  const docRef = doc(firestore, COLLECTION, id).withConverter(usersConverter);
  const document = await getDoc(docRef);
  if (document.exists()) {
    return document.data();
  }

  await setDoc(docRef, { id, email, is_admin: false });
  return { id, email, is_admin: false } as UserRecord;
}

export async function getUserById(id: string) {
  const docRef = doc(firestore, COLLECTION, id).withConverter(usersConverter);
  const document = await getDoc(docRef);
  if (!document.exists()) return null;
  return document.data();
}
