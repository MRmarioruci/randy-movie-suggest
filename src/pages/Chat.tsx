
import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { IonButton, IonContent, IonPage, IonIcon} from '@ionic/react';
import { send } from 'ionicons/icons';
import EnterAccount from './parts/EnterAccount';
import './Chat.css';
import '../theme/main.css';
import {AppContext, actions} from '../Provider';

const Chat: React.FC = () => {
	const { state, dispatch } = useContext(AppContext);
	const [newMessage, setNewMessage] = useState('');

	const get = async () => {
		//setLoading(true);
		let o = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({})
		};
		const response = await fetch('/getMessages', o);
		const {status,data} = await response.json();
		if(status === 'ok'){
			if(data){
				let tmp = data.map( (message:any)  => {
					return message
				})
				dispatch({
					type: actions.SET_MESSAGES,
					value: tmp
				})
			}
		}
		setTimeout( () => {
			//setLoading(false);
		}, 500);
	}
	const sendMessage = async () => {
		let o = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				message: newMessage
			})
		};
		const response = await fetch('/addMessage', o);
		const {status,data} = await response.json();
		if(status === 'ok'){
			if(data){
				/* let tmp = state.album.filter( (movie:any) => {
					return movie.id != item_id;
				})
				dispatch({
					type: actions.SET_ALBUM_LIST,
					value: tmp
				}) */
			}
		}
	}
	state.socket.on('new message', ( data:any ) =>{
			
	})
	useEffect( () => {
		dispatch({
			type: actions.SET_TOOLBAR,
			value: false
		})
		get();
	}, [useLocation(), state.isLogged])
	return (
		<IonPage className="page__content">
			<IonContent fullscreen className="page__content">
				<div className="chat__messages">
					{
						state.messages.map( (message: any) =>{
							return (
								!message.isMine ?
								<div className="chat__message" key={message.id}>
									<div className="chat__messageIcon">
										MR
									</div>
									<div className="chat__messageContent">
										{message.message}
									</div>
								</div>
								:
								<div className="chat__message chat__me" key={message.id}>
									<div className="chat__messageIcon">
										MR
									</div>
									<div className="chat__messageContent">
										{message.message}
									</div>
								</div>
							)
						})
					}
				</div>
				<div className="chat__bar">
					<textarea value={newMessage} onChange={(e) => { setNewMessage(e.target.value) }} placeholder="Type a message..." className="chat__input"></textarea>
					<IonIcon icon={send} onClick={() => { sendMessage() }} class="chat__send" />
				</div>
			</IonContent>
		</IonPage>
	);
};
 export default Chat;
