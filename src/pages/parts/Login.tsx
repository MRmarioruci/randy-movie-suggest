
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
	const [error, setError] = useState([]);
	const login = async () => {
		setError([])
		let err = [] as any;

		if(!password) err.push('Please fill in the password field');
		if(!email) err.push('Please fill in the email field');

		if(err.length == 0){
			let o = {
				method : 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: email,
					password: password
				})
			}
			const res = await fetch('/login', o);
			const {status, data} = await res.json();
			if(status == 'ok'){
				dispatch({
					type: actions.SET_LOGIN,
					value: true
				})
			}else{
				console.log(data);
				setError([]);
			}
		}else{
			setError(err);
		}
	}
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
				{
					error.length > 0 &&
					error.map( (err:any, i:any) => {
						return <div key={i} className="error__message">{err}</div>
					})
				}
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
