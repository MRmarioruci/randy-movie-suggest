import React, { useState, useContext } from 'react';
import { IonIcon, IonModal, IonButton} from '@ionic/react';
import { star } from 'ionicons/icons';
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
	const [dislikeMessage, setDislikeMessage] = useState(false);

	let index = 0;
	const slideOpts = {
		initialSlide: 0,
		speed: 400,
		pager: false,
		on: {
			slideNext: function(){
				console.log('here');
			},
		}
	};
	const onSwipe = (direction:any) => {
		if(direction == 'left'){
			setDislikeMessage(true);
			setTimeout( () => {
				setDislikeMessage(false);
			}, 500)
		}else{
			setLikeMessage(true);
			setTimeout( () => {
				setLikeMessage(false);
			}, 500)
		}
		index++;
		if(index == 20){
			getSlides()
			index = 0;
		}
	}
	return (
		<>
			<Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={likeMessage}>
				<div>
					<img src={like} width="50" className="reaction__img"/>
				</div>
			</Animated>
			<Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={dislikeMessage}>
				<div>
					<img src={dislike} width="50" className="reaction__img"/>
				</div>
			</Animated>
			<div>
			{
				state.movieList.map( (item:any, i:any) => {
					let poster = 'https://image.tmdb.org/t/p/original'+item.poster_path;
					return (
						<div className="swipe" key={i}>
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
			</div>
		</>
	);
};

export default Slider;
