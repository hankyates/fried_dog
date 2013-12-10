function redis_module(collectionName) {
  var redis = require('redis'),
      redis_client = redis.createClient(),
      log = new require('./logger').Logger('redis');

  if (!redis_client) {
    log.warn('Could not connect to redis client!');
  }

  redis_client.on('error', function (err) {
      log.error('Error ' + err);
  });

  return redis_client;
}

exports = module.exports = redis_module;

