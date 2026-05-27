"use client";

import React from "react";
import clsx from "clsx";
import { FormProvider } from "react-hook-form";
import DescriptionEditor from "../../DescriptionEditor";
import { Button } from "@/components/ui/button";
import { useFaqForm } from "./useFaqForm";
import FieldInput from "../../FieldInput";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { FaqRecord } from "@/lib/firebase/firestore/faq";
import CheckBoxField from "../../CheckBoxField";

interface FaqFormProps {
  className?: string;
  initialData?: FaqRecord;
  submitHandler: (data: FaqRecord) => void;
}

const FaqForm: React.FC<FaqFormProps> = ({
  className,
  initialData,
  submitHandler,
}) => {
  const { loading } = useSelector((state: RootState) => state.faq);

  const { form, setDescription, handleSubmit } = useFaqForm(
    submitHandler,
    initialData,
  );

  return (
    <div className={clsx("", className)}>
      <FormProvider {...form}>
        <form
          className={clsx("space-y-10", className)}
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div className="grid gap-6">
            <FieldInput
              label="Question"
              placeholder="enter question"
              control={form.control}
              name={"question"}
            />

            <CheckBoxField
              label="Show in Homepage"
              control={form.control}
              name="homepage"
            />

            <CheckBoxField
              label="Show in Career Page"
              control={form.control}
              name="career"
            />

            <DescriptionEditor
              label="Answer"
              onValueChange={setDescription}
              name="description"
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

export default FaqForm;
