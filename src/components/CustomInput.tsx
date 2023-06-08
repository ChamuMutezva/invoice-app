import React from "react";
import { useController } from "react-hook-form";

type CustomInputProps = {
	name: string;
	control: any;
	rules?: any;
	labelText: string;
	type: string;
	className: string;
	disabled: boolean;
};

const CustomInput = ({
	name,
	control,
	rules,
	labelText,
	type,
	className,
	disabled,
}: CustomInputProps) => {
	const {
		field: { onChange, onBlur, value, ref },
		fieldState: { error },
	} = useController({ name, control, rules });

	return (
		<div className={`form-input-wrapper`}>
			<label
				className={`label ${error ? "form-errors" : ""}`}
				htmlFor={name}
			>
				{labelText}
			</label>
			<input
				type={type}
				id={name}
				className={`input ${className}`}
				onChange={onChange}
				onBlur={onBlur}
				value={value}
				ref={ref}
				disabled={disabled}
				aria-describedby={`${name}-err`}
			/>
			{error && (
				<p
					role="alert"
					id={`${name}-err`}
					className="input-error form-errors"
				>
					{error.message}
				</p>
			)}
		</div>
	);
};

export default CustomInput;
