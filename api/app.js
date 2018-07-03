const express = require('express'); onst app = express(); 
const bodyparser=require('body-parser');
app.use(bodyparser.json());
let data={};//global variable 


app.get('/', function (req, res) {
  res.json({status:'success'});
});
//creating a post api
app.post('/data',function(req,res){
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
   