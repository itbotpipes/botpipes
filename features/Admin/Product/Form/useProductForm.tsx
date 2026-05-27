import { ProductRecord } from "@/lib/firebase/firestore/products";
import { yupResolver } from "@hookform/resolvers/yup";
import { JSONContent } from "@tiptap/react";
import { useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import * as yup from "yup";

const Schema = yup.object({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  features: yup
    .array()
    .of(yup.object({ feature: yup.string().required("Feature is required") }))
    .min(1, "At least one feature is required")
    .required("Features are required"),
});

export type FormValues = yup.InferType<typeof Schema>;
type SubmitHandler = (data: ProductRecord) => void;

export function useProductForm(
  submitHandler: SubmitHandler,
  item?: ProductRecord,
) {
  const [description, setDescription] = useState<JSONContent | undefined>(
    item?.description ? JSON.parse(item.description) : undefined,
  );
  const form = useForm<FormValues>({
    resolver: yupResolver(Schema) as Resolver<FormValues>,
    defaultValues: {
      name: item?.name || "",
      description: item?.description || "",
      features: item?.features.map((f) => ({ feature: f })) || [
        { feature: "" },
      ],
    },
  });

  const handleSubmit = async (data: FormValues) => {
    const submitData: ProductRecord = {
      ...item,
      ...data,
      features: data.features.map((f) => f.feature),
      description: JSON.stringify(description),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    submitHandler(submitData);
  };

  return {
    form,
    handleSubmit,
    setDescription,
  };
}
