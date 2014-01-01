var fs = require('fs');
var path = require('path');
var config = require('./database.json')
var parsedConfig;
var environment = process.argv.splice(2).indexOf('--prod') === -1 ? 'dev' : 'prod';

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

exports = module.exports = {
    getConnectionString: getPgConnectionString,
    tables: {
        user: 'users'
    }
};
