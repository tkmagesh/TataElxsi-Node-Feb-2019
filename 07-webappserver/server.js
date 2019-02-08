var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    url = require('url'),
    querystring = require('querystring'),
    calculator = require('./calculator');

var staticExtns = ['.html', '.css', '.js', '.jpg', '.png', '.ico', '.xml', '.txt', '.json'];

function isStatic(resourceName){
    var ext = path.extname(resourceName);
    return staticExtns.indexOf(ext) >= 0;
}

var server = http.createServer(function(req, res,){
    var resourceName = req.url === '/' ? '/index.html' : req.url;
    var urlObj = url.parse(resourceName);
    console.log(req.method + '\t' + urlObj.pathname);
    if (isStatic(urlObj.pathname)){
        var resourceFullName = path.join(__dirname, urlObj.pathname);
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
    } else if (urlObj.pathname === '/calculator' && req.method === 'GET'){
        var queryData = querystring.parse(urlObj.query),
            op = queryData.op,
            n1 = parseInt(queryData.n1),
            n2 = parseInt(queryData.n2),
            result = calculator[op](n1, n2);

        res.write(result.toString());
        res.end();
    } else if (urlObj.pathname === '/calculator' && req.method === 'POST') {
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
    } else {
        res.statusCode = 404;
        res.end();
        return;
    }
});

server.listen(8080);

console.log('server listening on 8080!');