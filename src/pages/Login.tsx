import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { useAuthContext } from "../hooks/useAuthContext";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { login, error, isLoading } = useLogin();
	const { state } = useAuthContext();
	const navigate = useNavigate();

	const handleSubmit = async (evt: { preventDefault: () => void }) => {
		evt.preventDefault();		
		await login(email, password);
	};
	useEffect(() => {
		if (state.user) {
			navigate("/invoicespage");
		}
	}, [state.user]);
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
			<label htmlFor="password">Password:</label>
			<input
				type="password"
				value={password}
				onChange={(evt) => setPassword(evt.target.value)}
			/>
			<button disabled={isLoading}>Login</button>
			<p className="flex test-data">
				<span>Test data</span>
				<span>email: test@gmail.com</span>
				<span>password: Test123!</span>
			</p>
			{error && <div className="error">{error}</div>}
		</form>
	);
}

export default Login;
