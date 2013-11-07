var //mongo = require('mongodb').MongoClient,
	config = require('./apiServerConfig.json'),
	restify = require('restify'),
	server = restify.createServer(config),
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

server.get('/recipes',function(req,res,next){
});
// Configuration


