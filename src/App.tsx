import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Logo from "./assets/logo.svg";
import Profile from "./assets/image-avatar.jpg";
import "./sass/main.scss";
import Toggle from "./components/Toggle";

import ErrorPage from "./pages/ErrorPage";
import HomePage  from "./pages/HomePage";
import ViewInvoice  from "./pages/ViewInvoice";
import NewInvoice from "./pages/NewInvoice";
import DeleteInvoice from "./pages/DeleteInvoice";
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
    },
    {
      path: "/newInvoice",
      element: <NewInvoice />,
    },
    {
      path: "deleteInvoice",
      element: <DeleteInvoice />,
    },
    {
      path: "/editInvoice",
      element: <EditInvoice />,
    },
  ]);

  const [theme, setTheme] = useState(false);

  const onChange = () => {
    setTheme(!theme);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
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
              <img src={Profile} alt="" aria-hidden={true} />
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
