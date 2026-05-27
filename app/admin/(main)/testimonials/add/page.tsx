"use client";

import TestimonialForm from "@/features/Admin/Testimonial/Form/TestimonialForm";
import { InitialTestimonialRecord } from "@/lib/firebase/firestore/testimonials";
import { AppDispatch } from "@/lib/redux/store";
import { createTestimonial } from "@/lib/redux/testimonial/thunk";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

function AddTestimonial() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleSubmit = (data: InitialTestimonialRecord) => {
    dispatch(createTestimonial(data));
    router.push("/admin/testimonials");
  };

  return (
    <div>
      <h1 className="mb-10 text-4xl">Add Testimonial</h1>
      <div>
        <TestimonialForm submitHandler={handleSubmit} />
      </div>
    </div>
  );
}

export default AddTestimonial;
