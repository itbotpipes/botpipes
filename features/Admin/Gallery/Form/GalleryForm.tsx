"use client";

import React from "react";
import clsx from "clsx";
import { FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormDataType, useGalleryForm } from "./useGalleryForm";
import FieldInput from "../../FieldInput";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { GalleryRecord } from "@/lib/firebase/firestore/gallery";
import ImageField from "./ImageField";

interface GalleryFormProps {
  className?: string;
  initialData?: GalleryRecord;
  submitHandler: (data: FormDataType) => void;
}

const GalleryForm: React.FC<GalleryFormProps> = ({
  className,
  initialData,
  submitHandler,
}) => {
  const { loading } = useSelector((state: RootState) => state.faq);

  const { form, handleSubmit } = useGalleryForm(submitHandler, initialData);

  return (
    <div className={clsx("", className)}>
      <FormProvider {...form}>
        <form
          className={clsx("space-y-10", className)}
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div className="grid gap-6">
            <FieldInput
              label="Name"
              placeholder="enter name"
              control={form.control}
              name={"name"}
            />

            <ImageField />
          </div>
          <Button disabled={loading} className="cursor-pointer" type="submit">
            Submit
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default GalleryForm;
