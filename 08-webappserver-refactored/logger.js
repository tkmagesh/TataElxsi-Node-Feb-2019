var chalk = require('chalk');

module.exports = function(req, res, next){
	var start = new Date();
	
	res.on('finish', () => {
		var end = new Date(),
			delta = end - start;
		console.log(chalk.cyan(`${req.method}`) + '\t' + chalk.blue(`${req.urlObj.pathname}`) + '\t' + chalk.green(`${delta}Ms`));
	})
	next();
}