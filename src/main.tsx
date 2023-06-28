import React from "react";
import ReactDOM from "react-dom/client";
import { OverlayProvider } from "./context/OverlayContext";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<AuthProvider>
			<OverlayProvider>
				<App />
			</OverlayProvider>
		</AuthProvider>
	</React.StrictMode>
);
