import React, { createContext, useEffect, useReducer } from "react";

interface State {
	user: {
    token: any; email: string | null; password: string | null 
};
}

interface Action {
	payload?: any;
	type: "LOGIN" | "LOGOUT";
}

export const AuthContext = createContext<{
	state: State;
	dispatch: React.Dispatch<Action>;
}>({
	state: { user: { email: null, password: null , token: null} },
	dispatch: () => null,
});

const authReducer = (state: State, action: Action) => {
	switch (action.type) {
		case "LOGIN":
			return { user: action.payload };
		case "LOGOUT":
			return { user: null };
		default:
			return state;
	}
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(authReducer, {
		user: null,
	});

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user")!);

		if (user) {
			dispatch({ type: "LOGIN", payload: user });
		}
	}, []);

	return (
		<AuthContext.Provider value={{ state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};
