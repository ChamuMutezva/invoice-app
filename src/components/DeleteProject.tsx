import React, { useEffect, useRef } from "react";
import IconClose from "../assets/icon-close.svg";

function DeleteProject(props: {
	name: string;
	deleteProjectConfirmation: React.MouseEventHandler<HTMLButtonElement>;
	exitWithoutDeletingProject: React.MouseEventHandler<HTMLButtonElement>;
	showDeleteProjectDialog: boolean;
}) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	useEffect(() => {
		const dialogNode = dialogRef.current;
		if (props.showDeleteProjectDialog) {
			dialogNode?.showModal();
		} else {
			dialogNode?.close();
		}
	}, [props.showDeleteProjectDialog]);
	return (
		<dialog
			ref={dialogRef}
			className={`modal-wrapper ${
				props.showDeleteProjectDialog ? "show-modal" : ""
			} `}
		>
			<div className="dialog-container">
				<button
					type="button"
					className="btn btn-delete-close"
					onClick={props.exitWithoutDeletingProject}
				>
					<img
						src={IconClose}
						alt="Close without deleting project"
						width={"24px"}
						height={"24px"}
					/>
				</button>

				<h3
					id="modal-heading-delete"
					className="dialog-title"
				>
					Delete project {props.name} from invoice?
				</h3>
				<p
					id="modal-heading-text"
					className="dialog-content"
				>
					Are you sure you want to delete the{" "}
					<span className="modal-text-ID">{}</span> project and its
					contents? This action cannot be reversed.
				</p>
				<button
					type="button"
					aria-labelledby="modal-heading-text"
					className="btn btn-delete-view"
					onClick={props.deleteProjectConfirmation}
				>
					Confirm & Delete
				</button>
			</div>
		</dialog>
	);
}

export default DeleteProject;
