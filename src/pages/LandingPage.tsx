import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
	return (
		<div className="flex landing-page">
			<Link to={"/signup"}>Sign up</Link>
			<Link to={"/login"}>Login </Link>			
		</div>
	);
}

export default LandingPage;
