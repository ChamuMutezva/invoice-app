import React, { FC, forwardRef } from "react";

export type InputProps = {
  ariaLabelledBy: string | undefined;
  ariaInvalid: boolean | "true" | "false" | "grammar" | "spelling" | undefined;
  registeredName: string;
  htmlFor: string;
  textLabel: string;
  type: string;
  id: string;
  placeholder: string;
  isRequired: true | string;
  register: any;
  errorRef: any;
  errorMessage: any;
};

export const Inputs: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      ariaLabelledBy,
      ariaInvalid,
      registeredName,
      htmlFor,
      textLabel,
      type,
      id,
      placeholder,
      isRequired,
      errorRef,
      errorMessage,
      register,
    },
    ref
  ) => {
    return (
      <div className={`form-input-wrapper`}>
        <label className="label" htmlFor={htmlFor}>
          {textLabel}
        </label>
        <input
          type={type}
          id={id}
          className="input"
          ref={ref}
          aria-invalid={ariaInvalid}
          aria-labelledby={ariaLabelledBy}
          placeholder={placeholder}
          {...register(registeredName, {
            required: {
              value: isRequired,
              message: isRequired,
            },
          })}
        />

        {errorRef && (
          <p role="alert" id="sender-street" className="form-errors">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

