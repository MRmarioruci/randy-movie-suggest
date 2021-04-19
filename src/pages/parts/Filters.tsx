import React, { useState, useContext, useEffect, Component } from 'react';
import {AppContext, actions} from '../../Provider';
import Select from 'react-select';
interface IProps {
	getSlides: any;
}
const Filters = ({ getSlides, ...props }: IProps) => {
	const { state, dispatch } = useContext(AppContext);
	let genres = [
		{ value: "Comedy", label: "Comedy"},
        { value: "Fantasy", label:"Fantasy"},
        { value: "Crime", label:  "Crime"},
        { value: "Drama", label:  "Drama"},
        { value: "Music", label:  "Music"},
        { value: "Adventure", label:"Adventure"},
        { value: "History", label:  "History"},
        { value: "Thriller", label: "Thriller"},
        { value: "Animation", label:"Animation"},
        { value: "Family", label:   "Family"},
        { value: "Mystery", label:  "Mystery"},
        { value: "Biography", label:"Biography"},
        { value: "Action", label:   "Action"},
        { value: "Film-Noir", label:"Film-Noir"},
        { value: "Romance", label:  "Romance"},
        { value: "Sci-Fi", label:   "Sci-Fi"},
        { value: "War", label:      "War"},
        { value: "Western", label:  "Western"},
        { value: "Horror", label:   "Horror"},
        { value: "Musical", label:  "Musical"},
        { value: "Sport", label:    "Sport"}
	  ];
	const handleChange = (newValue: any, actionMeta: any) => {
		console.group('Value Changed');
		console.log(newValue);
		console.log(`action: ${actionMeta.action}`);
		console.groupEnd();
	};
	const get = async () => {
		console.log('Getting');
		let o = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({})/* Extra params will be passed */
		};
		const response = await fetch('/getFilters', o);
		const {status,data} = await response.json();
		if(status === 'ok'){
			if(data){
				console.log(data);
				/* let tmp = data.results.map( (title:any)  => {
					return title
				}) */
				/* dispatch({
					type: actions.SET_MOVIE_LIST,
					value: tmp
				}) */
				/* setTimeout( () => {
					setGetting(false);
				}, 500); */
			}
		}else{
			/* setTimeout( () => {
				setGetting(false);
			}, 500); */
		}
	}
	useEffect( () => {
		get();
		//setInstructions(true);
	}, [])
	return (
		<>
			<h3>Filters</h3>
			<div>
				<label className="label">Rating</label>
				<br/>
			</div>
			<div>
				<label className="label">Release date</label>
			</div>
			<div>
				<label className="label">Genre</label>
				<Select isMulti onChange={handleChange} options={genres} />
			</div>
		</>
	);
};

export default Filters;
