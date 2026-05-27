import { JSONContent } from "@tiptap/react";
import { useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BlogRecord, InitialBlogRecord } from "@/lib/firebase/firestore/blogs";

const Schema = yup.object({
  author: yup.string().required("author is required"),
  title: yup.string().required("title is required"),
  slug: yup.string().required("slug is required"),
  category_ids: yup
    .array()
    .of(yup.object({ category: yup.string().required("category required") }))
    .min(1, "must have at least one category")
    .required(),
  excerpt: yup.string().required("excerpt is required"),
  cover_image_url: yup
    .mixed<File | string>()
    .required("cover image is required"),
  tags: yup
    .array()
    .of(yup.object({ tag: yup.string().required("tag is required") }))
    .min(1)
    .required(),
  content: yup.string().required("cotnent is required"),
});

export type FormValues = yup.InferType<typeof Schema>;
export type FormDataType = Omit<InitialBlogRecord, "cover_image_url"> & {
  cover_image_url: {
    file: File | string;
    publicId?: string;
  };
};
type FormSubmitHandler = (data: FormDataType) => void;

export function useBlogForm(
  submitHandler: FormSubmitHandler,
  item?: BlogRecord,
) {
  const [description, setDescription] = useState<JSONContent | undefined>(
    item?.content ? JSON.parse(item.content) : undefined,
  );

  const form = useForm<FormValues>({
    resolver: yupResolver(Schema) as Resolver<FormValues>,
    defaultValues: {
      author: item?.author || "",
      content: item?.content || "",
      title: item?.title || "",
      slug: item?.slug || "",
      category_ids: item?.category_ids.map((id) => ({ category: id })) || [],
      excerpt: item?.excerpt || "",
      tags: item?.tags.map((t) => ({ tag: t })) || [],
      cover_image_url: item?.cover_image_url.secureUrl,
    },
  });

  const handleSubmit = async (data: FormValues) => {
    const { cover_image_url, ...defaultData } = item || {};

    const submitData = {
      created_at: new Date().toISOString(),
      ...defaultData,
      ...data,
      cover_image_url: {
        file: data.cover_image_url,
        publicId: cover_image_url?.publicId,
      },
      content: JSON.stringify(description),
      category_ids: data.category_ids.map((item) => item.category),
      tags: data.tags.map((item) => item.tag),
      updated_at: new Date().toISOString(),
      sub_category_id: "",
      is_draft: false,
    };

    submitHandler(submitData);
  };

  return { setDescription, form, handleSubmit };
}
