var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
    db.createTable('users', {
        columns : {
            username: {
                type: 'string', 
                length: 20, 
                primaryKey: true,
                unique: true,
                notNull: true
            },
            email: {
                type: 'string',
                length: 50,
                unique: true,
                notNull: true
            },
            karma: {
                type: 'int',
                notNull: true,
                defaultValue: 0
            }
        },
        ifNotExist: true
    }, callback);
};

exports.down = function(db, callback) {
    db.dropTable('users', {
        ifExist: true
    }, callback);
};
