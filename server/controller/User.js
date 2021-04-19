const model = require('../model/User_Model.js');
const logger = require('../utils/logger.js');

module.exports = {
	run:function (router, CONNECTION){
		router.post('/register',async (req,res) => {
			if(req.session.email) return res.json( logger.getError('LOGGED') );

			let data = req.body;
			model.register(data.name, data.email, data.password, CONNECTION)
			.then( (data) => {
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
			.then( (data) => {
				/* req.session.email = data.email;
				res.json( {status: 'ok', data: data.email} ); */
			})
			.catch( (err) => {
				res.json( {status: 'err', data: err} );
			})
		/* 	let page = Math.floor(Math.random() * 500) + 1;
			mdb.discoverMovie({
				'page': page
			}, (err, response) => {
				if(err){
					//logger.log('error','QUERY', err);
				}else{
					res.json( {status: 'ok', data: response} );
				}
			}); */
		})
		router.post('/isLogged',async (req,res) => {
			if(req.session.email){
				res.json({ status: 'ok', data: true});
			}else{
				res.json({ status: 'err', data: false});
			}
		})
	},
}