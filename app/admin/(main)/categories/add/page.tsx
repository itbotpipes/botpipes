"use client";

import CategoryForm from "@/features/Admin/Categories/Form/CategoryForm";
import { CategoryRecord } from "@/lib/firebase/firestore/categories";
import { createCategory } from "@/lib/redux/category/thunk";
import { AppDispatch } from "@/lib/redux/store";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

function AddCategory() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const submitHandler = (data: CategoryRecord | Omit<CategoryRecord, "id">) => {
    dispatch(createCategory(data));
    router.push("/admin/categories");
  };

  return (
    <div>
      <h1 className="mb-10 text-4xl">Add Category</h1>
      <div>
        <CategoryForm submitHandler={submitHandler} />
      </div>
    </div>
  );
}

export default AddCategory;
