import { useEffect, useState, useContext } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Logo from "./assets/logo.svg";
import Profile from "./assets/image-avatar.jpg";
import "./sass/main.scss";
import Toggle from "./components/Toggle";
import ErrorPage from "./pages/ErrorPage";
import ViewInvoice from "./pages/ViewInvoice";
import { OverLayContext } from "./context/OverlayContext";
import LandingPage from "./pages/LandingPage";
import InvoicesPage from "./pages/InvoicesPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

const queryClient = new QueryClient();

function App() {
	const { overlayControl } = useContext(OverLayContext);
	const router = createBrowserRouter([
		{
			path: "/",
			element: <LandingPage />,
			errorElement: <ErrorPage />,
		},
		{
			path: "/invoicespage",
			element: <InvoicesPage />,
			errorElement: <ErrorPage />,
		},
		{
			path: "/signup",
			element: <Signup />,
		},
		{
			path: "/login",
			element: <Login />,
		},
		{
			path: "/viewInvoice/:id",
			element: <ViewInvoice />,
			// loader: rootLoader,
		},
	]);

	const localstorage: boolean = JSON.parse(
		window.localStorage.getItem("theme")!
	);

	const [theme, setTheme] = useState(localstorage);

	const onChange = () => {
		setTheme(() => !theme);
	};

	useEffect(() => {
		window.localStorage.setItem("theme", JSON.stringify(theme));
	}, [theme]);

	return (
		<QueryClientProvider client={queryClient}>
			<div
				className={`app ${overlayControl ? "app-overlay" : ""} ${
					theme ? "" : "dark-mode"
				}`}
			>
				<header className="flex header">
					<div className="flex controls">
						<div className="logo-container">
							<a
								className="btn btn-logo"
								href="/"
							>
								<img
									src={Logo}
									alt=""
									aria-hidden={true}
									width={"28"}
									height={"26"}
								/>
								<span className="sr-only">
									preprince investments
								</span>
							</a>
						</div>

						<Toggle
							theme={theme}
							onChange={onChange}
						/>
					</div>
					<div className="profile">
						<a
							href="/"
							className="btn btn-profile"
						>
							<img
								className="btn-profile-img"
								src={Profile}
								alt=""
								aria-hidden={true}
								width={"80"}
								height={"80"}
							/>
							<span className="sr-only">customer profile</span>
						</a>
					</div>
				</header>
				<RouterProvider router={router} />
			</div>
			<ReactQueryDevtools
				initialIsOpen={false}
				position="bottom-right"
			/>
		</QueryClientProvider>
	);
}

export default App;
