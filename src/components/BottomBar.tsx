
import React, { useEffect, useContext } from 'react';
import {
	IonLabel,
	IonTabButton,
	IonIcon
} from '@ionic/react';
import { albums, add, shuffle, person } from 'ionicons/icons';
import '../theme/main.css';
import {AppContext, actions} from '../Provider';

const BottomBar: React.FC = () => {

	alert('gere');
	const { state, dispatch } = useContext(AppContext);
	console.log(state);
	console.log('asdf');

	useEffect( () => {
		console.log('here');
		/* dispatch({
			type: actions.SET_TOOLBAR,
			value: true
		}) */
	}, [])
	return (
		<div>
			<IonTabButton tab="suggest" href="/suggest">
				<IonIcon icon={shuffle} />
				<IonLabel>Find</IonLabel>
			</IonTabButton>
			<IonTabButton tab="album" href="/album">
				<IonIcon icon={albums} />
				<IonLabel>My list</IonLabel>
			</IonTabButton>
			<IonTabButton tab="chat" href="/chat">
				<IonIcon icon={add} />
				<IonLabel>Chat</IonLabel>
			</IonTabButton>
			<IonTabButton tab="account" href="/account">
				<IonIcon icon={person} />
				<IonLabel>Me</IonLabel>
			</IonTabButton>
		</div>
	);
};

export default BottomBar;
