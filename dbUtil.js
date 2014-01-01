var fs = require('fs'),
    path = require('path'),
    config = require('./database.json'),
    log = new require('./logger').Logger('dbUtil'),
    pg = require('pg');

var parsedConfig;
var environment = process.argv.splice(2).indexOf('--prod') === -1 ? 'dev' : 'prod';
log.info('using environment ' + environment);

function buildPgConnectionString(env) {
    var conStr = 'pg://';
    conStr += parsedConfig[env].user + ':';
    conStr += parsedConfig[env].password + '@';
    conStr += parsedConfig[env].host + ':5432/';
    conStr += parsedConfig[env].database;
    return conStr;
}

function getPgConnectionString() {
    if(parsedConfig) {
        return buildPgConnectionString(environment);
    }

    parsedConfig = {};
    for (var env in config) {
        //Check config entry's for ENV objects
        //which will tell us to grab configuration from the environment
        for (var configEntry in config[env]) {
            if (config[env][configEntry].ENV){
                config[env][configEntry] = process.env[config[env][configEntry].ENV];
            }
        }
        parsedConfig[env] = config[env];
    }
    return buildPgConnectionString(environment);
}

function doPgCb(cb,err,dbc,done) {
    if(cb && typeof cb === 'function') {
        cb(err,dbc,done);
    }
    else {
        log.error('null callback!');
    }
}

function pgDo(cb) {
    log.info('connecting to DB');

    var conStr = getPgConnectionString();
    pg.connect(conStr,function(err,dbc,done) {
        if (err) {
            log.info('err: ' + err);
        }
        doPgCb(cb,err,dbc,done);
    });
}

exports = module.exports = {
    pgDo: pgDo,
    tables: {
        user: 'users'
    }
};
