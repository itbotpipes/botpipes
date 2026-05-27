"use client";

import React, { useState } from "react";
import { googleSignIn, signIn } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/firebase/firestore/user";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  // 🔐 Email/Password Login
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const creds = await signIn(email, password);
      const user = creds.user;

      if (!user.email) throw new Error("No email found");

      // 🔴 SAME ADMIN CHECK AS GOOGLE LOGIN
      const userData = await createUser(user.uid, user.email);
      if (!userData.is_admin) throw new Error("User is not an admin");

      const token = await user.getIdToken();

      await fetch("/api/v1/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: token }),
      });

      router.push("/admin");
    } catch (err: unknown) {
      if (err && typeof err === "object" && "message" in err) {
        setError(
          (err as { message?: string }).message || "Login failed"
        );
      } else {
        setError("Login failed");
      }
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    try {
      await googleSignIn();
      router.push("/admin");
    } catch (err: unknown) {
      if (err && typeof err === "object" && "message" in err) {
        setError(
          (err as { message?: string }).message || "Google sign in failed"
        );
      } else {
        setError("Google sign in failed");
      }
    }
  };

  return (
    <div className="mx-auto mt-12 max-w-md rounded bg-white p-6 shadow">
      <h2 className="mb-6 text-center text-2xl font-bold">Sign In</h2>

      {/* ✅ FORM NOW HANDLES SUBMIT */}
      <form onSubmit={handleEmailLogin} className="flex flex-col space-y-3">
        <label>Email Address</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded border border-gray-300 py-2 px-2"
        />

        <label>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded border border-gray-300 py-2 px-2"
        />

        <button
          type="submit"
          className="cursor-pointer rounded border border-gray-300 py-2 font-semibold hover:bg-gray-100"
        >
          Login
        </button>
      </form>

      <div className="w-full text-center py-5">
        <p className="text-xs text-gray-300">Or Sign In With</p>
      </div>

      <button
        onClick={handleGoogleSignIn}
        className="cursor-pointer flex w-full items-center justify-center gap-2 rounded border border-gray-300 bg-white py-2 font-semibold text-gray-800 hover:bg-gray-100"
        type="button"
      >
        <svg className="h-5 w-5" viewBox="0 0 48 48">
          <g>
            <path
              fill="#4285F4"
              d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.85-6.85C35.64 2.36 30.18 0 24 0 14.82 0 6.71 5.08 2.69 12.44l7.98 6.2C12.13 13.09 17.62 9.5 24 9.5z"
            />
            <path
              fill="#34A853"
              d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.04l7.18 5.59C43.93 37.36 46.1 31.45 46.1 24.55z"
            />
            <path
              fill="#FBBC05"
              d="M10.67 28.65a14.5 14.5 0 0 1 0-9.3l-7.98-6.2A23.94 23.94 0 0 0 0 24c0 3.93.94 7.65 2.69 10.94l7.98-6.29z"
            />
            <path
              fill="#EA4335"
              d="M24 48c6.18 0 11.36-2.05 15.14-5.57l-7.18-5.59c-2 1.36-4.56 2.17-7.96 2.17-6.38 0-11.87-3.59-14.33-8.85l-7.98 6.29C6.71 42.92 14.82 48 24 48z"
            />
            <path fill="none" d="M0 0h48v48H0z" />
          </g>
        </svg>
        Sign in with Google
      </button>

      {error && <div className="text-center text-sm text-red-600">{error}</div>}
    </div>
  );
};

export default Login;