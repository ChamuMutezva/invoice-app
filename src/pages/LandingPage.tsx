import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function LandingPage() {
	const landingRef = useRef(null);
	useEffect(() => {
		console.log(landingRef);
		gsap.from(landingRef.current, {
			duration: 2,
			autoAlpha: 1,
			ease: "none",
			delay: 1,
		});
	}, [landingRef]);
	return (
		<div
			ref={landingRef}
			className="flex landing-page"
		>
			<div className="header-container">
				<h1>Invoice creator</h1>
			</div>

			<div className="flex container-signup">
				<p>Create an account if you do not have one</p>
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
