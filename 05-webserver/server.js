var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    url = require('url');

/*
var server = http.createServer(function(req,res){
    console.log('a new connection is established - ', req.url);
    res.write('<h1>Welcome to Node.js</h1>');
    res.end();
});
*/

var server = http.createServer(function(req, res,){
    var resourceName = req.url === '/' ? '/index.html' : req.url;
    var parsedUrl = url.parse(resourceName);
    console.log(req.method + '\t' + parsedUrl.pathname);
    var resourceFullName = path.join(__dirname, parsedUrl.pathname);
    if (!fs.existsSync(resourceFullName)){
        res.statusCode = 404;
        res.end();
        return;
    }
    var stream = fs.createReadStream(resourceFullName);
    stream.on('data', chunk => res.write(chunk));
    stream.on('end', () => res.end());
    stream.on('error', (err) => {
        console.log(err);
        res.statusCode = 500;
        res.end();
    });
})

server.listen(8080);

console.log('server listening on 8080!');