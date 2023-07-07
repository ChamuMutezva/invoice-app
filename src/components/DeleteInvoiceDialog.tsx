import React, { useEffect, useRef } from "react";

function DeleteInvoiceDialog(props: {
  invoiceID: string;
  showDeleteInvoiceDialog: boolean;
  cancelDelete: React.MouseEventHandler<HTMLButtonElement>;
  confirmDelete: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const dialogNode = dialogRef.current;

    if (props.showDeleteInvoiceDialog) {
      dialogNode?.showModal();
      linkRef.current?.focus();
    } else {
      dialogNode?.close();
    }
  }, [props.showDeleteInvoiceDialog]);
  return (
    <dialog
      ref={dialogRef}
      className={`modal-wrapper ${
        props.showDeleteInvoiceDialog ? "show-modal show-dialog" : ""
      }`}
    >
      <div className="dialog-container">
        <h3 className="dialog-title">Confirm Deletion</h3>
        <p className="dialog-content">
          Are you sure you want to delete invoice #{props.invoiceID} This action
          cannot be undone.
        </p>
        <div className="flex button-container">
          <button className="btn btn-cancel" onClick={props.cancelDelete}>
            Cancel
          </button>
          <button className="btn btn-delete-view" onClick={props.confirmDelete}>
            Delete
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default DeleteInvoiceDialog;
