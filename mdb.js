var mongo = require('mongodb').MongoClient,
  log = new require('./logger').Logger('mongodb');

/********************************************
 *
 * mongo callbacks are function(error,obj){}
 *
 * ******************************************/
function mongoDb(collectionName) {
  var mDB;
  var collection = collectionName || 'default';
  mongo.connect('mongodb://localhost:27017/fd',function(err,db){
    if(err) {
      log.error('error connecting to mongo: ' + err);
      return;
    }
    log.info('connected to mongo at collection: ' + collection);
    mDB = db;
  });

  this.getCollection = function() {
    return collection;
  }

  this.setCollection = function(name){
    collection = name;
  }

  this.insert = function(obj,callback) {
    if(!mDB) {
      var e = 'mongodb not connected yet!';
      log.warn(e);
      if(callback && typeof callback === 'function') {
        callback(e,obj);
      }
      return;
    }

    mDB.collection(collection).insert(obj,function(err,obj) {
      if(err) {
        log.error('error inserting into fd.' + collection + ': ' + err);
      }

      if( callback && typeof callback === 'function' ) {
        callback(err,obj);
      }
    });
  }

  this.findOne = function(searchObj,callback) {
    if(!mDB) {
      var e = 'mongodb not connected yet!';
      log.warn(e);
      if(callback && typeof callback === 'function') {
        callback(e,searchObj);
      }
      return;
    }
    log.info('searching ' + collection + ' for ' + JSON.stringify(searchObj));
    mDB.collection(collection).findOne(searchObj, function(err,obj) {
      if(err) {
        log.error('error finding object in collection fd.' + collection);
        log.error('searchObj: ' + JSON.stringify(searchObj));
      }

      log.info('got result: ' + JSON.stringify(obj) + ' calling callback');
      if( callback && typeof callback === 'function' ) {
        callback(err,obj);
      }
    });
  }

  return this;
}

exports = module.exports = {
  MongoDB: mongoDb
};

