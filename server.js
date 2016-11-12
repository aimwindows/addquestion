var express =require('express');
var app =express();
var mongojs =require('mongojs');
var db = mongojs('mongodb://sureshkumar:12345@ds151707.mlab.com:51707/contactlist', ['contactlist']);
// var db =mongojs('contactlist',['contactlist']);
var bodyParser =require('body-parser');


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/contactlist', function (req, res) {
	console.log("i received a GET request")


db.contactlist.find(function (err, docs){
	console.log(docs);
	res.json(docs);
});
	

});
app.post('/contactlist', function (req, res) {
	console.log(res.body);

	db.contactlist.insert(req.body, function( err, docs){
		res.json(docs);
	});
});

app.delete('/contactlist/:id',function (req , res){
	var id= req.params.id;
	console.log(id);
	db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err , doc){
		res.json(doc);
	});
});

app.get('/contactlist/:id',function (req , res){
	var id= req.params.id;
	console.log(id);
	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err , doc){
		res.json(doc);
	});
});

app.put('/contactlist/:id',function(req , res){
	var id= req.params.id;
	console.log(req.body.name);
	db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)}, 
		update: {$set: {Qus_id: req.body.Qus_id ,
					    Qus_name: req.body.Qus_name , 
					    Qus_type: req.body.Qus_type ,
					    Grp_qus: req.body.Grp_qus ,
					    Crt_ans: req.body.Crt_ans ,
					    Ans_1: req.body.Ans_1 ,
					    Ans_2: req.body.Ans_2 ,
					    Ans_3: req.body.Ans_3 ,
					    Ans_4: req.body.Ans_4 

					}},

		new: true},function(err , doc){
			res.json(doc);
		
});
});
app.listen(3000);
console.log("server runing port in 3000");