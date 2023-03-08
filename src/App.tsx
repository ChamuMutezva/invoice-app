import { useState } from "react";
import Logo from "./assets/logo.svg";
import "./sass/main.scss";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <header>
        <div className="header">
          <div className="logo-container">
            <a href="">
              <img src={Logo} alt="" />
            </a>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
