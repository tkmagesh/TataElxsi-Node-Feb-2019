
module.exports = function(req, res, next){
	var start = new Date();
	
	res.on('finish', () => {
		var end = new Date(),
			delta = end - start;
		console.log(`${req.method}\t${req.urlObj.pathname}\t${delta}Ms`);
	})
	next();
}