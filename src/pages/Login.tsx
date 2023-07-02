import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (evt: { preventDefault: () => void }) => {
		evt.preventDefault();
		console.log(email, password);
	};
	return (
		<form
			className="flex login"
			onSubmit={handleSubmit}
		>
			<button
			type="button"
				className="btn flex btn-return"
				onClick={() => navigate(-1)}
			>				
				Go back				
			</button>
			<h3>Login</h3>
			<label htmlFor="email">Email:</label>
			<input
				type="email"
				value={email}
				onChange={(evt) => setEmail(evt.target.value)}
			/>
			<label htmlFor="password">Email:</label>
			<input
				type="password"
				value={password}
				onChange={(evt) => setPassword(evt.target.value)}
			/>
			<button>Login</button>
		</form>
	);
}

export default Login;
