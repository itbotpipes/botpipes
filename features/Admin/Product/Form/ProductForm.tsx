"use client";

import React from "react";
import clsx from "clsx";
import { FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ProductRecord } from "@/lib/firebase/firestore/products";
import NameInput from "./NameInput";
import FeaturesInput from "./FeaturesInput";
import DescriptionEditor from "../../DescriptionEditor";
import { useProductForm } from "./useProductForm";

interface ProductFormProps {
  className?: string;
  submitHandler: (data: ProductRecord) => void;
  initialData?: ProductRecord;
}

const ProductForm: React.FC<ProductFormProps> = ({
  className,
  submitHandler,
  initialData,
}) => {
  const { form, handleSubmit, setDescription } = useProductForm(
    submitHandler,
    initialData,
  );

  return (
    <FormProvider {...form}>
      <form
        className={clsx("space-y-10", className)}
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="grid gap-6">
          <NameInput />

          <FeaturesInput />

          <DescriptionEditor
            onValueChange={setDescription}
            control={form.control}
            name="description"
            className="mt-4"
          />
        </div>
        <Button className="cursor-pointer" type="submit">
          Submit
        </Button>
      </form>
    </FormProvider>
  );
};

export default ProductForm;
