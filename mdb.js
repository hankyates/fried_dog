var mongo = require('mongodb').MongoClient,
	log = new require('./logger').Logger('mongodb');

/********************************************
 *
 * mongo callbacks are function(error,obj){}
 *
 * ******************************************/
function mongoDb() {
	var mDB;
	var collection = 'default';
	mongo.connect('mongodb://localhost:27017/fd',function(err,db){
		if(err) {
			log.error('error connecting to mongo: ' + err);
			return;
		}
		log.info('connected to mongo!');
		mDB = db;
	});

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
		mDB.collection(collection).findOne(searchObj, function(err,obj) {
			if(err) {
				log.error('error finding object in collection fd.' + collection);
				log.error('searchObj: ' + JSON.stringify(searchObj));
			}

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

