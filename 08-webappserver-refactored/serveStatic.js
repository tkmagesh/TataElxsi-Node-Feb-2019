
var  fs = require('fs'),
    path = require('path');

var staticExtns = ['.html', '.css', '.js', '.jpg', '.png', '.ico', '.xml', '.txt', '.json'];

function isStatic(resourceName){
    var ext = path.extname(resourceName);
    return staticExtns.indexOf(ext) >= 0;
}

module.exports = function(req, res){
    if (isStatic(req.urlObj.pathname)){
        var resourceFullName = path.join(__dirname, req.urlObj.pathname);
        if (!fs.existsSync(resourceFullName)){
            console.log('[@serveStatic] - serving 404');
            res.statusCode = 404;
            res.end();
            return;
        }
        var stream = fs.createReadStream(resourceFullName);
        stream.on('data', chunk => {
            console.log('[@serveStatic] serving data');
            res.write(chunk);
        });

        stream.on('end', () => {
            console.log('[@serveStatic] serving data completed');
            res.end();
        });
        stream.on('error', (err) => {
            console.log(err);
            res.statusCode = 500;
            res.end();
        });
    }
}