
import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { IonButton, IonContent, IonPage, IonIcon} from '@ionic/react';
import { trash } from 'ionicons/icons';
import EnterAccount from './parts/EnterAccount';
import './Album.css';
import '../theme/main.css';
import no_movie from '../images/unDraw/undraw_home_cinema_l7yl.svg';
import {AppContext, actions} from '../Provider';

const Album: React.FC = () => {
	const { state, dispatch } = useContext(AppContext);
	const [loading, setLoading] = useState(false);

	const get = async () => {
		setLoading(true);
		let o = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({})
		};
		const response = await fetch('/getList', o);
		const {status,data} = await response.json();
		if(status === 'ok'){
			if(data){
				let tmp = data.map( (movie:any)  => {
					return movie
				})
				dispatch({
					type: actions.SET_ALBUM_LIST,
					value: tmp
				})
			}
		}
		setTimeout( () => {
			setLoading(false);
		}, 500);
	}
	const deleteItem = async (item_id:number) => {
		let o = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				item_id: item_id
			})
		};
		const response = await fetch('/deleteListItem', o);
		const {status,data} = await response.json();
		if(status === 'ok'){
			if(data){
				let tmp = state.album.filter( (movie:any) => {
					return movie.id != item_id;
				})
				dispatch({
					type: actions.SET_ALBUM_LIST,
					value: tmp
				})
			}
		}
	}
	useEffect( () => {
		get();
	}, [useLocation(), state.isLogged])
	return (
		<IonPage className="page__content">
			<IonContent fullscreen className="page__content">
				<div>
					{
						!state.isLogged ? <EnterAccount/> :
						<div>
							{ loading &&
								<div className="lds-ring">
									<div></div>
									<div></div>
									<div></div>
									<div></div>
								</div>
							}
							{ !loading &&
								<div>
									{
										state.album.length > 0 ?
										state.album.map( (movie:any, i:number) => {
											let poster = 'https://image.tmdb.org/t/p/original'+movie.movieInfo.poster_path;
											return (
												<div key={i} className="movie">
													<div className="movie__image">
														<img src={poster} width="50" />
													</div>
													<div className="movie__extra">
														<h3 className="movie__title">{ movie.movieInfo.original_title }</h3>
													</div>
													<div className="movie__actions">
														<IonButton color="danger" onClick={() => { deleteItem(movie.id) }}>
															<IonIcon icon={trash} />
														</IonButton>
													</div>
												</div>
											)
										})
										:
										<div className="no__movie">
											<img src={no_movie} />
											<h3>No movies in your list</h3>
										</div>
									}
								</div>
							}
						</div>
					}
				</div>
			</IonContent>
		</IonPage>
	);
};

export default Album;
