import React, { ReactNode, createContext, useReducer, useEffect } from 'react';
import socketIOClient from "socket.io-client";
const ENDPOINT = ":8100";
const socket = socketIOClient(ENDPOINT);
interface IProps {
	children: ReactNode;
}
const initialState = {
	isLogged: false,
	movieList: [],
	album: [],
	messages: [],
	toolbar: true,
	socket: socket
}
const AppContext = createContext(initialState as any);
const actions = {
	SET_LOGIN: "SET_LOGIN",
	SET_SLIDE_MODAL: "SET_SLIDE_MODAL",
	SET_FILTER_MODAL: "SET_FILTER_MODAL",
	SET_MOVIE_LIST: "SET_MOVIE_LIST",
	SET_ALBUM_LIST: "SET_ALBUM_LIST",
	SET_TOOLBAR: "SET_TOOLBAR",
	SET_MESSAGES: "SET_MESSAGES",
};
function reducer(state:any, action:any) {
	switch (action.type) {
		case actions.SET_LOGIN:
			return { ...state, isLogged: action.value };
		case actions.SET_MOVIE_LIST:
			return { ...state, movieList: action.value };
		case actions.SET_ALBUM_LIST:
			return { ...state, album: action.value };
		case actions.SET_TOOLBAR:
			return { ...state, toolbar: action.value };
		case actions.SET_MESSAGES:
			return { ...state, messages: action.value };
		default:
			return state;
	}
}
const Provider = ({ children, ...props }: IProps) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const value = { state, dispatch };
	const isLogged = async () => {
		let o = {
			method : 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({})
		}
		const res = await fetch('/isLogged', o);
		const {status, data} = await res.json();
		if(status == 'ok'){
			dispatch({
				type: actions.SET_LOGIN,
				value: true
			})
		}else{
			dispatch({
				type: actions.SET_LOGIN,
				value: false
			})
		}
	}
	useEffect( () => {
		isLogged();
	}, [])
	return (
		<AppContext.Provider value={value}>
			{children}
		</AppContext.Provider>
	);
};
export {AppContext, Provider, actions}
