import React from "react";
import { Path, useFormContext } from "react-hook-form";
import { FormValues } from "../Schema";

interface RadioItemProps extends React.InputHTMLAttributes<HTMLInputElement> {
  opt: { id: string; label: string };
  name: Path<FormValues>;
}
const RadioItem = ({ opt, name }: RadioItemProps) => {
  const { register } = useFormContext<FormValues>();
  return (
    <li>
      <label className="inline-flex items-center space-x-3">
        <input
          type="radio"
          value={opt.id}
          {...register(name)}
          className="h-4 w-4 text-indigo-600"
        />
        <span className="text-sm text-gray-700">{opt.label}</span>
      </label>
    </li>
  );
};
export default RadioItem;
