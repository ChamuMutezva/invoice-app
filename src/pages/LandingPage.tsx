import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function LandingPage() {
	const headingRef = useRef(null);
	useEffect(() => {
		console.log(headingRef);
	}, [headingRef]);
	return (
		<div className="flex landing-page">
			<h1 ref={headingRef}>Invoice creator</h1>
			<div className="flex container-signup">
				<p>Create an account if you do not have an account</p>
				<Link
					to={"/signup"}
					className="btn btn-login"
				>
					Sign up
				</Link>
			</div>
			<div className="flex container-login">
				<p>Visit the login page</p>
				<p>You can sign in as guest if you do not have login details</p>
				<Link
					to={"/login"}
					className="btn btn-login"
				>
					Login{" "}
				</Link>
			</div>
		</div>
	);
}

export default LandingPage;
