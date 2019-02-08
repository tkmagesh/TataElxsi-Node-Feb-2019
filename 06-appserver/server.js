var http = require('http'),
	querystring = require('querystring'),
	url = require('url'),
	calculator = require('./calculator');

var server = http.createServer(function(req, res){
	var urlObj = url.parse(req.url);
	if (urlObj.pathname !== '/calculator'){
		res.statusCode = 404;
		res.end();
		return;
	}
	if (req.method === 'GET'){
		var queryData = querystring.parse(urlObj.query),
			op = queryData.op,
			n1 = parseInt(queryData.n1),
			n2 = parseInt(queryData.n2),
			result = calculator[op](n1, n2);

		res.write(result.toString());
		res.end();
	} else {
		var rawData = '';
		req.on('data', chunk => rawData += chunk);
		req.on('end', () => {
			var bodyData = querystring.parse(rawData)
				op = bodyData.op,
				n1 = parseInt(bodyData.n1),
				n2 = parseInt(bodyData.n2),
				result = calculator[op](n1, n2);

			res.write(result.toString());
			res.end();
		});
	}
});

server.listen(8085);
console.log('server started...!');

server.on('listening', () => console.log('server listening on 8085'));