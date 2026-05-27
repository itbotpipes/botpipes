import { JSONContent } from "@tiptap/react";
import { useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  InitialTestimonialRecord,
  TestimonialRecord,
} from "@/lib/firebase/firestore/testimonials";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";

const Schema = yup.object({
  username: yup.string().required("User is required"),
  role: yup.string().required("Role is required"),
  description: yup.string().required("Description is required"),
  ratings: yup.number().required("Ratings is required").min(0).max(5),
});

export type FormValues = yup.InferType<typeof Schema>;
export type SubmitHandler = (data: InitialTestimonialRecord) => void;

export function useTestimonialForm(
  submitHandler: SubmitHandler,
  item?: TestimonialRecord,
) {
  const { loading } = useSelector((state: RootState) => state.testimonial);
  const [description, setDescription] = useState<JSONContent | undefined>(
    item?.description ? JSON.parse(item.description) : undefined,
  );
  const form = useForm<FormValues>({
    resolver: yupResolver(Schema) as Resolver<FormValues>,
    defaultValues: { ...item },
  });

  const handleSubmit = async (data: FormValues) => {
    const submitData = {
      ...data,
      description: JSON.stringify(description),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    submitHandler(submitData);
  };

  return { setDescription, form, handleSubmit, sending: loading };
}
