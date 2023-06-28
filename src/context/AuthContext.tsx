import React, { createContext, useReducer } from "react";

interface State {
	isAuthenticated: boolean;
}

interface Action {
	type: "LOGIN" | "LOGOUT";
}

export const AuthContext = createContext<{
	state: State;
	dispatch: React.Dispatch<Action>;
}>({
	state: { isAuthenticated: false },
	dispatch: () => null,
});

const authReducer = (state: State, action: Action) => {
	switch (action.type) {
		case "LOGIN":
			return { isAuthenticated: true };
		case "LOGOUT":
			return { isAuthenticated: false };
		default:
			return state;
	}
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(authReducer, {
		isAuthenticated: false,
	});
	return (
		<AuthContext.Provider value={{ state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};
