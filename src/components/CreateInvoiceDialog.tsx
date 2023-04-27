import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function CreateInvoiceDialog(props: { showDialog: boolean }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const dialogNode = dialogRef.current;

    if (props.showDialog) {
      dialogNode?.showModal();
      linkRef.current?.focus()
    } else {
      dialogNode?.close();
    }
  }, [props.showDialog]);
  return (
    <dialog
      ref={dialogRef}
      className={`modal-wrapper ${
        props.showDialog ? "show-modal show-dialog" : ""
      }`}
    >
      <p id="modal-heading-text" className="modal-text">
        A new invoice has been created
      </p>
      <Link ref={linkRef} className={`btn btn-link-home`} to={`/`}>
        Return to Homepage
      </Link>
    </dialog>
  );
}

export default CreateInvoiceDialog;
