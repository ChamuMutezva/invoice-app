import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
	return (
		<div className="flex landing-page">
			<button>Sign up</button>
			<button>Login </button>
			<Link to={`./invoicespage`}>Invoices page</Link>
		</div>
	);
}

export default LandingPage;
