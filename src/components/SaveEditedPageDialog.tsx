import { MouseEventHandler, useEffect, useRef } from "react";

function SaveEditedPageDialog(props: {
	closeDialog: MouseEventHandler<HTMLButtonElement>;
	showConfirmSave: boolean;
}) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const btnRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		const dialogNode = dialogRef.current;

		if (props.showConfirmSave) {
			dialogNode?.showModal();
			btnRef.current?.focus();
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
			{" "}
			<div className="dialog-container">
				<p
					id="modal-heading-text"
					className="modal-text"
				>
					The invoice has been updated!
				</p>
				<button
					ref={btnRef}
					onClick={props.closeDialog}
					className={`btn btn-link-home`}
				>
					Return to Homepage
				</button>
			</div>
		</dialog>
	);
}

export default SaveEditedPageDialog;
