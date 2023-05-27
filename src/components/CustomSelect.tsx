import React from "react";
import { useController } from "react-hook-form";

type CustomSelectProps = {
  name: string;
  control: any;
  rules?: any;
  options: { value: number; label: string }[];
};

const CustomSelect = ({ name, control, rules, options }: CustomSelectProps) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({ name, control, rules });

  return (
    <div className="form-input-wrapper select-wrapper">
      <label htmlFor={name} className={`label ${error ? "form-errors" : ""}`}>
        Payment Terms
      </label>
      <select
        id={name}
        className="input select"
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        ref={ref}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span>{error.message}</span>}
    </div>
  );
};

export default CustomSelect;
