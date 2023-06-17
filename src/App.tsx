import { useEffect, useState, useContext } from "react";
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
import { OverLayContext } from "./context/OverlayContext";

const queryClient = new QueryClient();

function App() {
	const { overlayControl } = useContext(OverLayContext);
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
				className={`app ${overlayControl} ${theme ? "" : "dark-mode"}`}
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
							href="#"
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
