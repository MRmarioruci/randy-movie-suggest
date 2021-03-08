import React, { ReactNode, createContext, useReducer } from 'react';
interface IProps {
	children: ReactNode;
	// any other props that come into the component
}
const initialState = {
	isLogged: false,
}
const actions = {
	SET_LOGIN: "SET_LOGIN",
};
function reducer(state:any, action:any) {
	switch (action.type) {
		case actions.SET_LOGIN:
			return { ...state, isLogged: action.value };
		default:
			return state;
	}
}
const AppContext = createContext(initialState);

const Provider = ({ children, ...props }: IProps) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const value = {
		isLogged: false,
	};
	return (
		<AppContext.Provider {...props} value={value}>
			{children}
		</AppContext.Provider>
	);
};
export default Provider

	