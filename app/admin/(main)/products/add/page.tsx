"use client";

import React from "react";
import ProductForm from "@/features/Admin/Product/Form/ProductForm";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import { ProductRecord } from "@/lib/firebase/firestore/products";
import { createProduct } from "@/lib/redux/product/thunk";

function AddProduct() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const submitHandler = (data: ProductRecord) => {
    dispatch(createProduct(data));
    router.push("/admin/products");
  };

  return (
    <div>
      <h1 className="mb-10 text-4xl">Add Product</h1>
      <div>
        <ProductForm submitHandler={submitHandler} />
      </div>
    </div>
  );
}

export default AddProduct;
