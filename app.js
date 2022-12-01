var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var register = require('./Second');
var db = 'mongodb://localhost/TestDb';

mongoose.connect(db);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', function(req,res){
    res.send(`Good For Me +++ __ |||`)
});

app.get('/registers', function(req,res){
console.log("All Registered ...");
register.find({})
.exec(function(err,response){
    if(err){
        res.send("Error Occured, Wait a while")
    }
    else {
        res.json(response)
        console.log(response);
    }
});

});

app.get("/Zion/:id", function(req,res){
    register.findOne({ 
        _id: req.params.id
    })
.exec(function(err, response){
    if(err)
    {
        res.send("Error");
    }
    else
    {
        res.json(response);
    }
});
});
   
app.post("/free", function(req,res){
    var Rg= new register();
     Rg.DOB = req.body.DOB;
     Rg.Id = req.body.Id;
     Rg.Name = req.body.name;
     Rg.Nationality = req.body.nationality;

     Rg.save(function(err,response){
        if(err){
            res.send("Error while saving")
        }
        else{
            console.log(response)
            res.send(response)
        }
     });
});

app.post("/Fre", function(req, res){
    register.create(req.body, function(err, result){
     if(err)
     {
        res.send("uhh Error again");
     }else{
        res.send(result);
     }
    });
});

app.put("/put/:id", function(req,res){
   register.findOneAndUpdate({ _id:req.params.id},
   {$set:
    {Id:req.body.Id}},
    {upsert:true}, function(err, updated){
        if(err){
            res.send("Error Occured")
        }
        else{
            res.send(req.body.Id);
        }
     });
 
});


var port = 8080;
 app.listen(port, function(){
     console.log(`App is listening on port + ${port}`)
 });