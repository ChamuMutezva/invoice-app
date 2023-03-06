import { useState } from "react";
import Logo from './assets/logo.svg';
import './sass/main.scss';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header>
        <div className="header">
          <a href="">
            <img src={Logo} alt="" />
          </a>
          heading
        </div>
      </header>
    </div>
  );
}

export default App;
