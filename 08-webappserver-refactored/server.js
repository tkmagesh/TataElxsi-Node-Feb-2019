var http = require('http'),
    dataParser = require('./dataParser'),
    serveStatic = require('./serveStatic'),
    serveCalculator = require('./serveCalculator'),
    notFoundHandler = require('./notFoundHandler');


var server = http.createServer(function(req, res,){
    dataParser(req);
    serveStatic(req, res);
    serveCalculator(req, res);
    notFoundHandler(res);
});

server.listen(8080);

console.log('server listening on 8080!');