import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import {
  GalleryRecord,
  InitialGalleryRecord,
} from "@/lib/firebase/firestore/gallery";

const Schema = yup.object({
  name: yup.string().required("name is required"),
  image: yup.mixed<File | string>().required("image is required"),
});

export type FormValues = yup.InferType<typeof Schema>;
export interface FormDataType extends Omit<InitialGalleryRecord, "image"> {
  image: {
    publicId?: string;
    file: File | string;
  };
}
type FormSubmitHandler = (data: FormDataType) => void;

export function useGalleryForm(
  submitHandler: FormSubmitHandler,
  item?: GalleryRecord,
) {
  const { loading } = useSelector((state: RootState) => state.testimonial);
  const form = useForm<FormValues>({
    resolver: yupResolver(Schema) as Resolver<FormValues>,
    defaultValues: {
      name: item?.name || "",
      image: item?.image?.secureUrl || "",
    },
  });

  const handleSubmit = async (formData: FormValues) => {
    const { image, ...initialData } = item || {};

    const submitData = {
      created_at: new Date().toISOString(),
      ...initialData,
      ...formData,
      image: {
        publicId: image?.publicId,
        file: formData.image,
      },
      updated_at: new Date().toISOString(),
    };

    submitHandler(submitData);
  };

  return { form, handleSubmit, sending: loading };
}
