import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  updateProfile,
  UserCredential,
} from "firebase/auth";
import { auth } from "./firebase";
import { createUser } from "./firestore/user";

/**
 * Create a new user with email and password and optionally set displayName.
 */
export async function createAccount(
  email: string,
  password: string,
  displayName?: string,
): Promise<UserCredential> {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName && cred.user) {
    // updateProfile is safe to call client-side to set display name
    await updateProfile(cred.user, { displayName });
  }
  return cred;
}

/**
 * Sign in with email and password
 */
export async function signIn(
  email: string,
  password: string,
): Promise<UserCredential> {
  return await signInWithEmailAndPassword(auth, email, password);
}

/**
 * Sign in with Google using a popup (client-side only).
 * Throws if run in a non-browser environment.
 */
export async function googleSignIn() {
  if (typeof window === "undefined") {
    throw new Error("googleSignIn can only be called in a browser environment");
  }

  const provider = new GoogleAuthProvider();
  const creds = await signInWithPopup(auth, provider);
  const user = creds.user;

  if (!user.email) throw new Error("Google account has no email");

  const userData = await createUser(user.uid, user.email);
  if (!userData.is_admin) throw new Error("User is not an admin");
  const token = await user.getIdToken();
  // Send token to the API route that sets a cookie
  await fetch("/api/v1/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken: token }),
  });
  return creds;
}

/**
 * Sign out the current user
 */
export async function signOutUser(): Promise<void> {
  await signOut(auth);
}
