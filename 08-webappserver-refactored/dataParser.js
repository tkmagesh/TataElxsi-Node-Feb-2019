var url = require('url');

module.exports = function(req, res, next){
	var resourceName = req.url === '/' ? '/index.html' : req.url;
    req['urlObj'] = url.parse(resourceName);
    next();
}