import React, { useEffect, useRef } from "react";
import IconClose from "../assets/icon-close.svg";

function DeleteProject(props: {
	name: string;
	deleteProjectConfirmation: React.MouseEventHandler<HTMLButtonElement>;
	exitWithoutDeletingProject: React.MouseEventHandler<HTMLButtonElement>;
	showDeleteProjectDialog: boolean;
}) {
	// const btnRef = useRef<HTMLButtonElement>(null);
	const dialogRef = useRef<HTMLDialogElement>(null);
	// const linkRef = useRef<HTMLAnchorElement>(null);

	useEffect(() => {
		const dialogNode = dialogRef.current;

		if (props.showDeleteProjectDialog) {
			dialogNode?.showModal();
			// linkRef.current?.focus();
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

{
	/*
			<DeleteProject
				showDeleteProjectDialog={showDeleteProjectDialog}
				exitWithoutDeletingProject={exitWithoutDeletingProject}
				deleteProjectConfirmation={deleteProjectConfirmation}
				name={projectName}
			/>
						*/
}

// Opens the Delete Project dialog with 2 options
	// 1. Option 1 - Cancel delete and return to previous page
	// 2. Option 2 - Delete project and return to previous page
	/*
	const deleteProjectDialog = (
		evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
		name: string
	) => {
		evt.preventDefault();
		setShowDeleteProjectDialog(!showDeleteProjectDialog);
		setProjectName(name);
	}; */

	/* Deletes a project from the invoice
	const deleteProjectConfirmation = (
		evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
	) => {
		evt.preventDefault();
		console.log(projectName);
		//remove(index)
		updateInvoiceMutation.mutate({
			...data,
			items: invoice.items.filter(
				(item: { name: string }) => item.name !== projectName
			),
			total: calculateTotal(),
		});
		setProjectName("");
		setShowDeleteProjectDialog(!showDeleteProjectDialog);
	};

	const exitWithoutDeletingProject = () => {
		setShowDeleteProjectDialog(!showDeleteProjectDialog);
	};
  */
