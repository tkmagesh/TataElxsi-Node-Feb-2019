var _middlewares = [];

function exec(req, res, middlewares){
	var [first, ...remaining] = middlewares,
		next = function(){
			exec(req, res, remaining);
		}
	if (typeof first === 'function')
		first(req, res, next);
}

function app(req, res){
	exec(req, res, _middlewares);
}

app['use'] = function(middleware){
	_middlewares.push(middleware);
}

module.exports = app;