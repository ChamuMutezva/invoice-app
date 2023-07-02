import React, { createContext, useReducer } from "react";

interface State {
	user: string | null;
}

interface Action {
    payload: any;
	type: "LOGIN" | "LOGOUT";
}

export const AuthContext = createContext<{
	state: State;
	dispatch: React.Dispatch<Action>;
}>({
	state: { user: "" },
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
		user: ""
	});
	console.log("Auth context: ", state);
	return (
		<AuthContext.Provider value={{ state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};
