import React, { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Trash2, Plus } from "lucide-react";
import { Label } from "./ui/label";

interface StringListInputProps {
  className?: string;
  value?: string[];
  onChange?: (values: string[]) => void;
  placeholder?: string;
}

const StringListInput: React.FC<StringListInputProps> = ({
  className,
  value,
  onChange,
  placeholder = "Enter value",
}) => {
  const [items, setItems] = useState<string[]>(() =>
    value && value.length ? value : [""],
  );
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    // Keep internal state in sync when controlled value changes
    if (value && JSON.stringify(value) !== JSON.stringify(items)) {
      setItems(value.length ? value : [""]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const triggerChange = useCallback(
    (next: string[]) => {
      setItems(next);
      onChange?.(next.filter((s) => s !== ""));
    },
    [onChange],
  );

  const handleChange = (index: number, v: string) => {
    const next = [...items];
    next[index] = v;
    triggerChange(next);
  };

  const handleAdd = () => {
    const next = [...items, ""];
    triggerChange(next);
    // focus the new input on next tick
    setTimeout(() => {
      const last = inputRefs.current[inputRefs.current.length - 1];
      last?.focus();
    }, 0);
  };

  const handleRemove = (index: number) => {
    const next = items.filter((_, i) => i !== index);
    triggerChange(next.length ? next : [""]);
  };

  return (
    <div className={clsx("space-y-2", className)}>
      <div className="flex gap-4">
        <Label className="">Features:</Label>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-2 rounded bg-gray-100 px-3 py-2 text-sm text-gray-800 hover:bg-gray-200"
        >
          <Plus size={14} /> Add
        </button>
      </div>

      {items.map((it, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <input
            ref={(el) => {
              inputRefs.current[idx] = el;
              return;
            }}
            className="flex-1 rounded border px-3 py-2 text-sm outline-none"
            value={it}
            placeholder={placeholder}
            onChange={(e) => handleChange(idx, e.target.value)}
          />
          <button
            type="button"
            aria-label={`Remove item ${idx + 1}`}
            onClick={() => handleRemove(idx)}
            className="rounded p-2 text-red-600 hover:bg-red-50"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default StringListInput;
