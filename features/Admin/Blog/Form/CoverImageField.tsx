import React, { useState } from "react";
import clsx from "clsx";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/shadcn-io/dropzone";
import { useController, useFormContext } from "react-hook-form";
import { FormValues } from "./useBlogForm";
import { Label } from "@/components/ui/label";

interface CoverImageFieldProps {
  className?: string;
}

const CoverImageField: React.FC<CoverImageFieldProps> = ({ className }) => {
  const [file, setFile] = useState<File | undefined>();
  const { control, setValue } = useFormContext<FormValues>();
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name: "cover_image_url",
  });

  const handleDrop = (incoming: File) => {
    setFile(incoming);
    setValue("cover_image_url", incoming, { shouldValidate: true });
  };

  return (
    <div className={clsx("max-w-[40rem] space-y-5", className)}>
      <Label>Cover Image</Label>

      <Dropzone
        accept={{
          "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"],
        }}
        maxFiles={1}
        maxSize={1024 * 1024 * 10}
        minSize={1024}
        onDrop={(f: File[]) => {
          if (f.length !== 1) return;
          field.onChange(f[0]);
          handleDrop(f[0]);
        }}
        onError={console.error}
        src={file ? [file] : []}
      >
        <DropzoneEmptyState />
        <DropzoneContent />
      </Dropzone>

      {error && <p className="text-sm text-red-600">{error.message}</p>}
    </div>
  );
};

export default CoverImageField;
