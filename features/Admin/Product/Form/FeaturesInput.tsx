import React from "react";
import clsx from "clsx";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { FormValues } from "./useProductForm";

interface FeaturesInputProps {
  className?: string;
}

const FeaturesInput: React.FC<FeaturesInputProps> = ({ className }) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<FormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "features",
  });

  return (
    <div className={clsx("max-w-[20rem]", className)}>
      <div className="flex gap-4">
        <Label className="">Features:</Label>
        <button
          type="button"
          onClick={() => append({ feature: "" })}
          className="inline-flex items-center gap-2 rounded bg-gray-100 px-3 py-2 text-sm text-gray-800 hover:bg-gray-200"
        >
          <Plus size={14} /> Add
        </button>
      </div>

      <div>
        {fields.map((field, indx) => (
          <div key={field.id} className="mt-2">
            <FieldInput
              placeholder="feature name"
              key={field.id}
              {...register(`features.${indx}.feature` as const)}
              idx={indx}
              onRemove={() => remove(indx)}
            />
            {errors.features && errors.features[indx]?.feature && (
              <p className="mt-1 text-sm text-red-600">
                {errors.features[indx]?.feature?.message}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

interface FieldInputProps extends React.ComponentProps<"input"> {
  idx: number;
  onRemove: () => void;
}
const FieldInput: React.FC<FieldInputProps> = ({
  idx,
  placeholder,
  onRemove,
  ...props
}) => {
  return (
    <div key={idx} className="flex items-center gap-2">
      <input
        className="flex-1 rounded border px-3 py-2 text-sm outline-none"
        {...props}
        placeholder={placeholder}
      />
      <button
        type="button"
        aria-label={`Remove item ${idx + 1}`}
        onClick={onRemove}
        className="rounded p-2 text-red-600 hover:bg-red-50"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

export default FeaturesInput;
