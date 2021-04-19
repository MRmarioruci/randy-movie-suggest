
import React, { useState, useEffect, useContext, Component } from 'react';
import { IonToast, IonContent, IonPage} from '@ionic/react';
import EnterAccount from './parts/EnterAccount';
import './Album.css';
import '../theme/main.css';
import {AppContext, actions} from '../Provider';

const Album: React.FC = () => {
	const { state, dispatch } = useContext(AppContext);

	const get = async () => {
		/* setGetting(true);
		let o = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({})
		};
		const response = await fetch('/get', o);
		const {status,data} = await response.json();
		if(status === 'ok'){
			if(data){
				let tmp = data.results.map( (title:any)  => {
					return title
				})
				dispatch({
					type: actions.SET_MOVIE_LIST,
					value: tmp
				})
				setTimeout( () => {
					setGetting(false);
				}, 500);
			}
		}else{
			setTimeout( () => {
				setGetting(false);
			}, 500);
		} */
	}
	useEffect( () => {
		//get();
	}, [])
	return (
		<IonPage className="page__content">
			<IonContent fullscreen className="page__content">
				<div>
					{
						!state.isLogged ? <EnterAccount/> :
						<div>Testing goes heres</div>
					}
				</div>
			</IonContent>
		</IonPage>
	);
};

export default Album;
