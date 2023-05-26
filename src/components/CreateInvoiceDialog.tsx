import { MouseEventHandler, useEffect, useRef } from "react";

function CreateInvoiceDialog(props: {
	closeDialog: MouseEventHandler<HTMLButtonElement>;
	showDialog: boolean;
}) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const btnRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		const dialogNode = dialogRef.current;

		if (props.showDialog) {
			dialogNode?.showModal();
			btnRef.current?.focus();
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
			<div className="dialog-container">
				<p
					id="modal-heading-text"
					className="modal-text"
				>
					A new invoice has been created
				</p>

				<button
					ref={btnRef}
					className={`btn btn-link-home`}
					onClick={props.closeDialog}
				>
					Return to Homepage
				</button>
			</div>
		</dialog>
	);
}

export default CreateInvoiceDialog;
