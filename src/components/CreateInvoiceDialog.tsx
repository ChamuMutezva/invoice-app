import { MouseEventHandler, useEffect, useRef } from "react";

function CreateInvoiceDialog(props: {
	closeDialog: MouseEventHandler<HTMLButtonElement>;
	showCreateInvoiceDialog: boolean;
}) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const btnRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		const dialogNode = dialogRef.current;

		if (props.showCreateInvoiceDialog) {
			dialogNode?.showModal();
			btnRef.current?.focus();
		} else {
			dialogNode?.close();
		}
	}, [props.showCreateInvoiceDialog]);

	return (
		<dialog
			ref={dialogRef}
			className={`modal-wrapper ${
				props.showCreateInvoiceDialog ? "show-modal show-dialog" : ""
			}`}
		>
			<div className="dialog-container">
				<p
					id="modal-heading-text"
					className="modal-text"
				>
					A new invoice has been created
				</p>

				<button
					ref={btnRef}
					onClick={() => props.closeDialog}
					className={`btn btn-link-home`}
				>
					Return to Homepage
				</button>
			</div>
		</dialog>
	);
}

export default CreateInvoiceDialog;
