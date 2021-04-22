const model = require('../model/User_Model.js');
const logger = require('../utils/logger.js');

module.exports = {
	run:function (router, CONNECTION){
		router.post('/register',async (req,res) => {
			if(req.session.email) return res.json( logger.getError('LOGGED') );

			let data = req.body;
			model.register(data.name, data.email, data.password, CONNECTION)
			.then( (d) => {
				req.session.email = data.email;
				res.json( {status: 'ok', data: data.email} );
			})
			.catch( (err) => {
				res.json( {status: 'err', data: err} );
			})
		})
		router.post('/login',async (req,res) => {
			let data = req.body;
			model.login(data.email, data.password, CONNECTION)
			.then( (d) => {
				req.session.email = data.email;
				res.json( {status: 'ok', data: data.email} );
			})
			.catch( (err) => {
				res.json( {status: 'err', data: err} );
			})
		})
		router.post('/isLogged',(req,res) => {
			if(req.session.email){
				res.json({ status: 'ok', data: true});
			}else{
				res.json(logger.getError('NOT_LOGGED'));
			}
		})
		router.post('/addToList',(req,res) => {
			if(req.session.email){
				let data = req.body;
				model.addToList(req.session.email, data.id, CONNECTION)
				.then( (d) => {
					res.json({status: 'ok', data: true});
				})
				.catch( (err) => {
					res.json(logger.getError('UNKNOWN_ERROR'));
				})
			}else{
				res.json(logger.getError('NOT_LOGGED'));
			}
		})
		router.post('/getList',(req,res) => {
			if(req.session.email){
				let data = req.body;
				model.getList(req.session.email, CONNECTION)
				.then( (d) => {
					res.json({status: 'ok', data: d});
				})
				.catch( (err) => {
					res.json(logger.getError('UNKNOWN_ERROR'));
				})
			}else{
				res.json(logger.getError('NOT_LOGGED'));
			}
		})
	},
}