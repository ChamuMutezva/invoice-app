import React from "react";
import { useController } from "react-hook-form";

type FormValues = {
  name: string;
};

type CustomInputProps = {
  name: string;
  control: any;
  rules?: any;
  labelText: string;
  type: string;
};

const CustomInput = ({
  name,
  control,
  rules,
  labelText,
  type,
}: CustomInputProps) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({ name, control, rules });

  return (
    <div className={`form-input-wrapper`}>
      <label className={`label ${error ? "form-errors" : ""}`} htmlFor={name}>
        {labelText}
      </label>
      <input
        type={type}
        id={name}
        className="input"
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        ref={ref}
      />
      {error && (
        <p role="alert" id={`${name}-err`} className="form-errors">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default CustomInput;
