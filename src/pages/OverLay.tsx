import React, { useRef } from "react";

function OverLay(props: {
	isOverlayOpen: boolean;
	toggleOverlay: React.MouseEventHandler<HTMLButtonElement>;
	children:
		| React.ReactElement<any, string | React.JSXElementConstructor<any>>
		| React.ReactFragment
		| React.ReactPortal;
}) {
	const dialogRef = useRef<HTMLDivElement>(null);

	dialogRef.current?.addEventListener("click", (evt) => {
		console.log("overlay button clicked");

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
				
				>
					<div className="overlay-controls">
						<button
							type="button"
							className="btn-overlay-close"
							onClick={props.toggleOverlay}
						>
							Close overlay
						</button>
					</div>
				</div>
				<div className="overlay-container">{props.children}</div>
			</div>
		</div>
	);
}

export default OverLay;
