const model = require('../model/Chat_Model.js');
const user = require('../model/User_Model.js');
const logger = require('../utils/logger.js');

module.exports = {
	run:function (router, socket, CONNECTION){
		router.post('/addMessage',async (req,res) => {
			if(!req.session.email) return res.json( logger.getError('NOT LOGGED') );

			user.getUser(req.session.email, CONNECTION)
			.then( (user) => {
				let data = req.body;
				model.addMessage(user[0].id, data.message, CONNECTION)
				.then( (d) => {
					res.json( {status: 'ok', data: data.email} );
					socket.broadcast.emit('new message', {
						message: data.message,
						user: user[0].email
					});
				})
				.catch( (err) => {
					res.json( {status: 'err', data: err} );
				})
		 		})
			.catch( (err) => {
				res.json( {status: 'err', data: err} );
			})
		})
		router.post('/getMessages',async (req,res) => {
			if(!req.session.email) return res.json( logger.getError('NOT LOGGED') );

			user.getUser(req.session.email, CONNECTION)
			.then( (user) => {
				model.getMessages(user[0].id, CONNECTION)
				.then( (d) => {
					res.json( {status: 'ok', data: d} );
				})
				.catch( (err) => {
					res.json( {status: 'err', data: err} );
				})
		 		})
			.catch( (err) => {
				res.json( {status: 'err', data: err} );
			})
		})
	},
}