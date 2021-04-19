const model = require('../model/Suggest_Model.js');
const logger = require('../utils/logger.js');
const mdb = require('moviedb')('4730bbd090c66e172fd302f1d02fc329');

module.exports = {
	run:function (router, CONNECTION){
		router.post('/get',async (req,res) => {
			let data = req.body;
			let page = Math.floor(Math.random() * 500) + 1;
			mdb.discoverMovie({
				'page': page
			}, (err, response) => {
				if(err){
					logger.log('error','QUERY', err);
				}else{
					res.json( {status: 'ok', data: response} );
				}
			});
		})
	},
}