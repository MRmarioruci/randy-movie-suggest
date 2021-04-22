
import React, { useState, useEffect, useContext } from 'react';
import { IonToast, IonContent, IonPage} from '@ionic/react';
import Slider from './parts/Slider';
import './Suggest.css';
import '../theme/main.css';
import {AppContext, actions} from '../Provider';

const Suggest: React.FC = () => {
	const { state, dispatch } = useContext(AppContext);
	const [getting, setGetting] = useState(false);
	const [showInstructions, setInstructions] = useState(false);

	const get = async () => {
		setGetting(true);
		let o = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({})/* Extra params will be passed */
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
		}
	}
	useEffect( () => {
		get();
		setInstructions(true);
	}, [])
	return (
		<IonPage className="page__content">
			<IonContent fullscreen className="page__content">
				{ !getting && <Slider getSlides={get} ></Slider>}
				{ getting &&
					<div className="lds-ring">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				}
				<IonToast
					color={'primary'}
					isOpen={showInstructions}
					onDidDismiss={() => setInstructions(false)}
					message="Swipe left to ignore, swipe right to add in your list.(This will only work if you have logged in to your account)"
					duration={2500}
				/>
			</IonContent>
		</IonPage>
	);
};

export default Suggest;
