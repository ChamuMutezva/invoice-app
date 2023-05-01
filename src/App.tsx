import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Logo from "./assets/logo.svg";
import Profile from "./assets/image-avatar.jpg";
import "./sass/main.scss";
import Toggle from "./components/Toggle";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import ViewInvoice from "./pages/ViewInvoice";
import NewInvoice from "./pages/NewInvoice";
import EditInvoice from "./pages/EditInvoice";

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/viewInvoice/:id",
      element: <ViewInvoice />,
      // loader: rootLoader,
    },
    {
      path: "/newInvoice",
      element: <NewInvoice />,
    },
    {
      path: "/editInvoice/:id",
      element: <EditInvoice />,
      errorElement: <ErrorPage />,
    },
  ]);

  const [theme, setTheme] = useState(true);

  const onChange = () => {
    setTheme(!theme);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className={`app ${theme ? "" : "dark-mode"}`}>
        <header className="flex header">
          <div className="flex controls">
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
              <img
                className="btn-profile-img"
                src={Profile}
                alt=""
                aria-hidden={true}
              />
              <span className="sr-only">customer profile</span>
            </a>
          </div>
        </header>
        <RouterProvider router={router} />
      </div>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
