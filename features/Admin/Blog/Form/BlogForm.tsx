"use client";

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { FormProvider, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import DescriptionEditor from "../../DescriptionEditor";
import FieldInput from "../../FieldInput";
import { FormDataType, FormValues, useBlogForm } from "./useBlogForm";
import { BlogRecord } from "@/lib/firebase/firestore/blogs";
import TagsInput from "./TagInput";
import CategoryInput from "./CategoryInput";
import { Label } from "@/components/ui/label";
import CoverImageField from "./CoverImageField";

interface BlogFormProps {
  className?: string;
  submitHandler: (data: FormDataType) => void;
  defaultValues?: BlogRecord;
}

const BlogForm: React.FC<BlogFormProps> = ({
  className,
  submitHandler,
  defaultValues,
}) => {
  const { loading } = useSelector((state: RootState) => state.career);

  const { form, setDescription, handleSubmit } = useBlogForm(
    submitHandler,
    defaultValues
  );

  return (
    <div className={clsx("", className)}>
      <FormProvider {...form}>
        <form
          className={clsx("space-y-10", className)}
          onSubmit={form.handleSubmit(handleSubmit, (err) =>
            console.log("FORM ERRORS:", err)
          )}
        >
          <div className="grid gap-6">
            <CoverImageField />

            <FieldInput
              label="Blog Title"
              placeholder="Enter title"
              control={form.control}
              name="title"
            />

            <FieldInput
              label="Blog Author"
              placeholder="Enter author"
              control={form.control}
              name="author"
            />

            <FieldInput
              label="Slug"
              placeholder="Enter slug"
              control={form.control}
              name="slug"
            />

            <CategoryField />

            <FieldInput
              label="Excerpt"
              placeholder="Enter excerpt"
              control={form.control}
              name="excerpt"
            />

            <TagsInput />

            <DescriptionEditor
              label="Content"
              name="content"
              onValueChange={setDescription}
              control={form.control}
              className="mt-4"
            />
          </div>

          <Button disabled={loading} className="cursor-pointer" type="submit">
            Submit
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

const CategoryField = () => {
  const {
    setValue,
    register,
    formState: { errors },
  } = useFormContext<FormValues>();

  const [selected, setSelected] = useState<string>(""); // single select
  const { categories } = useSelector((state: RootState) => state.category);

  //  MUST REGISTER FIELD (MAIN FIX)
  useEffect(() => {
    register("category_ids", {
      required: "Category is required",
    });
  }, [register]);

  return (
    <div className="space-y-5">
      <Label className="mb-2 block font-medium">Category:</Label>

      <CategoryInput
        options={categories.map((cat) => ({
          value: cat.id,
          label: cat.name,
        }))}

        // component expects array → convert single to array
        selected={selected ? [selected] : []}

        onChange={(value) => {
          const selectedValue = value[0] || ""; //  force single

          setSelected(selectedValue);

       setValue(
  "category_ids",
  [{ category: selectedValue }],
  { shouldValidate: true, shouldDirty: true }
);
        }}
      />

      {errors.category_ids && (
        <p className="mt-1 text-sm text-red-600">
          {errors.category_ids.message as string}
        </p>
      )}
    </div>
  );
};

export default BlogForm;