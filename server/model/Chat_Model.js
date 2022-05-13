const logger = require('../utils/logger.js');

module.exports = {
	addMessage: (user_id, message, CONNECTION) => {
		return new Promise( async (resolve, reject) => {
			console.log(user_id);
			const q = 'INSERT INTO `Chat`(`user_id`,`message`,`creationDate`) VALUES(?,?,NOW())';
			CONNECTION.query(q, [user_id, message], (error, response) => {
				if(error){
					reject('An error occured');
					logger.log('error','QUERY', error);
				}else{
					resolve(true);
				}
			})
		})
	},
	getMessages: (user_id, CONNECTION) => {
		return new Promise( async (resolve, reject) => {
			const q = 'SELECT \
				`Chat`.`id`,\
				`Chat`.`message`,\
				`Chat`.`creationDate`,\
				`Users`.`id` AS `isMine`\
			FROM `Chat`\
			LEFT JOIN `Users` ON `Users`.`id` = `Chat`.`user_id` AND `Users`.`id` = ? \
			WHERE 1\
			ORDER BY `Chat`.`creationDate` ASC\
			';
			CONNECTION.query(q, [user_id], (error, response) => {
				if(error){
					reject('An error occured');
					logger.log('error','QUERY', error);
				}else{
					resolve(response);
				}
			})
		})
	},
}