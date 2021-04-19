
import React, { useState, useEffect, useContext, Component } from 'react';
import { IonInput, IonItem, IonButton} from '@ionic/react';
import '../../theme/main.css'
import {AppContext, actions} from '../../Provider';
import welcomeImg from '../../images/unDraw/welcome.svg';

interface IProps {
	togglePage: any;
}
const Login = ({ togglePage, ...props }: IProps) => {
	const { state, dispatch } = useContext(AppContext);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const login = async () => {
		setError('');
		setError('This account does not exist');
		console.log('Logging in');
	}
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
		<div className="contain__page">
			<div className="text__center">
				<img src={welcomeImg} className="account__image"/>
			</div>
			<h3 className="fnt_20 label">Welcome Back!</h3>
			Sign in to your account.
			<div className="mt20">
				<IonItem>
					<IonInput value={email} placeholder="Enter email" onIonChange={e => setEmail(e.detail.value!)}></IonInput>
				</IonItem>
			</div>
			<div className="mt20">
				<IonItem>
					<IonInput value={password} type="password" placeholder="Enter password" onIonChange={e => setPassword(e.detail.value!)}></IonInput>
				</IonItem>
			</div>
			<div className="mt20">
				{ error && <div className="error__message">{error}</div>}
			</div>
			<div className="mt20">
				<IonButton expand="full" onClick={login} shape="round" color="primary">Login</IonButton>
			</div>
			<div className="mt20">
				<label>
					Don't have an account?
					<a className="label label__link" onClick={ () => {togglePage('Register')}}> Register</a>
				</label>
			</div>
		</div>
	);
};

export default Login;
