/*var //mongo = require('mongodb').MongoClient,
	restify = require('restify'),
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

var static = require('node-static'),
	fileServer = new static.Server('./public');

require('http').createServer(function (request, response) {
	    request.addListener('end', function () {
			        fileServer.serve(request, response);
					    }).resume();
}).listen(8080);

