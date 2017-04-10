var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

//template engine
app.set('view engine', 'ejs');

//static files
//localhost:3000/assets/styles.css knows to already start in public directory
app.use(express.static('./public'));


//fire controllers
todoController(app);


var port = process.env.PORT || 3000;

var server = app.listen(port, function () {
    console.log('Server running at http://127.0.0.1:' + port + '/');
});

