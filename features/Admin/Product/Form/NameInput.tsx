import React from "react";
import clsx from "clsx";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { FormValues } from "./useProductForm";

interface NameInputProps {
  className?: string;
}

const NameInput: React.FC<NameInputProps> = ({ className }) => {
  const form = useFormContext<FormValues>();

  return (
    <div className={clsx("grid gap-3", className)}>
      <Label htmlFor="name-1">Name</Label>
      <Input
        {...form.register("name")}
        id="name-1"
        name="name"
        className="max-w-[30rem]"
        placeholder="Product name"
      />
      {form.formState.errors.name && (
        <p className="text-sm text-red-600">
          {form.formState.errors.name.message}
        </p>
      )}
    </div>
  );
};

export default NameInput;
