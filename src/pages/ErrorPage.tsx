import React from "react";
import { useRouteError } from "react-router-dom";
import PreviousPage from "../components/PreviousPage";

function ErrorPage() {
	const error = useRouteError();
	console.error(error);

	return (
		<div className="flex error-page">
			<PreviousPage title={`Error in navigation`} />
			<h2>Oops!</h2>
			<p>Sorry, an unexpected error has occurred.</p>
			{/*<p>{<i>{error.statusText || error.message}</i>}</p> */}
		</div>
	);
}

export default ErrorPage;
