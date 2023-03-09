import { useState } from "react";
import Logo from "./assets/logo.svg";
import DarkMode from "./assets/icon-moon.svg";
import LightMode from "./assets/icon-sun.svg";
import Profile from "./assets/image-avatar.jpg";
import "./sass/main.scss";

function App() {
  const [theme, setTheme] = useState(false);

  const onChange = () => {
    setTheme(!theme);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="controls">
          <div className="logo-container">
            <a className="btn-logo" href="">
              <img src={Logo} alt="" />
            </a>
          </div>

          <div className={`${theme ? "light-mode" : ""}`}>
            <button
              type="button"
              role="switch"
              className="btn btn-theme-control"
              aria-checked={theme}
              aria-label="toggle dark mode"
              onClick={onChange}
            >
              <span className="check">
                <span className="theme-icons">
                  <img
                    className={`theme-img light-theme-img ${
                      theme ? "hide-theme-img" : ""
                    }`}
                    src={DarkMode}
                    aria-hidden
                    alt=""
                  />
                  <img
                    className={`theme-img dark-theme-img ${
                      theme ? "" : "hide-theme-img"
                    }`}
                    src={LightMode}
                    aria-hidden
                    alt=""
                  />
                </span>
              </span>
            </button>
          </div>
        </div>
        <div className="profile">
          <a href="#" className="btn-profile">
            <img src={Profile} alt="" />
          </a>
        </div>
      </header>
    </div>
  );
}

export default App;
