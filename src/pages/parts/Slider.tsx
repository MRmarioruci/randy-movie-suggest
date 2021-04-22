import React, { useState, useContext } from 'react';
import { IonIcon, IonButton, IonModal, IonToast} from '@ionic/react';
import { star } from 'ionicons/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Animated} from "react-animated-css";
import TinderCard from 'react-tinder-card';
import '.././Suggest.css';
import '../../theme/main.css';
import like from '../../images/icons/favourite.svg';
import dislike from '../../images/icons/rejected.svg';
import {AppContext, actions} from '../../Provider';

interface IProps {
	getSlides: any;
}
const Slider = ({ getSlides, ...props }: IProps) => {
	const { state, dispatch } = useContext(AppContext);
	const [likeMessage, setLikeMessage] = useState(false);
	const [showOverview, setShowOVerview] = useState(false);
	const [currentOverview, setCurrentOverview] = useState(false);

	let index = 0;
	const onSwipe = async (direction:any) => {
		index++;
		if(state.isLogged){
			if(direction == 'right'){
				let movie = state.movieList[index];
				if(movie){
					let o = {
						method : 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							id: movie.id,
						})
					}
					const res = await fetch('/addToList', o);
					const {status, data} = await res.json();
					if(status == 'ok'){
						setLikeMessage(true);
						setTimeout( () => {
							setLikeMessage(false);
						}, 800)
					/* 	dispatch({
							type: actions.SET_LOGIN,
							value: true
						}) */
					}else{
						console.log(data);
					}
				}
			}
		}
		if(index == 20){
			getSlides()
			index = 0;
		}
	}
	const openOverview = (overview:any) => {
		setCurrentOverview(overview);
		setShowOVerview(true);
	}
	return (
		<>
			<IonToast
				color={'success'}
				isOpen={likeMessage}
				onDidDismiss={() => setLikeMessage(false)}
				message="Added to your list"
				duration={2500}
			/>
			<div>
				{
					state.movieList.map( (item:any, i:any) => {
						let poster = 'https://image.tmdb.org/t/p/original'+item.poster_path;
						return (
							<div className="swipe" key={i}>
								<IonButton onClick={ () => { openOverview(item.overview) }} color="primary" className="swipe__more">
									more...
								</IonButton>
								<TinderCard onSwipe={onSwipe} preventSwipe={['up', 'bottom']}>
									<div className="swipe__ratingContainer">
										<IonIcon className="swipe__ratingIcon" icon={star} />
										<span className="swipe__rating">{item.vote_average}</span>
									</div>
									<div className="swipe__inner">
										<img src={poster} className="swipe__image"/>
									</div>
									<div className="swipe__title">
										{item.title} (<span className="text-muted">{item.release_date}</span>)
									</div>
								</TinderCard>
							</div>
						)
					})
				}
				<IonModal isOpen={showOverview} cssClass='swipe__overview'>
					<p className="mg-10">{currentOverview}</p>
					<IonButton onClick={() => setShowOVerview(false)}>Close</IonButton>
				</IonModal>
			</div>
		</>
	);
};

export default Slider;
