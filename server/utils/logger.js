const colors = require('colors');
const ERROR_CODES = {
    UNKNOWN_ERROR: 											{'status':'err', 'data':'UNKNOWN ERROR'},
    INVALID_PARAMS: 										{'status':'err', 'data':'INVALID PARAMETERS: '},
	NOT_LOGGED: 										    {'status':'err', 'data':'NOT LOGGED'},
	LOGGED: 										    	{'status':'err', 'data':'Already logged in'},/* For client */
    QUERY: 										            {'status':'err', 'data':'QUERY'},
};
module.exports = {
	log: (level, type, message)  => {
		var levels = ['info', 'warn', 'error'];
		let code = ERROR_CODES[type]['data'];
		if (typeof message !== 'string') {
			message = JSON.stringify(message);
		};
		if(level == 'info'){
			code = colors.bold.blue(code);
		}else if(level == 'error'){
			code = colors.bold.red(code);
		}else{
			code = colors.bold.yellow(code);
		}
		console.log(`${code} ${message}`);
	},
	getError: type => {
		return ERROR_CODES[type];
	}
}