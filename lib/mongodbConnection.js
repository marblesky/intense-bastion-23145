var express = require('express');
var app = express();
var mongo = require('mongodb');

switch (app.get('env')) {
case 'dev':
case 'stg':
case 'prd':
      var vhost= '10.2.102.212';
      var vuser= 'DATAmanager';
      var vpassword= 'datamgr';
      var vdatabase= '212';
break;
case 'hrk':
      var vhost= 'ds151951.mlab.com:51951';
      var vuser= 'heroku_1mn41j63';
      var vpassword= 'pl3f893n059nahmtr7vb15tlik';
      var vdatabase= 'heroku_1mn41j63';
break;
default:
      var vhost= '10.2.102.212';
      var vuser= 'DATAmanager';
      var vpassword= 'datamgr';
      var vdatabase= '212';
break;
}


var dbConfig = {
      host: vhost,
      user: vuser,
      password: vpassword,
      database: vdatabase
};


module.exports.ready = function(db_name, callback){
    mongo.connect(process.env.MONGOLAB_URI, {}, function(error, db){
      callback(db);
    });
  }else{
    // localの場合の処理
    new mongo.Db(db_name, new mongo.Server('127.0.0.1', mongo.Connection.DEFAULT_PORT, {}), {}).open(function(err,db){
      callback(db);
    });
  }
};

var connection = mysql.createConnection(dbConfig);

module.exports = connection;
