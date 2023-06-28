import React, { useState } from "react";

function Login() {
    const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (evt: { preventDefault: () => void }) => {
		evt.preventDefault();
		console.log(email, password);
	};
	return (
		<form
			className="login"
			onSubmit={handleSubmit}
		>
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
