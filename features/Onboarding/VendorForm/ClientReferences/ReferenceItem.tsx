import React from "react";
import clsx from "clsx";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ReferenceSchemaType } from "../Schema";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { useController } from "react-hook-form";

interface ReferenceItemProps {
  className?: string;
  index?: number;
  onRemoveField?: () => void;
}

const ReferenceItem: React.FC<ReferenceItemProps> = ({
  className,
  index = 1,
  onRemoveField,
}) => {
  return (
    <div className={clsx("space-y-4", className)}>
      <div className="flex justify-between">
        <h4 className="text-sm font-semibold">REFERENCE {index}</h4>
        {index !== 1 && (
          <Button
            type="button"
            onClick={onRemoveField}
            variant="outline"
            size={"icon"}
          >
            <TrashIcon />
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label className="mb-1 block text-xs font-medium">COMPANY NAME</Label>
          <ReferenceInput
            indx={index - 1}
            name="companyName"
            placeholder="Company Name"
          />
        </div>

        <div>
          <Label className="mb-1 block text-xs font-medium">
            CONTACT PERSON
          </Label>
          <ReferenceInput
            indx={index - 1}
            name="contactPerson"
            placeholder="Contact Person"
          />
        </div>

        <div>
          <Label className="mb-1 block text-xs font-medium">PHONE/EMAIL</Label>
          <ReferenceInput
            indx={index - 1}
            name="phoneEmail"
            placeholder="Phone/Email"
          />
        </div>

        <div>
          <Label className="mb-1 block text-xs font-medium">
            PRODUCTS/SERVICES SUPPLIED
          </Label>
          <ReferenceInput
            indx={index - 1}
            name="productsSupplied"
            placeholder="Products/Services Supplied"
          />
        </div>
      </div>
    </div>
  );
};

interface ReferenceInputProps extends React.ComponentProps<"input"> {
  indx: number;
  name: keyof ReferenceSchemaType;
}
const ReferenceInput: React.FC<ReferenceInputProps> = ({
  indx,
  name,
  placeholder,
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name: `clientReferences.${indx}.${name}` as const,
  });

  return (
    <>
      <Input placeholder={placeholder} {...field} />
      {error && (
        <p className="mt-1 text-xs text-red-600">{error.message as string}</p>
      )}
    </>
  );
};

export default ReferenceItem;
