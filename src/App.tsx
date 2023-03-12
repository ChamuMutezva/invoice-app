import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Logo from "./assets/logo.svg";
import Profile from "./assets/image-avatar.jpg";
import "./sass/main.scss";
import Toggle from "./components/Toggle";
import QueryData from "./FetchData/QueryData";

function App() {
  const [theme, setTheme] = useState(false);

  const onChange = () => {
    setTheme(!theme);
  };

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <header className="header">
          <div className="controls">
            <div className="logo-container">
              <a className="btn btn-logo" href="">
                <img src={Logo} alt="" aria-hidden={true} />
                <span className="sr-only">preprince investments</span>
              </a>
            </div>

            <Toggle theme={theme} onChange={onChange} />
          </div>
          <div className="profile">
            <a href="#" className="btn btn-profile">
              <img src={Profile} alt="" aria-hidden={true} />
              <span className="sr-only">customer profile</span>
            </a>
          </div>
        </header>
        <QueryData />
      </div>
    </QueryClientProvider>
  );
}

export default App;
