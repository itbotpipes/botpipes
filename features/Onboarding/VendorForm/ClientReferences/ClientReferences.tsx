import React from "react";
import ReferenceItem from "./ReferenceItem";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormValues } from "../Schema";
import { Button } from "@/components/ui/button";

const ClientReferences: React.FC = () => {
  const { control } = useFormContext<FormValues>();
  // local state not needed; updates go directly into form values

  const { fields, append, remove } = useFieldArray({
    control,
    name: "clientReferences",
  });

  return (
    <section className="mb-8">
      <h3 className="mb-8 text-center text-3xl font-medium uppercase">
        Client References
      </h3>

      <div className="mb-8">
        <Button
          type="button"
          onClick={() =>
            append({
              companyName: "",
              contactPerson: "",
              phoneEmail: "",
              productsSupplied: "",
            })
          }
        >
          Add
        </Button>
      </div>

      <div className="space-y-8">
        {fields.map((item, indx) => (
          <ReferenceItem
            key={item.id}
            index={indx + 1}
            onRemoveField={() => remove(indx)}
          />
        ))}
      </div>
    </section>
  );
};

export default ClientReferences;
