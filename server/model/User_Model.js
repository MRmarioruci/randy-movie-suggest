const bcrypt = require('bcrypt');
const saltRounds = 10;
const { resolve } = require('path');
const logger = require('../utils/logger.js');

module.exports = {
	register: (name, email, password, CONNECTION) => {
		return new Promise( async (resolve, reject) => {
			let user = await module.exports.getUser(email, CONNECTION).catch( (err) => {
				reject('An error occured');
			})
			if(user.length > 0) return reject('Email exists');

			const q = 'INSERT INTO `Users`(`name`,`email`,`password`) VALUES(?,?,?)';
			bcrypt.hash(password, saltRounds, function(err, hash) {
				if(err){
					reject('An error occured');
					logger.log('error','UNKNOWN_ERROR', err);
				}else{
					CONNECTION.query(q, [name, email, hash], (error, response) => {
						if(error){
							reject('An error occured');
							logger.log('error','QUERY', error);
						}else{
							resolve();
						}
					})
				}
			});
		})
	},
	login:(email, password, CONNECTION) => {
		return new Promise( async (resolve, reject) => {
			 let user = await module.exports.getUser(email, CONNECTION).catch( (err) => {
				reject('An error occured');
			})
			if(user.length == 0) return reject('Email does not exist');

			console.log(user);
			/* const q = 'INSERT INTO `Users`(`name`,`email`,`password`) VALUES(?,?,?)';
			bcrypt.hash(password, saltRounds, function(err, hash) {
				if(err){
					reject('An error occured');
					logger.log('error','UNKNOWN_ERROR', err);
				}else{
					CONNECTION.query(q, [name, email, hash], (error, response) => {
						if(error){
							reject('An error occured');
							logger.log('error','QUERY', error);
						}else{
							resolve();
						}
					})
				}
			}); */
		})
	},
	getUser: (email, CONNECTION) => {
		return new Promise( (resolve, reject) => {
			const q = '\
				SELECT \
					`Users`.`id`, \
					`Users`.`password` \
				FROM `Users`\
				WHERE `Users`.`email` = ?\
			';
			CONNECTION.query(q, [email], (err, res) => {
				if(err){
					logger.log('error','QUERY', err);
					reject(err);
				}else{
					resolve(res);
				}
			})
		})
	}
}