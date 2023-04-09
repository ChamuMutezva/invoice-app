import React from "react";
import IconClose from "../assets/icon-close.svg";
import FocusTrap from "focus-trap-react";

function DeleteProject(props: {
  deleteProjectConfirmation: React.MouseEventHandler<HTMLButtonElement>;
  exitWithoutDeletingProject: React.MouseEventHandler<HTMLButtonElement>;
  deleteModal: boolean;
}) {
  return (
    <div className={`modal-wrapper ${props.deleteModal ? "show-modal" : ""} `}>
      <div className="delete-confirmation">
        <button
          type="button"
          className="btn delete-close"
          onClick={props.exitWithoutDeletingProject}
        >
          <img src={IconClose} alt="Close without deleting project" />
        </button>

        <h4 id="modal-heading-delete" className="modal-heading">
          Delete project from invoice?
        </h4>
        <p id="modal-heading-text" className="modal-text">
          Are you sure you want to delete the{" "}
          <span className="modal-text-ID">{}</span> project and its contents?
          This action cannot be reversed.
        </p>
        <button
          type="button"
          aria-labelledby="modal-heading-text"
          className="btn btn-confirm-delete"
          onClick={props.deleteProjectConfirmation}
        >
          Confirm & Delete
        </button>
      </div>
    </div>
  );
}

export default DeleteProject;
