import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
	return (
		<div className="flex landing-page">
			<p>authentication is down, use link to invoice page</p>
			<Link to={"/signup"}>Sign up</Link>
			<Link to={"/login"}>Login </Link>
			<Link to={`./invoicespage`}>Invoices page</Link>
		</div>
	);
}

export default LandingPage;
