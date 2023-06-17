import React from "react";
import ReactDOM from "react-dom/client";
import { OverlayProvider } from "./context/OverlayContext";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<OverlayProvider>
			<App />
		</OverlayProvider>
	</React.StrictMode>
);
