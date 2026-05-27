"use client";

import CareerForm from "@/features/Admin/Career/Form/CareerForm";
import { CareerRecord } from "@/lib/firebase/firestore/careers";
import { createCareer } from "@/lib/redux/career/thunk";
import { AppDispatch } from "@/lib/redux/store";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

function AddCareer() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const submitHandler = (data: CareerRecord) => {
    dispatch(createCareer(data));
    router.push("/admin/careers");
  };

  return (
    <div>
      <h1 className="mb-10 text-4xl">Add Career</h1>
      <div>
        <CareerForm submitHandler={submitHandler} />
      </div>
    </div>
  );
}

export default AddCareer;
