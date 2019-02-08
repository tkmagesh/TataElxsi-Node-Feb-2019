var url = require('url');

module.exports = function(req){
	var resourceName = req.url === '/' ? '/index.html' : req.url;
    req['urlObj'] = url.parse(resourceName);
}