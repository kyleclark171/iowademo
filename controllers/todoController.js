var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var todoRepository = require('../repositories/todoRepository.js');

function beginRequest(req){
	console.log("------------------------------");
	console.log("-- Beginning request");
	console.log("---- Method: " + req.method);
	console.log("---- Url:    " + req.url);

	if(req.method == "POST"){
		console.log("---- Body:");
		console.log(JSON.stringify(req.body, null, 2));
	}
	
	console.log("------------------------------");
}

function getOnErrorFunc(res){
	return function(err){
		res.render('error', { errorDetails: JSON.stringify(err, null, 2)})
	}
}

module.exports = function(app){

	app.get('/', function(req, res){
		beginRequest(req);

		todoRepository.getAllTodos().then(function(todos){
			res.render('todo', { todos: todos });
		},getOnErrorFunc(res));
	});

	app.post('/todo', urlencodedParser, function(req, res){
		beginRequest(req);

		var todoItem = req.body.item;
		todoRepository.createTodo(todoItem)
			.then(function(){
				console.log("create succeeded");
				res.json(true);
			},getOnErrorFunc(res));
	});

	app.delete('/todo/:item', function(req, res){
		beginRequest(req);

		var todoItem = req.params.item;
		todoRepository.deleteTodo(todoItem)
			.then(function(){
				console.log("delete succeeded");
				res.json(true);
			},getOnErrorFunc(res));
	});
}