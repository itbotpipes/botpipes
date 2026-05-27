"use client";

import BlogForm from "@/features/Admin/Blog/Form/BlogForm";
import { FormDataType } from "@/features/Admin/Blog/Form/useBlogForm";
import { createBlog } from "@/lib/redux/blogs/thunk";
import { AppDispatch } from "@/lib/redux/store";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

function AddBlog() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const submitHandler = (data: FormDataType) => {
    const { file } = data.cover_image_url;
    if (!file || typeof file === "string") return;

    dispatch(createBlog({ ...data, cover_image_url: file }));
    router.push("/admin/blogs");
  };

  return (
    <div>
      <h1 className="mb-10 text-4xl">Add Blog</h1>
      <div>
        <BlogForm submitHandler={submitHandler} />
      </div>
    </div>
  );
}

export default AddBlog;
