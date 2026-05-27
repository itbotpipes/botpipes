import { JSONContent } from "@tiptap/react";
import { useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { FaqRecord } from "@/lib/firebase/firestore/faq";

const Schema = yup.object({
  question: yup.string().required("Question is required"),
  description: yup.string().required("Answer is required"),
  homepage: yup.boolean().required(),
  career: yup.boolean().required(),
});

export type FormValues = yup.InferType<typeof Schema>;
type FormSubmitHandler = (data: FaqRecord) => void;

export function useFaqForm(submitHandler: FormSubmitHandler, item?: FaqRecord) {
  const { loading } = useSelector((state: RootState) => state.testimonial);
  const [description, setDescription] = useState<JSONContent | undefined>(
    item?.description ? JSON.parse(item.description) : undefined,
  );
  const form = useForm<FormValues>({
    resolver: yupResolver(Schema) as Resolver<FormValues>,
    defaultValues: {
      question: item?.question || "",
      description: item?.description || "",
      homepage: item?.homepage || false,
      career: item?.career || false,
    },
  });

  const handleSubmit = async (data: FormValues) => {
    const submitData = {
      ...item,
      ...data,
      description: JSON.stringify(description),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    submitHandler(submitData);
  };

  return { setDescription, form, handleSubmit, sending: loading };
}
