import React from "react";
import { Inputs, InputProps } from "./Inputs";

export type FormInputProps = InputProps;


export const FormInput = ({ ...props }: FormInputProps): JSX.Element => {
  return (
    <div className={"form-inputs"} aria-live="polite">
      <Inputs {...props} />
    </div>
  );
};
