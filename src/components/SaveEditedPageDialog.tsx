import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function SaveEditedPageDialog(props: { showConfirmSave: boolean; }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const dialogNode = dialogRef.current;

    if (props.showConfirmSave) {
      dialogNode?.showModal();
      linkRef.current?.focus();
    } else {
      dialogNode?.close();
    }
  }, [props.showConfirmSave]);
  return (
    <dialog
      ref={dialogRef}
      className={`modal-wrapper ${
        props.showConfirmSave ? "show-modal show-dialog" : ""
      }`}
    >
      <p id="modal-heading-text" className="modal-text">
        The invoice has been updated!
      </p>
      <Link ref={linkRef} className={`btn btn-link-home`} to={`/`}>
        Return to Homepage
      </Link>
    </dialog>
  );
}

export default SaveEditedPageDialog;
