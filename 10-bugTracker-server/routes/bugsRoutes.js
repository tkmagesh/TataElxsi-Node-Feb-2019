var express = require('express'),
	router = express.Router();

var bugs = [
    {
      "id": 1,
      "name": "Data integrity checks failed",
      "isClosed": false,
      "createdAt": "2018-10-18T09:38:38.876Z",
      "desc": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur aliquam id pariatur ipsa expedita nesciunt doloribus facilis architecto quisquam totam veniam odio, minima, labore deleniti, neque nam quia amet eveniet."
    },
    {
      "id": 6,
      "name": "Server communication failure",
      "isClosed": false,
      "createdAt": "2019-02-07T05:15:27.417Z"
    }
];

router.get('/', function(req, res, next){
	res.json(bugs);
});

router.get('/:id', function(req, res, next){
	next();
},function(req, res, next){
	var bug = bugs.find(bug => bug.id === parseInt(req.params.id));
	if (bug){
		res.json(bug)
	} else {
		res.status(404).end();
	}
});

router.post('/', function(req, res, next){
	var bugData = req.body;
	if (bugData.id === 0){
		var maxBugId = bugs.reduce((result, bug) => bug.id > result ? bug.id : result, 0);
		bugData.id = ++maxBugId;
	}
	bugs.push(bugData);
	res.status(201).json(bugData);
})

module.exports = router;