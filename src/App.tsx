import { useState } from "react";
import Logo from "./assets/logo.svg";
import Profile from "./assets/image-avatar.jpg";
import "./sass/main.scss";
import Toggle from "./components/Toggle";

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

          <Toggle theme={theme} onChange={onChange} />
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
