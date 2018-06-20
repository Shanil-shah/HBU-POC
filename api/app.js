var express = require('express'); //a variable that contains module called express
var app = express(); //module is actually a function
var bodyparser=require('body-parser');//this is required to store the
app.use(bodyparser.json());
var data={};
//a method that recieves a request and serves a response
app.get('/', function (req, res) {
  res.json({status:'success'});
});
//creating a post api
app.post('/data',function(req,res){
	console.log(req.body.data);
	data=req.body;
	res.json(data);
});
app.get('/data',function(req,res){
	res.json(data);
});

//listen method starts a server and listen on the port 3000
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
   