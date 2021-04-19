import React, { useState, useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonIcon, IonModal, IonButton} from '@ionic/react';
import {AppContext, actions} from '../../Provider';
import Login from './Login';
import Register from './Register';

const EnterAccount = () => {
	const { state, dispatch } = useContext(AppContext);
	const [page, togglePage] = useState('Login');
	return (
		<>
			{ page == 'Login' && <Login togglePage={togglePage} /> }
			{ page == 'Register' && <Register togglePage={togglePage}/> }
		</>
	);
};

export default EnterAccount;
