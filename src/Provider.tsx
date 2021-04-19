import React, { ReactNode, createContext, useReducer } from 'react';
interface IProps {
	children: ReactNode;
}
const initialState = {
	isLogged: false,
	movieList: [],
}
const AppContext = createContext(initialState as any);
const actions = {
	SET_LOGIN: "SET_LOGIN",
	SET_SLIDE_MODAL: "SET_SLIDE_MODAL",
	SET_FILTER_MODAL: "SET_FILTER_MODAL",
	SET_MOVIE_LIST: "SET_MOVIE_LIST",
};
function reducer(state:any, action:any) {
	switch (action.type) {
		case actions.SET_LOGIN:
			return { ...state, isLogged: action.value };
		case actions.SET_MOVIE_LIST:
			return { ...state, movieList: action.value };
		default:
			return state;
	}
}
const Provider = ({ children, ...props }: IProps) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const value = { state, dispatch };
	return (
		<AppContext.Provider value={value}>
			{children}
		</AppContext.Provider>
	);
};
export {AppContext, Provider, actions}
