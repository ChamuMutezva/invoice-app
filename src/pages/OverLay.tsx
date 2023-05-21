import React from "react";

function OverLay(props: {
  isOpen: boolean;
  onClose: React.MouseEventHandler<HTMLButtonElement> | undefined;
  children:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) {
  return (
    <div role="dialog" aria-modal="true">
      {props.isOpen && (
        <div className="overlay">
          <div
            className="overlay-bg"
            onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
              props.onClose
            }
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
      )}
    </div>
  );
}

export default OverLay;
