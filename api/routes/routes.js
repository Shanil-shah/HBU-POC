const appRouter=function(app){
	app.get('/', function (req, res) {
  res.json({status:'success'});
//creating a post api
app.post('/data',function(req,res){
	console.log(req.body.data);
	data=req.body.data;
	res.json({
		data:'recieved succesfully'
	});
});
app.get('/data',function(req,res){
	res.json(data);
});

});

}
module.exports=appRouter;
