module.exports = {
	get: (CONNECTION) => {
		return new Promise((resolve, reject) => {
			const q = '\
			SELECT \
				`Titles`.`id`, \
				`Titles`.`title`, \
				`Titles`.`release`, \
				`Titles`.`image`, \
				`Titles`.`rating` \
			FROM `Titles` JOIN \
       			(SELECT CEIL(RAND() * \
                     (SELECT MAX(id) \
						FROM `Titles`)) AS id) \
				AS `r2` \
			WHERE `Titles`.`id` >= `r2`.`id` \
			ORDER BY `Titles`.`id` ASC\
			LIMIT 100	';
			CONNECTION.query(q, [], (err, res) => {
				if(err){
					reject(err);
				}else{
					resolve(res);
				}
			})
		})
	},
}