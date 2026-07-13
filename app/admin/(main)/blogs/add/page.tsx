"use client";

import NotionBlogEditor from "@/features/Admin/Blog/Form/NotionBlogEditor";
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
    if (!file) return;

    dispatch(createBlog({ ...data, cover_image_url: file as File }));
    router.push("/admin/blogs");
  };

  return (
    <div className="absolute inset-0 z-50 bg-[#191919]">
      <NotionBlogEditor submitHandler={submitHandler} />
    </div>
  );
}

export default AddBlog;
