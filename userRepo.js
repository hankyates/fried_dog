
var Logger = require('./logger').Logger,
	MongoDB = require('./mdb').MongoDB;

function userRepo() {
	this.mDB = new MongoDB('users');
	var log  = new Logger('UserRepo');

	function doCb(cb,err,data) { if(cb && typeof cb === 'function') { cb(err,data); } }

	this.addUser = function(username,email,callback) {
		var newUser = {username:username,email:email};
		mDB.findOne(newUser,function(err,user){
			if(err) {doCb(callback,err,null); return;}
			if(user){
				log.info('user already exists.');
				doCb(callback,err,user);
				return;
			}
			mDB.insert(newUser,function(err,user){
				doCb(callback,err,user);
			});
		});
	}

	this.getUser = function(username,email,callback) {
		var user = {};
		if(username) {
			user['username'] = username;
		}
		if(email) {
			user['email'] = email;
		}
		log.info('finding user: ' + JSON.stringify(user));
		mDB.findOne(user,function(error,user){
			log.info('calling callback');
			doCb(callback,error,user);
		});
	}
	return this;
}

exports = module.exports = userRepo;
