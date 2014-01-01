
var Logger = require('./logger').Logger,
    pg = require('pg'),
    dbUtil = require('./dbUtil'),
    conStr = dbUtil.getConnectionString(),
    userTable = dbUtil.tables.user;

function User(username,email,karma) {
    this.username = username;
    this.email = email;
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

	this.addUser = function(username,email,callback) {
        var cleanUsername = clean(username);
        var cleanEmail = clean(email);
        log.info('adding user');
        log.info('username: ' + cleanUsername);
        log.info('email: ' + cleanEmail);
        pgDo(function(err,dbc,done) {
            var q ='insert into ' + userTable + ' (username, email) values (';
            q += "'" + cleanUsername + "','" + cleanEmail + "');";
            log.info('running query: ' + q);
            dbc.query(q,function(err,result){
                log.info('err: ' + err);
                log.info('result: ' + JSON.stringify(result));
                if(err) {
                    doCb(callback,err,undefined);
                }
                else {
                    getUser(cleanUsername, callback);
                }
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
            var q = 'select username, email, karma from ' + userTable + " where username = '" + username + "' ;";
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
                        user = new User(row.username, row.email, row.karma);
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
