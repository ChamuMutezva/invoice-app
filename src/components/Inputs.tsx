import React, { ChangeEventHandler, LegacyRef } from "react";
import { useForm } from "react-hook-form";

function Inputs(props: {
  register: any;
  ariaLabelledBy: string | undefined;
  ariaInvalid: boolean | "true" | "false" | "grammar" | "spelling" | undefined;
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
  value: string | number;
  divClass: string;
  htmlFor: string;
  text: string;
  type: string;
  id: string;
  inputClass: string;
  placeholder: string;
}) {
  return (
    <div className={`address-line ${props.divClass}`}>
      <label className="label" htmlFor={props.htmlFor}>
        {props.text}
      </label>
      <input
        type={props.type}
        id={props.id}
        className={`input ${props.inputClass}`}
        aria-invalid={props.ariaInvalid}
        aria-labelledby={props.ariaLabelledBy}
        placeholder={props.placeholder}
        {...register("senderAddress.street", {
          required: "Street address is required",
          minLength: 4,
        })}
        value={props.value}
        onChange={props.onChange}
        name={props.name}
      />
    </div>
  );
}

export default Inputs;
function register(arg0: string, arg1: { required: string; minLength: number; }): JSX.IntrinsicAttributes & React.ClassAttributes<HTMLInputElement> & React.InputHTMLAttributes<HTMLInputElement> {
  throw new Error("Function not implemented.");
}

