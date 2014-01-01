var restify = require('restify'),
    http = require('http'),
    api_key = require('./api_key.json'),
    api_url = 'http://api.yummly.com/v1/api/recipes?_app_id=' + api_key.application_id + '&_app_key=' + api_key.application_key + '&q=',
    redis = require('redis'),
    redis_client,// = redis.createClient(),
	config = require('./apiServConfig.json'),
    server = restify.createServer(config),
	log = new require('./logger').Logger('api'),
	userRepo = new require('./userRepo')();


server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.put('/user/username/:name/email/:email',function(req,res,next) {
	log.info('adding user: ' + req.params.name);
	userRepo.addUser(req.params.name,req.params.email,'newuser',function(err,usr){
        var msg = {
            error: err || '',
            data: usr || {}
        };
        res.send(JSON.stringify(msg));
		log.info(JSON.stringify(msg));
        next();
	});
});

server.get('/user/username/:name',function(req,res,next) {
	log.info('getting user: ' + req.params.name);
	userRepo.getUser(req.params.name,function(err,usr){
        if(usr) {
            log.info('found user');
        }
        else {
            log.info('no user found');
        }
        var msg = {
            error: err || '',
            data: usr || {}
        };
        res.send(JSON.stringify(msg));
		log.info(JSON.stringify(msg));
		next();
	});
});

server.get('/recipes/:term', function (req, res, next) {
  var recipes = {};


  redis_client.on('error', function (err) {
      console.log('Error ' + err);
  });

  redis_client.get(req.params.term, function (err, replies) {
    if (!replies) {
      recipes = replies;
    } else {
      res.send(JSON.parse(replies));
      return next();
    }
  });

  if (!recipes.length) {
    http.get(api_url + req.params.term, function(response) {
      var recipes_raw = '';

      response.on('data', function (chunk){
          recipes_raw += chunk;
      });

      response.on('end',function(){
          recipes = JSON.parse(recipes_raw);
          redis_client.set(req.params.term, JSON.stringify(recipes));
          res.send(recipes);
          return next();
      });
    }).on('error', function(e) {
      res.send(e.message);
    });
  }

});

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});

process.on('exit', function() {
  redis_client.quit();
});
