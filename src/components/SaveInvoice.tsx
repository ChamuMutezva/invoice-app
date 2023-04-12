import React, { useEffect, useRef } from "react";
import IconClose from "../assets/icon-close.svg";
import FocusTrap from "focus-trap-react";
function SaveInvoice(props: {
  openUpdateInvoice: boolean;
  exitWithoutSavingInvoice: React.MouseEventHandler<HTMLButtonElement>;  
  saveConfirmation: React.MouseEventHandler<HTMLButtonElement>;
}) {
    const btnRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
      if (props.openUpdateInvoice) {
        btnRef.current?.focus();
      }
    }, [props.openUpdateInvoice]);
  return (
    <div
      className={`modal-wrapper ${
        props.openUpdateInvoice ? "show-modal" : ""
      } `}
    >
      <FocusTrap active={props.openUpdateInvoice}>
        <div className="delete-confirmation">
          <button
            type="button"
            className="btn delete-close"
            onClick={props.exitWithoutSavingInvoice}
          >
            <img src={IconClose} alt="Close without saving invoice" />
          </button>

          <h4 id="modal-heading-delete" className="modal-heading">
            Save the edited invoice!
          </h4>
          <p id="modal-heading-text" className="modal-text">
            Are you sure you want to save the{" "}
            <span className="modal-text-ID">edited</span> invoice This action
            cannot be reversed.
          </p>
          <button
            type="button"
            aria-labelledby="modal-heading-text"
            className="btn btn-confirm-delete"
            onClick={props.saveConfirmation}
          >
            Confirm & Save
          </button>
        </div>
      </FocusTrap>
    </div>
  );
}

export default SaveInvoice;
