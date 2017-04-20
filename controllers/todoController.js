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

module.exports = function(app){

	app.get('/todo', function(req, res){
		beginRequest(req);

		todoRepository.getAllTodos().then(function(todos){
			res.render('todo', { todos: todos });
		});
	});

	app.post('/todo', urlencodedParser, function(req, res){
		beginRequest(req);

		var todoItem = req.body.item;
		todoRepository.createTodo(todoItem)
			.then(function(){
				console.log("create succeeded");
				res.json(true);
			}, function(){
				res.json(false);
			});
	});

	app.delete('/todo/:item', function(req, res){
		beginRequest(req);

		var todoItem = req.params.item;
		todoRepository.deleteTodo(todoItem)
			.then(function(){
				console.log("delete succeeded");
				res.json(true);
			}, function(){
				res.json(false);
			});
	});
}