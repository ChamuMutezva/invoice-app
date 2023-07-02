import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { API_AUTH_PATH } from "../config";

export const useLogin = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const { dispatch } = useAuthContext();

	const login = async (email: string, password: string) => {
		setIsLoading(true);
		setError(null);

		const response = await fetch(`${API_AUTH_PATH}/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		});
		const json = await response.json();

		if (!response.ok) {
			setIsLoading(false);
			setError(json.error);
		}

		if (response.ok) {
			// save the user to localstorage
			localStorage.setItem("user", JSON.stringify(json));

			//update the authcontext
			dispatch({ type: "LOGIN", payload: json });
			setIsLoading(false);
		}
	};
	return { login, isLoading, error };
};
