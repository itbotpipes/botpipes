import { Input } from "@/components/ui/input";
import React from "react";
import { FormValues } from "../Schema";
import { Path, useFormContext } from "react-hook-form";

interface RadioItemWithFieldProps {
  name: Path<FormValues>;
  children: string;
  customStartingValue?: string;
  optionIds: string[];
}
const RadioItemWithField: React.FC<RadioItemWithFieldProps> = ({
  name,
  children,
  customStartingValue = "others",
  optionIds,
}) => {
  const { watch, setValue } = useFormContext<FormValues>();
  const selected = watch(name);
  const setFieldValue = (value: string) => {
    setValue(name, `${customStartingValue}: ${value}`);
  };

  return (
    <li>
      <label className="inline-flex items-center space-x-3">
        <input
          type="radio"
          value={"other"}
          onChange={() => setValue(name, `${customStartingValue}: `)}
          name={name}
          checked={
            typeof selected === "string" &&
            selected?.startsWith(customStartingValue)
          }
          className="h-4 w-4 text-indigo-600"
        />
        <span className="text-sm text-gray-700"> {children}</span>
        {selected &&
          !optionIds.includes(typeof selected === "string" ? selected : "") && (
            <div>
              <Input
                type="text"
                placeholder="Please specify"
                onChange={(e) => setFieldValue(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
          )}
      </label>
    </li>
  );
};

export default RadioItemWithField;
