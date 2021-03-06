// This class contains methods for interacting with dynamoDB
var AWS = require('aws-sdk');
var q = require('q');

// configure AWS
AWS.config.setPromisesDependency(q.Promise);

if(process.env.AWS_REGION)
{
    AWS.config.update({
        region: process.env.AWS_REGION,
        endpoint: "https://dynamodb." + process.env.AWS_REGION + ".amazonaws.com"
    });
} else {
    AWS.config.update({
        accessKeyId: 'XXXX-XX-XXXX', // local dynamo requires an example access key id and secret acces key
        secretAccessKey: 'YYYY-YY-YYYY',
        region: "us-east-2",
        endpoint: "http://localhost:8000"
    });
}

// Schema configuration for DynamoDB
var todoSchema = {
    TableName : "Todos",
    KeySchema: [       
        { AttributeName: "item", KeyType: "HASH"}
    ],
    AttributeDefinitions: [       
        { AttributeName: "item", AttributeType: "S" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 5, 
        WriteCapacityUnits: 5
    }
};

var dynamoDB = new AWS.DynamoDB();

function createIfNotExists(){
    return dynamoDB.listTables({}).promise().then(function(data){
        // successfully read tables
        if(data.TableNames && data.TableNames.containsString(todoSchema.TableName)){
            return; // table existed; do nothing
        } 
        else {
            // table did not exist
            return dynamoDB.createTable(todoSchema).promise().then(function()
            {
                console.log("successfully created table");
            }); // on error, bubble error up to caller
        }
    }); // on error, bubble error up to caller
};

module.exports = {
    getAllTodos: function(){
        return createIfNotExists().then(function(){
                console.log("getting todos");
                return dynamoDB.scan({ TableName: todoSchema.TableName }).promise().then(function(data){
                    var todos = [];
                    data.Items.forEach(function(todo){
                        todos.push({item: todo.item.S});
                    });
                    console.log("todos read: " + JSON.stringify(todos));
                    return todos;
                }, function(err){
                    console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
                    return [];
                });
            }
        );
    },
    createTodo: function(todoItem){
        var createParams = {
	        TableName: todoSchema.TableName,
	        Item: {
                item : {
                    S: todoItem
                }
            }
        };

        return createIfNotExists().then(function(){
            return dynamoDB.putItem(createParams).promise().then(function(data) {
			   console.log("Create succeeded");
			},
            function(err){
                console.error("Unable to create todo. Error JSON:", JSON.stringify(err, null, 2));
                throw err;
            });
        });
    },
    deleteTodo: function(todoItem){
         var deleteParams = {
            Key: {
                item: {
                    S: todoItem
                }
            },
            TableName: todoSchema.TableName
        };

        return createIfNotExists().then(function(){
            return dynamoDB.deleteItem(deleteParams).promise().then(function(data){
				console.log("Delete succeeded");
            },
            function(err){
                console.error("Unable to delete todo. Error JSON:", JSON.stringify(err, null, 2));
                throw err;
            });
        });
    }
 };