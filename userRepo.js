
var Logger = require('./logger').Logger,
    pg = require('pg'),
    conStr = 'pg://fduser@localhost:5432/fd',
    userTable = 'fd.users';

function User(username,email,name,karma) {
    this.username = username;
    this.email = email;
    this.name = name;
    this.karma = karma || 0;

    return this;
}

function userRepo() {
	var log  = new Logger('UserRepo');
    
	function doPgCb(cb,err,dbc,done) { if(cb && typeof cb === 'function') { cb(err,dbc,done); } else { log.error('null callback!'); } }
	function doCb(cb,err,data) { if(cb && typeof cb === 'function') { cb(err,data); } else { log.error('null callback!'); } }

    function pgDo(cb) {
        log.info('connecting to DB');
        pg.connect(conStr,function(err,dbc,done) {
            log.info('err: ' + err);
            log.info('dbc: ' + dbc);
            log.info('done: ' + done);
            doPgCb(cb,err,dbc,done);
        });
    }

    function clean(str) {
        return str.replace(/[^A-Za-z0-9\s]/g, '').replace(/\s+/g,' ');
    }

	this.addUser = function(username,email,name,callback) {
		var newUser = new User(clean(username), email, clean(name));
        log.info('adding user: ' + JSON.stringify(newUser));
        pgDo(function(err,dbc,done) {
            var q ='insert into ' + userTable + ' (username, email, name) values (';
            q += "'" + username + "','" + email + "','" + name + "');";
            log.info('running query: ' + q);
            dbc.query(q,function(err,result){
                log.info('err: ' + err);
                log.info('result: ' + JSON.stringify(result));
                doCb(callback,err,newUser);
            });
            done();
        });
	};

	this.getUser = function(username,callback) {
		log.info('finding user: ' + username);
        pgDo(function(err,dbc,done){
            log.info('in callback');
            if(err) {
                log.info('found error');
                doCb(callback,err,undefined);
                done();
                return;
            }
            var q = 'select username, email, name, karma from ' + userTable + " where username = '" + username + "' ;";
            log.info('running query: ' + q);
            dbc.query(q, function(err,result) {
                log.info('got result!');
                log.info('err: ' + err);
                log.info('result: ' + JSON.stringify(result));
                var user;
                if(!err) {
                    if(result.rows[0]) {
                        var row = result.rows[0];
                        log.info('result first row: ' + JSON.stringify(row));
                        user = new User(row.username, row.email, row.name, row.karma);
                    }
                    else {
                        log.info('no results!');
                    }
                }
                doCb(callback,err,user);
            });
            done();
        });
	}
	return this;
}

exports = module.exports = userRepo;
