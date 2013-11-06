var //mongo = require('mongodb').MongoClient,
    express = require('express'),
    app = express(),
    mDB;
/*
mongo.connect('mongodb://localhost:27017/frieddog', function(err, db){
  if(err) {
    console.log('mongo connect error!');
    console.log(err);
    return;
  }
  mDB = db;
  console.log('mongo connected!');
});
*/
// Configuration
app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.get('/',function(req,res){
  res.redirect('/index.html');
});

app.listen(8080);