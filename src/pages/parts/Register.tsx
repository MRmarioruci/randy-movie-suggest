
import React, { useState, useEffect, useContext, Component } from 'react';
import { IonInput, IonItem, IonButton} from '@ionic/react';
import '../../theme/main.css'
import {AppContext, actions} from '../../Provider';
import swipeImg from '../../images/unDraw/swipe.svg';

interface IProps {
	togglePage: any;
}
const Register = ({ togglePage, ...props }: IProps) => {
	const { state, dispatch } = useContext(AppContext);
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [passwordRepeat, setPasswordRepeat] = useState('');
	const [error, setError] = useState([]);

	const isValidEmail = (email:String) => {
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}
	const register = async () => {
		setError([])
		let err = [] as any;

		if(!isValidEmail) err.push('Please fill in a valid email');
		if(!password) err.push('Please fill in the password field');
		if(!email) err.push('Please fill in the email field');
		if(password != passwordRepeat){
			err.push('Passwords do not match');
		}

		if(err.length == 0){
			let o = {
				method : 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: name,
					email: email,
					password: password
				})
			}
			const res = await fetch('/register', o);
			const {status, data} = await res.json();
			console.log(status);
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
				<img src={swipeImg} className="account__image"/>
			</div>
			<h3 className="fnt_20 label">Sign Up</h3>
			Create an account and save your favorite Randy suggestions while swiping.
			<div className="mt20">
				<IonItem className="custom__input">
					<IonInput value={name} placeholder="Enter name(optional)" onIonChange={e => setName(e.detail.value!)}></IonInput>
				</IonItem>
			</div>
			<div className="mt20">
				<IonItem className="custom__input">
					<IonInput value={email} type="email" placeholder="Enter email" onIonChange={e => setEmail(e.detail.value!)}></IonInput>
				</IonItem>
			</div>
			<div className="mt20">
				<IonItem>
					<IonInput value={password} type="password" placeholder="Enter password" onIonChange={e => setPassword(e.detail.value!)}></IonInput>
				</IonItem>
			</div>
			<div className="mt20">
				<IonItem>
					<IonInput value={passwordRepeat} type="password" placeholder="Repeat password" onIonChange={e => setPasswordRepeat(e.detail.value!)}></IonInput>
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
				<IonButton expand="full" onClick={register} shape="round" color="primary">Create account</IonButton>
			</div>
			<div className="mt20">
				<label>
					Already have an account?
					<a className="label label__link" onClick={ () => {togglePage('Login')}}> Login</a>
				</label>
			</div>
		</div>
	);
};

export default Register;
