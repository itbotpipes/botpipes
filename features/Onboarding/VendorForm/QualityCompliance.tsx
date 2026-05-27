"use client";

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";
import { FormValues } from "./Schema";
import { Input } from "@/components/ui/input";

const options = [
  "ISO 9001",
  "ISO 14001",
  "BIS",
  "CE",
  "UL",
  "FM Approved",
  "None",
];

const OtherQuality: React.FC = () => {
  const { setValue, getValues } = useFormContext<FormValues>();
  const [showInput, setShowInput] = useState(false);
  const [value, setValueLocal] = useState("");

  useEffect(() => {
    if (!showInput) return;

    const existing = (getValues("qualityCompliance") || []) as string[];

    const canonical = new Set(options);

    const filtered = existing.filter(
      (c) => typeof c === "string" && canonical.has(c),
    );

    if (value && value.trim() !== "") {
      const merged = Array.from(new Set([...filtered, value.trim()]));
      // register field name not present in schema — keep runtime-only
      setValue("qualityCompliance", merged, {
        shouldValidate: false,
        shouldDirty: true,
      });
    } else {
      setValue("qualityCompliance", filtered, {
        shouldValidate: false,
        shouldDirty: true,
      });
    }
  }, [value, showInput, getValues, setValue]);

  const onCheckboxChange = () => {
    const willShow = !showInput;
    setShowInput(willShow);
    if (!willShow) {
      const canonical = new Set(options);
      const existing = (getValues("qualityCompliance") || []) as string[];
      const filtered = existing.filter(
        (c) => typeof c === "string" && canonical.has(c),
      );
      setValue("qualityCompliance", filtered, {
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
          placeholder="Specify other quality / certification"
        />
      )}
    </label>
  );
};

interface Props {
  className?: string;
}

const QualityCompliance: React.FC<Props> = ({ className }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormValues>();

  return (
    <section className={clsx("mb-8", className)}>
      <h3 className="mb-8 text-center text-3xl font-medium uppercase">
        Quality & Compliance
      </h3>

      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {options.map((opt) => (
          <label
            key={opt}
            className="inline-flex items-center space-x-2 text-sm"
          >
            <input
              type="checkbox"
              value={opt}
              {...register("qualityCompliance")}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600"
            />
            <span className="text-sm text-gray-700">{opt}</span>
          </label>
        ))}
        <OtherQuality />
      </div>
      {errors.qualityCompliance && (
        <p className="mt-1 text-xs text-red-600">
          {errors.qualityCompliance.message as string}
        </p>
      )}
    </section>
  );
};

export default QualityCompliance;
