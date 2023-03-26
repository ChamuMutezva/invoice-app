import React from "react";

function Inputs(props: {
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
        placeholder={props.placeholder}
      />
    </div>
  );
}

export default Inputs;
