var restify = require('restify'),
    http = require('http'),
    api_key = require('./api_key.json'),
    api_url = 'http://api.yummly.com/v1/api/recipes?_app_id=' + api_key.application_id + '&_app_key=' + api_key.application_key + '&q=',
    server = restify.createServer({ name: 'friedDog' });

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/recipes/:term', function (req, res, next) {
  var recipes = {};

  http.get(api_url + req.params.term, function(response) {
    var recipes_raw = '';

    response.on('data', function (chunk){
        recipes_raw += chunk;
    });

    response.on('end',function(){
        recipes = JSON.parse(recipes_raw);
        res.send(recipes);
        return next();
    });

  }).on('error', function(e) {
    res.send(e.message);
  });


});

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});

