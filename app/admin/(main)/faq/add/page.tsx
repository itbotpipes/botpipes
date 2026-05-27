"use client";

import FaqForm from "@/features/Admin/FAQ/Form/FaqForm";
import { FaqRecord } from "@/lib/firebase/firestore/faq";
import { createFaq } from "@/lib/redux/faq/thunk";
import { AppDispatch } from "@/lib/redux/store";
import { useRouter } from "next/navigation";

import React from "react";
import { useDispatch } from "react-redux";

function AddFaq() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const submitHandler = (data: FaqRecord) => {
    dispatch(createFaq(data));
    router.push("/admin/faq");
  };

  return (
    <div>
      <h1 className="mb-10 text-4xl">Add FAQ</h1>
      <div>
        <FaqForm submitHandler={submitHandler} />
      </div>
    </div>
  );
}

export default AddFaq;
