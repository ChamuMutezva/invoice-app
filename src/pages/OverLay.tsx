import React, {  useRef } from "react";

function OverLay(props: {
	// isEditOverlayOpen: boolean;
	toggleOverlay: React.MouseEventHandler<HTMLButtonElement>;
	children:
		| React.ReactElement<any, string | React.JSXElementConstructor<any>>
		| React.ReactFragment
		| React.ReactPortal;
}) {
	const dialogRef = useRef<HTMLDivElement>(null);
	dialogRef.current?.addEventListener("click", () => {
		return props.toggleOverlay;
	});
	return (
		<div
			role="dialog"
			aria-modal="true"
		>
			<div className="overlay">
				<div
					className="overlay-bg"
					tabIndex={-1}
					ref={dialogRef}
					onClick={() => props.toggleOverlay}
				>
					{" "}
				</div>
				<div className="overlay-container">
					{/*
            <div className="overlay-controls">
              <button
                type="button"
                className="btn-overlay-close"
                onClick={props.onClose}
              >
                Close
              </button>
            </div>
          */}
					{props.children}
				</div>
			</div>
		</div>
	);
}

export default OverLay;
