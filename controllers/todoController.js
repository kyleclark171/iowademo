var bodyParser = require('body-parser');

var localTodoData = [];
var urlencodedParser = bodyParser.urlencoded({extended: false});


var AWS = require('aws-sdk');

//update to true when testing locally, should use environment variables on AWS but too lazy to implement
var local = false;

AWS.config.update({
  region: "us-east-2",
  endpoint: (local) ? "http://localhost:8000" : "https://dynamodb.us-east-2.amazonaws.com"
});

var docClient = new AWS.DynamoDB.DocumentClient();


module.exports = function(app){

	app.get('/todo', function(req, res){
		console.log('getting todos');
		localTodoData = [];


		var params = {
			TableName: "Todos"
		}
		docClient.scan(params, function(err, data){
			if (err) { 
				console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
			} else{
				console.log("query succeeded")
				data.Items.forEach(function(todo){
					console.log("item: " + todo.item);
					var todoItem = {
						"item": todo.item
					}
					localTodoData.push(todoItem);
				});
				res.render('todo', {todos: localTodoData});
			}
		});
	});

	app.post('/todo', urlencodedParser, function(req, res){
		console.log('request body: ' + JSON.stringify(req.body, null, 2));

		var params = {
	        TableName: "Todos",
	        Item: req.body
	    };

	    //post to Dynamo
	    docClient.put(params, function(err, data) {
			if (err) {
			   console.error("Unable to add todo. Error JSON:", JSON.stringify(err, null, 2));
			} else {
			   console.log("PutItem succeeded");
			   console.log("data: ", JSON.stringify(data, null, 2));
			   localTodoData.push(req.body);
			   res.json(localTodoData);
			}
	    });
	});

	app.delete('/todo/:item', function(req, res){

		//delete from Dynamo
		var params = {
			TableName: "Todos",
			Key:{
				"item": req.params.item.replace(/-/g, ' ')
			}
		}
		docClient.delete(params, function(err, data){
			if(err){
				console.error("Unable to delete todo. Error JSON:", JSON.stringify(err, null, 2));
			} else {
				console.log("Delete succeeded:", JSON.stringify(data, null, 2));
				localTodoData = localTodoData.filter(function(todo){
					return todo.item.replace(/ /g, '-') !== req.params.item;
				});
				res.json(localTodoData);
			}
		});
	});
}