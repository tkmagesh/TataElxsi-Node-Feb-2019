
var  fs = require('fs'),
    path = require('path');

var staticExtns = ['.html', '.css', '.js', '.jpg', '.png', '.ico', '.xml', '.txt', '.json'];

function isStatic(resourceName){
    var ext = path.extname(resourceName);
    return staticExtns.indexOf(ext) >= 0;
}

module.exports = function(staticResPath){
    return function(req, res, next){
        if (isStatic(req.urlObj.pathname)){
            var resourceFullName = path.join(staticResPath, req.urlObj.pathname);
            if (!fs.existsSync(resourceFullName)){
                console.log('[@serveStatic] - serving 404');
                res.statusCode = 404;
                res.end();
                return;
            }
            var stream = fs.createReadStream(resourceFullName);
            stream.pipe(res);
            stream.on('end', () => next());
        } else {
            next();
        }
    }
};