import { FC, forwardRef } from "react";

export type InputTypeProps = {
  ariaLabelledBy: string | undefined;
  ariaInvalid: boolean | "true" | "false" | "grammar" | "spelling" | undefined;
  registeredName: string;
  divClass: string;
  htmlFor: string;
  text: string;
  type: string;
  id: string;
  inputClass: string;
  placeholder: string;
  isRequired: true,
  register: any
} ;

export const Inputs: FC<InputTypeProps> = forwardRef<
  HTMLInputElement,
  InputTypeProps
>(
  (
    {
      ariaLabelledBy,
      ariaInvalid,
      registeredName,     
      divClass,
      htmlFor,
      text,
      type,
      id,
      inputClass,
      placeholder,
      register, 
      isRequired    
    },
   
  ) => {
    return (
      <div className={`address-line ${divClass}`}>
        <label className="label" htmlFor={htmlFor}>
          {text}
        </label>
        <input
          type={type}
          id={id}
          className={`input ${inputClass}`}
          aria-invalid={ariaInvalid}
          aria-labelledby={ariaLabelledBy}
          placeholder={placeholder}         
          name={registeredName}
          {...register(name, {
            required: {
              value: isRequired,
              message: "IsRequired"
            }
          })}
         
        />
      </div>
    );
  }
);
