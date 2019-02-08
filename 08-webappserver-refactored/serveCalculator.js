var calculator = require('./calculator');

module.exports = function(req, res, next){
	 if (req.urlObj.pathname === '/calculator'){
         var data = req.method === 'GET' ?  req.query : req.body,
             op = data.op,
            n1 = parseInt(data.n1),
            n2 = parseInt(data.n2),
            result = calculator[op](n1, n2);

        res.write(result.toString());
        res.end();
    } 
    next();
}