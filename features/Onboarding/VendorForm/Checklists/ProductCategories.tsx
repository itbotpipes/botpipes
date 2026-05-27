"use client";

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";
import { FormValues } from "../Schema";
import { Input } from "@/components/ui/input";

interface ProductCategoriesProps {
  className?: string;
}

const cats = [
  "Steel Pipes & Tubes",
  "Pipe Fittings & Connectors",
  "Fire Protection Components",
  "Coatings & Paints",
  "Welding Consumables",
  "Cutting & Machining Supplies",
  "Quality Control Equipment",
  "Packaging Materials",
  "Logistics Services",
  "Maintenance & Technical Services",
  "Professional Services",
  "IT & Software",
];

const OtherCategories: React.FC = () => {
  const { setValue, getValues } = useFormContext<FormValues>();
  const [showInput, setShowInput] = useState(false);
  const [value, setValueLocal] = useState<string>("");

  useEffect(() => {
    if (!showInput) return;

    const existing = (getValues("businessInfo.categories") || []) as string[];

    const canonical = new Set(cats);

    const filtered = existing.filter(
      (c) => typeof c === "string" && canonical.has(c),
    );

    if (value && value.trim() !== "") {
      const merged = Array.from(new Set([...filtered, value.trim()]));
      setValue("businessInfo.categories", merged, {
        shouldValidate: false,
        shouldDirty: true,
      });
    } else {
      setValue("businessInfo.categories", filtered, {
        shouldValidate: false,
        shouldDirty: true,
      });
    }
  }, [value, showInput, getValues, setValue]);

  const onCheckboxChange = () => {
    const willShow = !showInput;
    setShowInput(willShow);
    if (!willShow) {
      const canonical = new Set(cats);
      const existing = (getValues("businessInfo.categories") || []) as string[];
      const filtered = existing.filter(
        (c) => typeof c === "string" && canonical.has(c),
      );
      setValue("businessInfo.categories", filtered, {
        shouldValidate: false,
        shouldDirty: true,
      });
      setValueLocal("");
    }
  };

  return (
    <label className="inline-flex items-center space-x-2">
      <input
        type="checkbox"
        checked={showInput}
        className="min-h-4 min-w-4 rounded border-gray-300 text-indigo-600"
        onChange={onCheckboxChange}
      />
      <span className="text-sm text-gray-700">Others</span>
      {showInput && (
        <Input
          value={value}
          onChange={(e) => setValueLocal(e.target.value)}
          placeholder="Specify other categories"
        />
      )}
    </label>
  );
};

const ProductCategories: React.FC<ProductCategoriesProps> = ({ className }) => {
  const { register } = useFormContext<FormValues>();

  return (
    <div className={clsx("", className)}>
      <label className="mb-2 block text-sm font-medium">
        Product/Service Categories (Select all that apply)
      </label>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {cats.map((cat) => (
          <label key={cat} className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              value={cat}
              {...register("businessInfo.categories")}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600"
            />
            <span className="text-sm text-gray-700">{cat}</span>
          </label>
        ))}
        <OtherCategories />
      </div>
    </div>
  );
};

export default ProductCategories;
