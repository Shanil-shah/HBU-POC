var express = require('express'); //a variable that contains module called express
var app = express(); //module is actually a function

//a method that recieves a request and serves a response
app.get('/', function (req, res) {
  res.send('Hello World');
});
//creating a post api
app.post('/post',function(req,res){
	res.send('Got a post request')
});

//listen method starts a server and listen on the port 3000
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
