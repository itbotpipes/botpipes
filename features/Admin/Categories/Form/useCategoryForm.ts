import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CategoryRecord } from "@/lib/firebase/firestore/categories";

const Schema = yup.object({
  name: yup.string().required("Name is required"),
});

export type FormValues = yup.InferType<typeof Schema>;
type FormSubmitHandler = (
  data: CategoryRecord | Omit<CategoryRecord, "id">,
) => void;

export function useCategoryForm(
  submitHandler: FormSubmitHandler,
  item?: CategoryRecord,
) {
  const form = useForm<FormValues>({
    resolver: yupResolver(Schema) as Resolver<FormValues>,
    defaultValues: {
      name: item?.name || "",
    },
  });

  const handleSubmit = async (data: FormValues) => {
    const submitData = {
      ...item,
      ...data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    submitHandler(submitData);
  };

  return { form, handleSubmit };
}
