var url = require('url'),
	querystring = require('querystring');

module.exports = function(req, res, next){
	var resourceName = req.url === '/' ? '/index.html' : req.url;
    req['urlObj'] = url.parse(resourceName);
    req['query'] = querystring.parse(req.urlObj.query);
    var rawData = '';
    req.on('data', chunk => rawData += chunk);
    req.on('end', () => {
        req['body'] = querystring.parse(rawData);
		next();
	});
}