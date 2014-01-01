
var Logger = require('./logger').Logger,
    dbUtil = require('./dbUtil'),
    userTable = dbUtil.tables.user;

function User(username,email,karma) {
    this.username = username;
    this.email = email;
    this.karma = karma || 0;

    return this;
}

function userRepo() {
	var log  = new Logger('UserRepo');
    
	function doCb(cb,err,data) { if(cb && typeof cb === 'function') { cb(err,data); } else { log.error('null callback!'); } }

    function cleanEmail(str) {
        return str.replace(/[^A-Za-z0-9\.@_-]/g, '');
    }

    function clean(str) {
        return cleanEmail(str).replace(/[^A-Za-z0-9]/g, '');
    }

	this.addUser = function(username,email,callback) {
        var cleanedUsername = clean(username);
        var cleanedEmail = cleanEmail(email);
        log.info('adding user');
        log.info('username: ' + cleanedUsername);
        log.info('email: ' + cleanedEmail);
        dbUtil.pgDo(function(err,dbc,done) {
            var q ='insert into ' + userTable + ' (username, email) values (';
            q += "'" + cleanedUsername + "','" + cleanedEmail + "');";
            log.info('running query: ' + q);
            dbc.query(q,function(err,result){
                log.info('err: ' + err);
                log.info('result: ' + JSON.stringify(result));
                if(err) {
                    doCb(callback,err,undefined);
                }
                else {
                    getUser(cleanedUsername, callback);
                }
            });
            done();
        });
	};

	this.getUser = function(username,callback) {
		log.info('finding user: ' + username);
        dbUtil.pgDo(function(err,dbc,done){
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
