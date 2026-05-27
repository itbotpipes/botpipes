import { JSONContent } from "@tiptap/react";
import { useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import { CareerRecord } from "@/lib/firebase/firestore/careers";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Schema = yup.object({
  role: yup.string().required("Role is required"),
  description: yup.string().required("Description is required"),
});

export type FormValues = yup.InferType<typeof Schema>;
type FormSubmitHandler = (data: CareerRecord) => void;

export function useCareerForm(
  submitHandler: FormSubmitHandler,
  item?: CareerRecord,
) {
  const [description, setDescription] = useState<JSONContent | undefined>(
    item?.description ? JSON.parse(item.description) : undefined,
  );
  const form = useForm<FormValues>({
    resolver: yupResolver(Schema) as Resolver<FormValues>,
    defaultValues: {
      role: item?.role || "",
      description: item?.description || "",
    },
  });

  const handleSubmit = async (data: FormValues) => {
    const submitData: CareerRecord = {
      ...item,
      ...data,
      description: JSON.stringify(description),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    submitHandler(submitData);
  };

  return { setDescription, form, handleSubmit };
}
