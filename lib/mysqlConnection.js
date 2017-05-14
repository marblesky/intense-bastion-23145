var express = require('express');
var app = express();
var mysql = require('mysql2');

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
      var vhost= 'us-cdbr-iron-east-03.cleardb.net';
      var vuser= 'b21183ac7a1dbd';
      var vpassword= '7920092e';
      var vdatabase= 'heroku_9e23a2e7e50daa9';
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

var connection = mysql.createConnection(dbConfig);

module.exports = connection;
