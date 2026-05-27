"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createAccount, googleSignIn } from "@/lib/firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface FormData {
  email: string;
  password: string;
  confirmPassword?: string;
}

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    setError(null);
    try {
      await createAccount(data.email, data.password);
      router.push("/admin");
    } catch (err: unknown) {
      if (err && typeof err === "object" && "message" in err) {
        setError((err as { message?: string }).message || "Sign up failed");
      } else {
        setError("Sign up failed");
      }
    }
  };

  const handleGoogleSignUp = async () => {
    setError(null);
    try {
      await googleSignIn();
    } catch (err: unknown) {
      if (err && typeof err === "object" && "message" in err) {
        setError(
          (err as { message?: string }).message || "Google sign up failed",
        );
      } else {
        setError("Google sign up failed");
      }
    }
  };

  return (
    <div className="mx-auto mt-12 max-w-md rounded bg-white p-6 shadow">
      <h2 className="mb-6 text-center text-2xl font-bold">Sign Up</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full rounded border px-3 py-2 focus:border-blue-400 focus:ring focus:outline-none"
            {...register("email", { required: "Email is required" })}
            autoComplete="email"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">
              {errors.email.message as string}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Password</label>
          <input
            type="password"
            className="w-full rounded border px-3 py-2 focus:border-blue-400 focus:ring focus:outline-none"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            autoComplete="new-password"
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">
              {errors.password.message as string}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Confirm Password
          </label>
          <input
            type="password"
            className="w-full rounded border px-3 py-2 focus:border-blue-400 focus:ring focus:outline-none"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (v) =>
                v === getValues("password") || "Passwords do not match",
            })}
            autoComplete="new-password"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-500">
              {errors.confirmPassword.message as string}
            </p>
          )}
        </div>

        {error && (
          <div className="text-center text-sm text-red-600">{error}</div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded bg-blue-700 py-2 font-semibold text-white transition-colors hover:bg-blue-800"
        >
          {isSubmitting ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      <div className="my-6 flex items-center justify-center">
        <span className="h-px flex-1 bg-gray-300" />
        <span className="px-3 text-xs text-gray-500 uppercase">or</span>
        <span className="h-px flex-1 bg-gray-300" />
      </div>

      <button
        onClick={handleGoogleSignUp}
        className="flex w-full items-center justify-center gap-2 rounded border border-gray-300 bg-white py-2 font-semibold text-gray-800 transition-colors hover:bg-gray-100"
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
        Sign up with Google
      </button>
      <p className="mt-2">
        Don&apos;t have an account?{" "}
        <Link href="/admin/login" className="text-blue-600">
          Log In
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
