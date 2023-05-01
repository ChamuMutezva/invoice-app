import React from "react";
import DarkMode from "../assets/icon-moon.svg";
import LightMode from "../assets/icon-sun.svg";

function Toggle(props: {
  onChange: (event: React.MouseEvent<HTMLButtonElement>) => void;
  theme: boolean;
}) {
  return (
    <div className={`${props.theme ? "light-mode" : ""}`}>
      <button
        type="button"
        role="switch"
        className="btn btn-theme-control"
        aria-checked={props.theme}
        aria-label="toggle dark mode"
        onClick={props.onChange}
      >
        <span className="check">
          <span className="theme-icons">
            <img
              className={`theme-img light-theme-img ${
                props.theme ? "hide-theme-img" : ""
              }`}
              src={DarkMode}
              aria-hidden
              alt=""
              width={"20px"}
              height={"20px"}
            />
            <img
              className={`theme-img dark-theme-img ${
                props.theme ? "" : "hide-theme-img"
              }`}
              src={LightMode}
              aria-hidden
              alt=""
              width={"20px"}
              height={"20px"}
            />
          </span>
        </span>
      </button>
    </div>
  );
}

export default Toggle;
